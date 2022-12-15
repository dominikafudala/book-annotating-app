package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.*;
import com.dominikafudala.papier.exceptions.BookWithIsbnExistsException;
import com.dominikafudala.papier.filter.AuthorizationHelper;
import com.dominikafudala.papier.model.BookModel;
import com.dominikafudala.papier.model.SummaryBookModel;
import com.dominikafudala.papier.repository.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.transaction.Transactional;
import javax.xml.parsers.ParserConfigurationException;
import java.awt.print.Pageable;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {
    private final SeriesRepository seriesRepository;
    private final AuthorRepository authorRepository;
    private final BookAuthorRepository bookAuthorRepository;
    private final BookGenreRepository bookGenreRepository;
    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;
    private final PublisherRepository publisherRepository;
    private final FormatRepository formatRepository;
    private final LanguageRepository languageRepository;
    private final EditionRepository editionRepository;
    private final BookProgressRepository bookProgressRepository;
    private final AuthorizationHelper authorizationHelper;
    private final UserRepository userRepository;
    private final NoteRepository noteRepository;

    private final IsbnService isbnService;
    private final BookProgressService bookProgressService;
    private final EditionBookUserRepository editionBookUserRepository;
    private final SavedBookUserRepository savedBookUserRepository;
    private final Top10AllTimeRepository top10AllTimeRepository;
    private final Top10Last24Repository top10Last24Repository;


    public Book newBook (BookModel bookModel){
        Book newBook = new Book(bookModel.getTitle(), bookModel.getPage_number());

        if(bookModel.getIsbn().length() != 0) newBook.setIsbn(bookModel.getIsbn());
        if(bookModel.getSeries_name().get("id") != null){
            Integer seriesId = bookModel.getSeries_name().getAsNumber("id").intValue();

            Series series;
            if(seriesId < 0) {
                Series newSeries = new Series(bookModel.getSeries_name().getAsString("name"));
                series = newSeries;
                seriesRepository.save(newSeries);
            }else {
                 series = seriesRepository.findById(
                        seriesId
                ).orElse(new Series());
            }

            newBook.setSeriesID(series);
        }

        if(bookModel.getSeries_number() != null && bookModel.getSeries_number() > 0){
            newBook.setSeriesNumber(bookModel.getSeries_number());
        }

        if(bookModel.getDescription().length() != 0){
            newBook.setDescription(bookModel.getDescription());
        }

        if(bookModel.getPublisher().get("id") != null){
            Integer publisherId = bookModel.getPublisher().getAsNumber("id").intValue();

            Publisher publisher;
            if(publisherId < 0) {
                Publisher newPublisher = new Publisher(bookModel.getPublisher().getAsString("name"));
                publisher = newPublisher;
                publisherRepository.save(newPublisher);
            }else {
                publisher= publisherRepository.findById(
                        publisherId
                ).orElse(new Publisher());
            }

            newBook.setPublisherID(publisher);
        }

        if(bookModel.getPublication_date() != null){
            newBook.setPublishedDate(bookModel.getPublication_date());
        }

        if(bookModel.getFormat().get("id") != null){
            Integer formatId = bookModel.getFormat().getAsNumber("id").intValue();
            Format format = formatRepository.findById(formatId).orElse(new Format());
            newBook.setFormatID(format);
        }

        if(bookModel.getLanguage().get("id") != null){
            Integer languageId = bookModel.getLanguage().getAsNumber("id").intValue();
            Language language = languageRepository.findById(languageId).orElse(new Language());
            newBook.setLanguageID(language);
        }

        if(bookModel.getPage_number() > 0){
            newBook.setPageCount(bookModel.getPage_number());
        }
        if(bookModel.getImgUrl().length() > 0){
            newBook.setCoverLink(bookModel.getImgUrl());
        }

        newBook.setReviewed(false);

        bookRepository.save(newBook);

        for(JSONObject a: bookModel.getAuthors()){
            Integer authorID = a.getAsNumber("id").intValue();
            Author author;
            if(authorID < 0){
                author = new Author(a.getAsString("name"));
                authorRepository.save(author);
            } else{
                author = authorRepository.findById(
                        authorID
                ).orElse(new Author());
            }
            BookAuthorId bookAuthorId = new BookAuthorId(newBook.getId(), author.getId());
            BookAuthor bookAuthor = new BookAuthor(bookAuthorId, newBook, author);

            bookAuthorRepository.save(bookAuthor);
        }

        for(JSONObject g: bookModel.getGenres()){
            Integer genreID = g.getAsNumber("id").intValue();
            Genre genre = genreRepository.findById(
                        genreID
                ).orElse(new Genre());

            BookGenreId bookGenreId = new BookGenreId(newBook.getId(), genre.getId());
            BookGenre bookGenre = new BookGenre(bookGenreId, newBook, genre);

            bookGenreRepository.save(bookGenre);
        }

        return newBook;
    }

    public Book findBookByIsbn(String isbn) {
        // TODO: sprawdzać czy isbn w dobrym formacie

        if(bookRepository.findByIsbn(isbn) != null){
            throw new BookWithIsbnExistsException(bookRepository.findByIsbn(isbn).getId());
        }

        Book newBook = new Book();
        newBook.setIsbn(isbn);
        newBook.setReviewed(true);
        try {
            JsonObject jsonObject= isbnService.getDataFromGoogle(isbn);
            if(jsonObject.get("totalItems").getAsNumber().intValue() > 0){
                JsonElement jsonElement= jsonObject.get("items").getAsJsonArray().get(0);
                JsonObject volumeInfo = jsonElement.getAsJsonObject().getAsJsonObject("volumeInfo");

                this.setBookFromGoogle(volumeInfo, newBook);

                String editionIsbn = isbnService.getEditionData(isbn);

                if(editionIsbn != null)
                    this.setBookEdition(newBook, editionIsbn);

                JsonObject info = null;
                try{
                    info = isbnService.getDataFromOpenLibrary(isbn);
                }catch(FileNotFoundException e){

                }

                if(info != null)
                    this.setDataFromOpenLibrary(info, newBook);

                bookRepository.save(newBook);

                if(newBook.getEditionID() != null && editionBookUserRepository.findByEdition_IdAndUserNull(newBook.getEditionID().getId())== null){
                    EditionBookUser editionBookUser = new EditionBookUser();
                    editionBookUser.setBook(newBook);
                    editionBookUser.setEdition(newBook.getEditionID());
                    editionBookUserRepository.save(editionBookUser);
                }


                this.setCategories(volumeInfo, newBook);

                if(info != null)
                    this.setAuthors(info, newBook);
            }
        }catch (IOException e){
            throw new RuntimeException(e);
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }

        return newBook;
    }

    private void setBookEdition(Book newBook, String editionIsbn) {
        Edition edition = editionRepository.findByEditionIsbn(editionIsbn);
        if(edition == null)
        {
            edition = new Edition(editionIsbn);
            editionRepository.save(edition);
        }
        newBook.setEditionID(edition);
    }

    private void setBookFromGoogle(JsonObject volumeInfo, Book newBook){
        if(volumeInfo.get("title") != null)
            newBook.setTitle(volumeInfo.get("title").getAsString());
        if(volumeInfo.get("description") != null)
            newBook.setDescription(volumeInfo.get("description").getAsString());
        if(volumeInfo.get("publishedDate")!= null)
            try{
                newBook.setPublishedDate(LocalDate.parse(volumeInfo.get("publishedDate").getAsString()));
            } catch(DateTimeParseException e){
                Year year;
                try{
                    year = Year.parse(volumeInfo.get("publishedDate").getAsString());
                }catch(DateTimeParseException e2){
                    year = Year.parse(volumeInfo.get("publishedDate").getAsString().substring(0,4));
                }
                newBook.setPublishedDate(year.atDay(1));
            }
        if(volumeInfo.get("publisher") != null){
            String publisherName = volumeInfo.get("publisher").getAsString();
            Publisher publisher = publisherRepository.findByName(publisherName);
            if(publisher == null){
                publisher = new Publisher(publisherName);
                publisherRepository.save(publisher);
            }
            newBook.setPublisherID(publisher);
        }

        if(volumeInfo.get("pageCount") != null){
            newBook.setPageCount(volumeInfo.get("pageCount").getAsInt());
        } else{
            newBook.setPageCount(0);
        }

        if(volumeInfo.get("language") != null){
            Language language = languageRepository.findLanguageByCode(volumeInfo.get("language").getAsString());
            if(language != null)  newBook.setLanguageID(language);
        }

        if(volumeInfo.get("imageLinks") != null && volumeInfo.get("imageLinks").getAsJsonObject().get("smallThumbnail") != null){
            newBook.setCoverLink(volumeInfo.get("imageLinks").getAsJsonObject().get("smallThumbnail").getAsString());
        }
    }
    private void setDataFromOpenLibrary(JsonObject info, Book newBook){
        if(info.get("physical_format") != null){
            Format format = formatRepository.findByNameContainingIgnoreCase(info.get("physical_format").getAsString());
            newBook.setFormatID(format);
        }

        if(info.get("series") != null){
            String seriesName = info.get("series").getAsString();

            if(seriesName.matches(".*#.*")){
                int index = seriesName.indexOf("#");
                String name = seriesName.substring(0, index).trim();

                Series series = seriesRepository.findByNameIgnoreCase(name);
                if(series == null){
                    series = new Series(name);
                    seriesRepository.save(series);
                }
                newBook.setSeriesID(series);

                try{
                    Integer number = Integer.valueOf(seriesName.substring(index + 1));
                    newBook.setSeriesNumber(number);
                }catch (NumberFormatException e){

                }
            }
        }
    }

    private void setCategories(JsonObject volumeInfo, Book newBook){
        if(volumeInfo.get("categories") != null){
            JsonArray categories = volumeInfo.get("categories").getAsJsonArray();

            for(JsonElement c: categories){
                Genre genre = genreRepository.findByName(c.getAsString());
                if(genre == null){
                    genre = new Genre(c.getAsString());
                    genreRepository.save(genre);
                }

                BookGenreId bookGenreId = new BookGenreId(newBook.getId(), genre.getId());
                BookGenre bookGenre = new BookGenre(bookGenreId, newBook, genre);

                bookGenreRepository.save(bookGenre);
            }
        }
    }

    private void setAuthors(JsonObject info, Book newBook) throws IOException {
        if(info.get("authors") != null){
            JsonArray authors= info.get("authors").getAsJsonArray();

            for(JsonElement a: authors){
                String authorCode = a.getAsJsonObject().get("key").getAsString().replace("/authors/", "");

                Author author = authorRepository.findByAuthorOpenLibraryId(authorCode);

                if(author == null){
                    JsonObject authorObject = isbnService.getAuthor(authorCode);
                    if(authorObject.get("personal_name")!= null || authorObject.get("name")!= null){
                        JsonElement nonNullName = Stream.of(authorObject.get("personal_name"), authorObject.get("name")).filter(Objects::nonNull).findFirst().orElse(null);
                        author = new Author(authorCode, nonNullName.getAsString());
                        authorRepository.save(author);
                    }else{
                        return;
                    }
                }

                BookAuthorId bookAuthorId = new BookAuthorId(newBook.getId(), author.getId());
                BookAuthor bookAuthor = new BookAuthor(bookAuthorId, newBook, author);

                bookAuthorRepository.save(bookAuthor);

            }
        }
    }

    public BookModel getBookModelFromId(Integer id){
        Optional<Book> book = bookRepository.findById(id);
        if(book.isEmpty()){
            return null;
        }
        Book bookFound = book.get();
        BookModel bookModel = new BookModel(bookFound);

        List<BookAuthor> bookAuthors = bookAuthorRepository.findAllByBookID(bookFound);
        List<Author> authors = authorRepository.findByIdIn(bookAuthors.stream().map(ba -> ba.getAuthorID().getId()).toList());
        bookModel.setAuthors(authors);

        List<BookGenre> bookGenres = bookGenreRepository.findAllByBookID(bookFound);
        List<Genre> genres = genreRepository.findByIdIn(bookGenres.stream().map(bg -> bg.getGenreID().getId()).toList());

        bookModel.setGenres(genres);
        bookModel.setPublisher(bookFound.getPublisherID());
        bookModel.setFormat(bookFound.getFormatID());
        bookModel.setLanguage(bookFound.getLanguageID());
        bookModel.setSeries_name(bookFound.getSeriesID());
        return bookModel;
    }
    public boolean checkIsbn(String isbn){
        int sum = 0;
        if(isbn.length() == 13){
            if(!isbn.startsWith("978") && !isbn.startsWith("979")) return false;
            for (int i = 0; i < isbn.length(); i++) {
                int sumElement = Integer.parseInt(isbn.substring(i, i+1));
                int pre = i%2 == 0 ? 1: 3;
                sum = sum + (sumElement * pre);
            }

            if(sum % 10 == 0) return true;

        }else{
            for (int i = 0; i < isbn.length(); i++) {
                int sumElement = Integer.parseInt(isbn.substring(i, i+1));
                int pre = isbn.length() - i;
                sum = sum + (sumElement * pre);
            }

            if(sum % 11 == 0) return true;
        }

        return false;
    }

    public Language getLanguageFromIsbn(String isbn){
        List<Language> languages = languageRepository.findAll();

        if(isbn.length() == 13){
            isbn = isbn.substring(3);
        }

        for(Language l : languages){
            String codes = l.getIsbn_group();
            for(String c : codes.split(",")){
                if(isbn.startsWith(c)) return l;
            }
        }

        return null;
    }

    public Integer getBookProgress(Integer bookId, String userToken){
        BookProgress bookProgress = bookProgressService.getBookProgressFromTokenAndBookId(userToken, bookId);

        if(bookProgress == null)
            return 0;
        else
            return bookProgress.getProgressPage();
    }

    public Integer updateProgress(Integer bookId, Integer newProgress, String userToken) {
        BookProgress bookProgress = bookProgressService.getBookProgressFromTokenAndBookId(userToken, bookId);

        if(newProgress == 0 && bookProgress != null){
            bookProgressRepository.delete(bookProgress);
        }else if(newProgress != 0 && bookProgress == null){
            bookProgress = bookProgressService.createProgressFromTokenAndBookId(userToken, bookId, newProgress);
            bookProgressRepository.save(bookProgress);
        }else{
            bookProgress.setProgressPage(newProgress);
            bookProgressRepository.save(bookProgress);
            return newProgress;
        }

        return 0;
    }

    public List<BookModel> getAllBooksByEdition(Integer editionid, String userToken){
        Integer selectedBookId = null;
        if(userToken != null){
            User user = null;
            if(authorizationHelper.checkDate(userToken)){
                String userMail = authorizationHelper.getUsernameFromToken(userToken);
                user = userRepository.findByEmail(userMail);
            }
                EditionBookUser editionBookUser = editionBookUserRepository.findByUserAndEdition_Id(user, editionid);
                if(editionBookUser == null)
                    editionBookUser = editionBookUserRepository.findByEdition_IdAndUserNull(editionid);
                selectedBookId = editionBookUser.getBook().getId();
        }else{
            EditionBookUser editionBookUser = editionBookUserRepository.findByEdition_IdAndUserNull(editionid);
            selectedBookId = editionBookUser.getBook().getId();
        }

        List<Book> books = bookRepository.findByEditionID_Id(editionid);
        List<BookModel> bookModels = new ArrayList<>();

        for(Book b: books){
            BookModel bookModel = this.getBookModelFromId(b.getId());
            if(b.getId() == selectedBookId){
                bookModel.setSelectedEdition(true);
            }

            bookModels.add(bookModel);
        }

        return bookModels;
    }

    public EditionBookUser changeEdition(Integer bookId, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);

        Book book = bookRepository.findById(bookId).orElseThrow();
        EditionBookUser editionBookUser = editionBookUserRepository.findByUserAndEdition_Id(user, book.getEditionID().getId());

        if(editionBookUser == null){
            EditionBookUser newEditionBookUser = new EditionBookUser();
            Edition edition = book.getEditionID();
            newEditionBookUser.setEdition(edition);
            newEditionBookUser.setBook(book);
            newEditionBookUser.setUser(user);
            editionBookUserRepository.save(newEditionBookUser);
            return newEditionBookUser;
        }else{
            editionBookUser.setBook(book);
            editionBookUserRepository.save(editionBookUser);
            return editionBookUser;
        }
    }

    public boolean saveBook(Integer bookid, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);
        Book book = bookRepository.findById(bookid).orElseThrow();

        SavedBookUser savedBookUser = savedBookUserRepository.findByBookAndUser(book, user);

        if(savedBookUser != null){
            savedBookUserRepository.delete(savedBookUser);
            return false;
        }

        SavedBookUserId savedBookUserId = new SavedBookUserId();
        savedBookUserId.setBookId(bookid);
        savedBookUserId.setUserId(user.getId());
        savedBookUser = new SavedBookUser(savedBookUserId, book, user);

        savedBookUserRepository.save(savedBookUser);
        return true;
    }

    public boolean isBookSaved(Integer bookid, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);
        Book book = bookRepository.findById(bookid).orElseThrow();

        SavedBookUser savedBookUser = savedBookUserRepository.findByBookAndUser(book, user);

        if(savedBookUser == null){
            return false;
        }

        return true;
    }

    public List<List<SummaryBookModel>> getTop() {
        List<List<SummaryBookModel>> allTop = new ArrayList<>();
        List<Top10AllTime> top10AllTimes = top10AllTimeRepository.findAll();
        List<SummaryBookModel> summaryBookModels = new ArrayList<>();

        for(Top10AllTime t: top10AllTimes){
            SummaryBookModel summaryBookModel = new SummaryBookModel();
            summaryBookModel.setBookModel(this.getBookModelFromId(t.getBookID()));
            summaryBookModel.setReplies(t.getNoteCount());
            summaryBookModels.add(summaryBookModel);
        }

        allTop.add(summaryBookModels);

        List<Top10Last24> top10ALast24 = top10Last24Repository.findAll();
        List<SummaryBookModel> summaryBookModels24 = new ArrayList<>();

        for(Top10Last24 t: top10ALast24){
            SummaryBookModel summaryBookModel24 = new SummaryBookModel();
            summaryBookModel24.setBookModel(this.getBookModelFromId(t.getBookID()));
            summaryBookModel24.setReplies(t.getNoteCount());
            summaryBookModels24.add(summaryBookModel24);
        }

        allTop.add(summaryBookModels24);

        return allTop;
    }

    public List<SummaryBookModel> getAllBooks(Integer amount, String userToken) {
        List<SummaryBookModel> summaryBookModels = new ArrayList<>();

        List<EditionBookUser> editionBookUsers = this.getEditionBookUserFromToken(userToken, amount, 9);

        List<Book> books = bookRepository.findAllById(editionBookUsers.stream().map(el -> el.getBook().getId()).toList());

        return getSummaryBookModels(books, summaryBookModels);
    }

    public List<SummaryBookModel> search(String search, String authorization) {
        search = search.replace("=", "");
        List<BookAuthor> bookAuthors = bookAuthorRepository.findByAuthorID_NameContainsIgnoreCase(search);
        List<Book> books = bookRepository.findByTitleLikeIgnoreCaseOrSeriesID_NameLikeIgnoreCase(search, search);
        List<Integer> bookIds = Stream.concat(bookAuthors.stream().map(b -> b.getBookID().getId()), books.stream().map(b -> b.getId())).toList();


        List <Book> foundBooks = bookRepository.findAllById(bookIds);
        List <EditionBookUser> editionBookUsers = this.getEditionBookUserFromToken(authorization, 0, 50);

        // get editions that user chose that are in found books
        List<Book> intersectionBooks = editionBookUsers.stream()
                .map(b -> b.getBook())
                .filter(el -> foundBooks.stream().map(fb -> fb.getEditionID() != null ? fb.getEditionID().getId() : null)
                        .toList()
                        .contains(el.getEditionID().getId())).toList();
        List<Book> booksNoEditionAndIntersection = Stream.concat(intersectionBooks.stream(), foundBooks.stream().filter(book -> book.getEditionID() == null).toList().stream()).toList();



        List<SummaryBookModel> summaryBookModels = new ArrayList<>();
        return getSummaryBookModels(booksNoEditionAndIntersection, summaryBookModels);

    }

    private List<SummaryBookModel> getSummaryBookModels(List<Book> booksNoEditionAndIntersection, List<SummaryBookModel> summaryBookModels) {
        for(Book b : booksNoEditionAndIntersection){
            SummaryBookModel summaryBookModel = new SummaryBookModel();
            summaryBookModel.setBookModel(this.getBookModelFromId(b.getId()));
            summaryBookModel.setReplies(noteRepository.countByBook_IdIsAndAccess_NameIs(b.getId(), "public"));
            summaryBookModels.add(summaryBookModel);
        }

        return summaryBookModels;
    }

    private List<EditionBookUser> getEditionBookUserFromToken(String userToken, Integer amount, Integer limit){
        User user = null;

        if(userToken != null){
            if(authorizationHelper.checkDate(userToken)){
                String userMail = authorizationHelper.getUsernameFromToken(userToken);
                user = userRepository.findByEmail(userMail);
            }
        }
        List<EditionBookUser> editionBookUsers;

        if(user != null){
            List<EditionBookUser> usersEditions= editionBookUserRepository.findByUser_Id(user.getId());
            editionBookUsers = editionBookUserRepository.findAllUsersEditions(amount, usersEditions.stream().map(e -> e.getEdition().getId()).toList(), user.getId(), limit);
        }else{
            editionBookUsers= editionBookUserRepository.findByUserNull(amount, limit);
        }

        return editionBookUsers;
    }

    public List<SummaryBookModel> getCurrentlyReading(String authorization) {
        List<SummaryBookModel> summaryBookModels= new ArrayList<>();
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);

        List<BookProgress> bookProgresses = bookProgressRepository.findByUser(user);
        for(BookProgress bp : bookProgresses){
            SummaryBookModel summaryBookModel = new SummaryBookModel();
            summaryBookModel.setBookModel(this.getBookModelFromId(bp.getBook().getId()));
            summaryBookModel.setReplies(noteRepository.countByBook_IdIsAndAccess_NameIs(bp.getBook().getId(), "public"));
            summaryBookModels.add(summaryBookModel);
        }

        return summaryBookModels;
    }

    public List<SummaryBookModel> getSaved(String authorization) {
        List<SummaryBookModel> summaryBookModels= new ArrayList<>();
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);

        List<SavedBookUser> savedBookUsers = savedBookUserRepository.findByUser(user);
        for(SavedBookUser bp : savedBookUsers){
            SummaryBookModel summaryBookModel = new SummaryBookModel();
            summaryBookModel.setBookModel(this.getBookModelFromId(bp.getBook().getId()));
            summaryBookModel.setReplies(noteRepository.countByBook_IdIsAndAccess_NameIs(bp.getBook().getId(), "public"));
            summaryBookModels.add(summaryBookModel);
        }

        return summaryBookModels;
    }
}
