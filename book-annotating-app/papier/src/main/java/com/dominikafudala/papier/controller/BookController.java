package com.dominikafudala.papier.controller;

import com.dominikafudala.papier.repository.*;
import com.dominikafudala.papier.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping( "/book")
public class BookController {

    private final DataService dataService;
    private final PublisherRepository publisherRepository;
    private final LanguageRepository languageRepository;
    private final FormatRepository formatRepository;
    private final SeriesRepository seriesRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    @Autowired
    public BookController(DataService dataService, PublisherRepository publisherRepository, LanguageRepository languageRepository, FormatRepository formatRepository, SeriesRepository seriesRepository, AuthorRepository authorRepository, GenreRepository genreRepository) {
        this.dataService = dataService;
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
}
