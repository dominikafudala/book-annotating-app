package com.dominikafudala.papier.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "buddy_read_user")
public class BuddyReadUser {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private BuddyReadUserId id;

    @MapsId("buddyReadId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "buddy_read_id", nullable = false)
    private BuddyRead buddyRead;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public BuddyReadUserId getId() {
        return id;
    }

    public void setId(BuddyReadUserId id) {
        this.id = id;
    }

    public BuddyRead getBuddyRead() {
        return buddyRead;
    }

    public void setBuddyRead(BuddyRead buddyRead) {
        this.buddyRead = buddyRead;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
