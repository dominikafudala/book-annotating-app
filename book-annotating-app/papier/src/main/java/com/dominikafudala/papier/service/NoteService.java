package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.Note;
import com.dominikafudala.papier.entity.NoteAccess;
import com.dominikafudala.papier.repository.BookRepository;
import com.dominikafudala.papier.repository.NoteAccessRepository;
import com.dominikafudala.papier.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final NoteAccessRepository noteAccessRepository;
    private final BookRepository bookRepository;

    public NoteService(NoteRepository noteRepository, NoteAccessRepository noteAccessRepository, BookRepository bookRepository) {
        this.noteRepository = noteRepository;
        this.noteAccessRepository = noteAccessRepository;
        this.bookRepository = bookRepository;
    }

    public List<Note> getAllPublicNotes(Integer bookId){
        NoteAccess  noteAccess = noteAccessRepository.findByNameIgnoreCase("public");
        Book book = bookRepository.findById(bookId).orElseThrow();
        return noteRepository.findAllByBookAndAccess(book, noteAccess);
    }

    public Integer countReplies(Integer id) {
        System.out.println(id);
        return noteRepository.countDistinctByParentNote_IdIs(id);
    }
}
