package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "edition")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "editionID", nullable = false)
    private Integer id;

    @Column(name = "edition_isbn", nullable = false)
    private String editionIsbn;

    public Edition(String editionIsbn) {
        this.editionIsbn = editionIsbn;
    }
}
