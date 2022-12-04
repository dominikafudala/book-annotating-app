package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.*;
import com.dominikafudala.papier.model.BookModel;
import com.dominikafudala.papier.repository.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeParseException;

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

    private final IsbnService isbnService;

    public Book newBook (BookModel bookModel){
        Book newBook = new Book(bookModel.getTitle(), bookModel.getPage_number());

        if(bookModel.getIsbn().length() != 0) newBook.setIsbn(bookModel.getIsbn());
        if(!bookModel.getSeries_name().isEmpty()){
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

        if(!bookModel.getPublisher().isEmpty()){
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

        if(!bookModel.getFormat().isEmpty()){
            Integer formatId = bookModel.getFormat().getAsNumber("id").intValue();
            Format format = formatRepository.findById(formatId).orElse(new Format());
            newBook.setFormatID(format);
        }

        if(!bookModel.getLanguage().isEmpty()){
            Integer languageId = bookModel.getLanguage().getAsNumber("id").intValue();
            Language language = languageRepository.findById(languageId).orElse(new Language());
            newBook.setLanguageID(language);
        }

        if(bookModel.getPage_number() > 0){
            newBook.setPageCount(bookModel.getPage_number());
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

    public void findBookByIsbn(String isbn) {
        // TODO: sprawdzać czy isbn w dobrym formacie
        // TODO: sprawdzać czy ISBN istnieje już w bazie
        Book newBook = new Book();
        newBook.setIsbn(isbn);
        newBook.setReviewed(true);
        try {
            JsonObject jsonObject= isbnService.getDataFromGoogle(isbn);
            if(jsonObject.get("totalItems").getAsNumber().intValue() > 0){
                JsonElement jsonElement= jsonObject.get("items").getAsJsonArray().get(0);
                JsonObject volumeInfo = jsonElement.getAsJsonObject().getAsJsonObject("volumeInfo");

                this.setBookFromGoogle(volumeInfo, newBook);

                bookRepository.save(newBook);

                this.setCategories(volumeInfo, newBook);
            }
        }catch (IOException e){

        }
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
        }

        if(volumeInfo.get("language") != null){
            Language language = languageRepository.findLanguageByCode(volumeInfo.get("language").getAsString());
            if(language != null)  newBook.setLanguageID(language);
        }

        if(volumeInfo.get("imageLinks").getAsJsonObject().get("smallThumbnail") != null){
            newBook.setCoverLink(volumeInfo.get("imageLinks").getAsJsonObject().get("smallThumbnail").getAsString());
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
}
