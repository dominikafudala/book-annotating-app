package com.dominikafudala.papier.controller;

import com.dominikafudala.papier.entity.Note;
import com.dominikafudala.papier.model.NoteModel;
import com.dominikafudala.papier.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping( "/note")
public class NoteController {
    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }


    @GetMapping("/{bookid}")
    public ResponseEntity<?> getPublicNotes(@PathVariable Integer bookid){
        List<Note> notes = noteService.getAllPublicNotes(bookid);
        notes.forEach(note -> note.setReplies(noteService.countReplies(note.getId())));
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/user/{bookid}")
    public ResponseEntity<?> getUserNotes(@PathVariable Integer bookid, HttpServletRequest request){
        List<Note> notes = noteService.getAllUserNotes(bookid, request.getHeader("Authorization"));
        notes.forEach(note -> note.setReplies(noteService.countReplies(note.getId())));
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/buddy/{bookid}")
    public ResponseEntity<?> getBuddyNotes(@PathVariable Integer bookid, HttpServletRequest request){
        List<Note> notes = noteService.getAllBuddyNotes(bookid, request.getHeader("Authorization"));
        notes.forEach(note -> note.setReplies(noteService.countReplies(note.getId())));
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/addnote")
    public ResponseEntity<?> addNote(@RequestBody NoteModel noteModel, HttpServletRequest request){
        noteService.addNewNote(noteModel, request.getHeader("Authorization"));
        return ResponseEntity.ok("ok");
    }
}
