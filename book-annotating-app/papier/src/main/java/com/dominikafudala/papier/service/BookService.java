package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.*;
import com.dominikafudala.papier.model.BookModel;
import com.dominikafudala.papier.repository.*;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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
}
