package com.dominikafudala.papier.controller;

import com.dominikafudala.papier.service.BuddyReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping( "/buddy")
public class BuddyReadController {

    private final BuddyReadService buddyReadService;

    @Autowired
    public BuddyReadController(BuddyReadService buddyReadService) {
        this.buddyReadService = buddyReadService;
    }

    @GetMapping("/{bookid}")
    public ResponseEntity<?> getUserBuddyReadsForBook(@PathVariable Integer bookid, HttpServletRequest request){

        return ResponseEntity.ok(buddyReadService.getBuddyReadsForBookAndUser(bookid, request.getHeader("Authorization")));
    }
}
