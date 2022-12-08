package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.*;
import com.dominikafudala.papier.filter.AuthorizationHelper;
import com.dominikafudala.papier.model.NoteModel;
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
    private final NoteTypeRepository noteTypeRepository;
    private final BuddyReadRepository buddyReadRepository;

    public NoteService(NoteRepository noteRepository, NoteAccessRepository noteAccessRepository, BookRepository bookRepository, AuthorizationHelper authorizationHelper, UserRepository userRepository, BuddyReadUserRepository buddyReadUserRepository, NoteTypeRepository noteTypeRepository, BuddyReadRepository buddyReadRepository) {
        this.noteRepository = noteRepository;
        this.noteAccessRepository = noteAccessRepository;
        this.bookRepository = bookRepository;
        this.authorizationHelper = authorizationHelper;
        this.userRepository = userRepository;
        this.buddyReadUserRepository = buddyReadUserRepository;
        this.noteTypeRepository = noteTypeRepository;
        this.buddyReadRepository = buddyReadRepository;
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

    public void addNewNote(NoteModel noteModel, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);

        Note note = new Note();

        note.setUser(user);

        Book book = bookRepository.findById(noteModel.getBookId()).orElseThrow();
        note.setBook(book);

        NoteType noteType = noteTypeRepository.findByNameIgnoreCase(noteModel.getType());
        note.setNoteType(noteType);

        note.setPage(noteModel.getPage());

        NoteAccess noteAccess = noteAccessRepository.findByNameIgnoreCase(noteModel.getAccess());
        note.setAccess(noteAccess);

        note.setQuote(noteModel.getQuote());
        note.setNote(noteModel.getNote());

        if(noteModel.getParentNoteId() != null){
            Note parentNote = noteRepository.findById(noteModel.getParentNoteId()).orElse(new Note());
            if(parentNote.getId() != null){
                note.setParentNote(parentNote);
            }
        }

        if(noteModel.getBuddyReadId() != null){
            BuddyRead buddyRead = buddyReadRepository.findById(noteModel.getBuddyReadId()).orElseThrow();
            note.setBuddyReadid(buddyRead);
        }

        noteRepository.save(note);
    }
}
