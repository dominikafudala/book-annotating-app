package com.dominikafudala.papier.entity;

import com.dominikafudala.papier.entity.Book;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "buddy_read")
@Setter
@Getter
public class BuddyRead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buddy_read_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIncludeProperties("title")
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;


}
