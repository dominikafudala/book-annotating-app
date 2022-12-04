package com.dominikafudala.papier.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "language")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Language implements DataInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "languageID", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 2)
    private String code;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "isbn_group", nullable = false, length = 20)
    private String isbn_group;

}
