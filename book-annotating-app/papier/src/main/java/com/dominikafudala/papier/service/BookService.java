package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.*;
import com.dominikafudala.papier.exceptions.BookWithIsbnExistsException;
import com.dominikafudala.papier.model.BookModel;
import com.dominikafudala.papier.repository.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.transaction.Transactional;
import javax.xml.parsers.ParserConfigurationException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeParseException;
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

    private final IsbnService isbnService;

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
                Year year = Year.parse(volumeInfo.get("publishedDate").getAsString());
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
}
