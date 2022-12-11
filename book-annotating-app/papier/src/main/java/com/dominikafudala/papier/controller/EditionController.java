package com.dominikafudala.papier.controller;

import com.dominikafudala.papier.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping( "/edition")
public class EditionController {
    private final BookService bookService;

    @Autowired
    public EditionController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{editionid}")
    public ResponseEntity<?> getBooksAndSelectedEdition(@PathVariable Integer editionid, HttpServletRequest request){
        return ResponseEntity.ok(bookService.getAllBooksByEdition(editionid, request.getHeader("Authorization")));
    }
}
