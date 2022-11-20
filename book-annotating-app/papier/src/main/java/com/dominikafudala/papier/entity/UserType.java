package com.dominikafudala.papier.entity;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "user_type")
public class UserType {
    @Id
    @Column(name = "user_typeID", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}