package com.dominikafudala.papier.controller;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.exceptions.BookWithIsbnExistsException;
import com.dominikafudala.papier.model.BookModel;
import com.dominikafudala.papier.repository.*;
import com.dominikafudala.papier.service.BookService;
import com.dominikafudala.papier.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
        isbn = isbn.replace("=", "");
        Book book;
        try{
            book = bookService.findBookByIsbn(isbn);
        } catch (BookWithIsbnExistsException e){
            return ResponseEntity.ok("-" + e.getMessage());
        }

        return ResponseEntity.ok(book.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findBook (@PathVariable Integer id){
        BookModel bookModel = bookService.getBookModelFromId(id);
        if(bookModel == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(bookModel);
    }

    @PostMapping("/checkIsbn")
    public ResponseEntity<?> checkIsbn(@RequestBody String isbn){
        return ResponseEntity.ok(bookService.checkIsbn(isbn.replace("=", "")));
    }

    @PostMapping("/getLanguageFromIsbn")
    public ResponseEntity<?> getLanguageFromIsbn(@RequestBody String isbn){
        return ResponseEntity.ok(bookService.getLanguageFromIsbn(isbn.replace("=", "")));
    }

    @GetMapping("/getbookprogress/{bookid}")
    public ResponseEntity<?> getProgress(@PathVariable Integer bookid, HttpServletRequest request){

        return ResponseEntity.ok(bookService.getBookProgress(bookid, request.getHeader("Authorization")));
    }

    @PostMapping("/updateprogress/{bookid}")
    public ResponseEntity<?> updateProgress(@PathVariable Integer bookid, @RequestBody Integer newProgress, HttpServletRequest request){

        return ResponseEntity.ok(bookService.updateProgress(bookid, newProgress, request.getHeader("Authorization")));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveBook(@RequestBody Integer bookid, HttpServletRequest request){

        return ResponseEntity.ok(bookService.saveBook(bookid, request.getHeader("Authorization")));
    }

    @GetMapping("/saved/{bookid}")
    public ResponseEntity<?> isBookSaved(@PathVariable Integer bookid, HttpServletRequest request){

        return ResponseEntity.ok(bookService.isBookSaved(bookid, request.getHeader("Authorization")));
    }

}
