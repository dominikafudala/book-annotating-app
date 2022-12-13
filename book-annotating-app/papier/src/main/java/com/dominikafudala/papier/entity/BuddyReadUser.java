package com.dominikafudala.papier.entity;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "buddy_read_user")
@Setter
@Getter
public class BuddyReadUser {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private BuddyReadUserId id;

    @MapsId("buddyReadId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIncludeProperties("book")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "buddy_read_id", nullable = false)
    private BuddyRead buddyRead;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIncludeProperties("username")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
