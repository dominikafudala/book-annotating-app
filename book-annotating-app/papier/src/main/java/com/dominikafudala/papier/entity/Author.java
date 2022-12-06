package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "author")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Author implements DataInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authorID", nullable = false)
    private Integer id;

    @Column(name = "author_open_library_id", length = 50)
    private String authorOpenLibraryId;

    @Column(name = "name", nullable = false)
    private String name;

    public Author(String name) {
        this.name = name;
    }

    public Author(String authorCode, String personal_name) {
        this.authorOpenLibraryId = authorCode;
        this.name = personal_name;
    }
}
