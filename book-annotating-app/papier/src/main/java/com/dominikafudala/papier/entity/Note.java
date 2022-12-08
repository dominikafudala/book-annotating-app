package com.dominikafudala.papier.entity;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "note")
@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIncludeProperties({"username"})
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "note_type_id", nullable = false)
    private NoteType noteType;

    @Lob
    @Column(name = "note")
    private String note;

    @Lob
    @Column(name = "quote")
    private String quote;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "dislikes")
    private Integer dislikes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIncludeProperties("id")
    @JoinColumn(name = "parent_note_id")
    private Note parentNote;

    @Column(name = "page")
    private Integer page;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIncludeProperties("id")
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "access_id", nullable = false)
    private NoteAccess access;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIncludeProperties("id")
    @JoinColumn(name = "buddy_readID")
    private BuddyRead buddyReadid;

    private Integer replies;


}
