package com.dominikafudala.papier.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "publisher")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonSerialize
public class Publisher implements DataInterface{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publisherID", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    public Publisher(String name) {
        this.name = name;
    }
}
