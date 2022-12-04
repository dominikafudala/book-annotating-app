package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "genre")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Genre implements DataInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genreID", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    public Genre(String name) {
        this.name = name;
    }
}
