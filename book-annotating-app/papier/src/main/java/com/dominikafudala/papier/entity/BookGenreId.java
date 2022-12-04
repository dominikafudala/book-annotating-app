package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class BookGenreId implements Serializable {
    @Serial
    private static final long serialVersionUID = -7429805212445988080L;
    @Column(name = "bookID", nullable = false)
    private Integer bookID;

    @Column(name = "genreID", nullable = false)
    private Integer genreID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BookGenreId entity = (BookGenreId) o;
        return Objects.equals(this.genreID, entity.genreID) &&
                Objects.equals(this.bookID, entity.bookID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(genreID, bookID);
    }

}
