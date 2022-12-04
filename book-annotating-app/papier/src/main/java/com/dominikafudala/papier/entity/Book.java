package com.dominikafudala.papier.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "book")
@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookID", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisherID")
    private Publisher publisherID;

    @Column(name = "published_date")
    private LocalDate publishedDate;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "page_count", nullable = false)
    private Integer pageCount;

    @Lob
    @Column(name = "cover_link")
    private String coverLink;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "languageID")
    private Language languageID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seriesID")
    private Series seriesID;

    @Column(name = "series_number")
    private Integer seriesNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "formatID")
    private Format formatID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "editionID")
    private Edition editionID;

    @Column(name = "isbn")
    private String isbn;


    public Book(String title, Integer page_number) {
        this.title = title;
        this.pageCount = page_number;
    }
}
