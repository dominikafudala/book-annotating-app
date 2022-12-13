package com.dominikafudala.papier.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;

/**
 * Mapping for DB view
 */
@Entity
@Immutable
@Table(name = "top_10_last_24")
@Setter
@Getter
public class Top10Last24 {
    @Id
    @Column(name = "bookID", nullable = false)
    private Integer bookID;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "cover_link")
    private String coverLink;

    @Column(name = "note_count", nullable = false)
    private Long noteCount;

    protected Top10Last24() {
    }
}
