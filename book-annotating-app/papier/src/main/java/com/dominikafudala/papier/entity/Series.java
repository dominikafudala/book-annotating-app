package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "series")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Series implements DataInterface{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seriesID", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "current_val", nullable = false)
    private Integer currentVal;

}
