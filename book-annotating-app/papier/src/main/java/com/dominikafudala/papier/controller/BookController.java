package com.dominikafudala.papier.controller;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.model.BookModel;
import com.dominikafudala.papier.repository.*;
import com.dominikafudala.papier.service.BookService;
import com.dominikafudala.papier.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping( "/book")
public class BookController {

    private final DataService dataService;
    private final BookService bookService;
    private final PublisherRepository publisherRepository;
    private final LanguageRepository languageRepository;
    private final FormatRepository formatRepository;
    private final SeriesRepository seriesRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    @Autowired
    public BookController(DataService dataService, BookService bookService, PublisherRepository publisherRepository, LanguageRepository languageRepository, FormatRepository formatRepository, SeriesRepository seriesRepository, AuthorRepository authorRepository, GenreRepository genreRepository) {
        this.dataService = dataService;
        this.bookService = bookService;
        this.publisherRepository = publisherRepository;
        this.languageRepository = languageRepository;
        this.formatRepository = formatRepository;
        this.seriesRepository = seriesRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
    }

    @GetMapping("/publishers")
    public ResponseEntity<?> publishers(){
        return ResponseEntity.ok(dataService.getData(publisherRepository));
    }

    @GetMapping("/languages")
    public ResponseEntity<?> languages(){
        return ResponseEntity.ok(dataService.getData(languageRepository));
    }

    @GetMapping("/formats")
    public ResponseEntity<?> formats(){
        return ResponseEntity.ok(dataService.getData(formatRepository));
    }

    @GetMapping("/series")
    public ResponseEntity<?> series(){
        return ResponseEntity.ok(dataService.getData(seriesRepository));
    }

    @GetMapping("/authors")
    public ResponseEntity<?> authors(){
        return ResponseEntity.ok(dataService.getData(authorRepository));
    }

    @GetMapping("/genres")
    public ResponseEntity<?> genres(){
        return ResponseEntity.ok(dataService.getData(genreRepository));
    }

    @PostMapping("/addBook")
    public ResponseEntity<?> addBook(@RequestBody BookModel bookModel){
        Book book = bookService.newBook(bookModel);

        if(book == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(book.getId());
    }

    @PostMapping("/findbyisbn")
    public ResponseEntity<?> findByIsbn(@RequestBody String isbn){
        bookService.findBookByIsbn(isbn);
        return ResponseEntity.ok("ok");
    }
}
