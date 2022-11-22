package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "user_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserType {
    @Id
    @Column(name = "user_typeID", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 40)
    private String name;
}