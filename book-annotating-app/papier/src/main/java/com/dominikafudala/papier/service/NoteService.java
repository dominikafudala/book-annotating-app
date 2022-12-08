package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.*;
import com.dominikafudala.papier.filter.AuthorizationHelper;
import com.dominikafudala.papier.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final NoteAccessRepository noteAccessRepository;
    private final BookRepository bookRepository;
    private final AuthorizationHelper authorizationHelper;
    private final UserRepository userRepository;
    private final BuddyReadUserRepository buddyReadUserRepository;

    public NoteService(NoteRepository noteRepository, NoteAccessRepository noteAccessRepository, BookRepository bookRepository, AuthorizationHelper authorizationHelper, UserRepository userRepository, BuddyReadUserRepository buddyReadUserRepository) {
        this.noteRepository = noteRepository;
        this.noteAccessRepository = noteAccessRepository;
        this.bookRepository = bookRepository;
        this.authorizationHelper = authorizationHelper;
        this.userRepository = userRepository;
        this.buddyReadUserRepository = buddyReadUserRepository;
    }

    public List<Note> getAllPublicNotes(Integer bookId){
        NoteAccess  noteAccess = noteAccessRepository.findByNameIgnoreCase("public");
        Book book = bookRepository.findById(bookId).orElseThrow();
        return noteRepository.findAllByBookAndAccess(book, noteAccess);
    }

    public Integer countReplies(Integer id) {
        return noteRepository.countDistinctByParentNote_IdIs(id);
    }

    public List<Note> getAllUserNotes(Integer bookid, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        Book book = bookRepository.findById(bookid).orElseThrow();
        User user = userRepository.findByEmail(userMail);

        return noteRepository.findAllByBookAndUser(book, user);
    }

    public List<Note> getAllBuddyNotes(Integer bookid, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        Book book = bookRepository.findById(bookid).orElseThrow();
        User user = userRepository.findByEmail(userMail);

        List<BuddyRead> buddyReads = buddyReadUserRepository.findBuddyReadsByUserId(user);
        return noteRepository.findNoteByBookAndBuddyReadidIn(book, buddyReads);
    }
}
