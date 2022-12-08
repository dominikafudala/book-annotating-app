package com.dominikafudala.papier.entity;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BuddyReadUserId implements Serializable {
    private static final long serialVersionUID = 355376598978850198L;
    @Column(name = "buddy_read_id", nullable = false)
    private Integer buddyReadId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    public Integer getBuddyReadId() {
        return buddyReadId;
    }

    public void setBuddyReadId(Integer buddyReadId) {
        this.buddyReadId = buddyReadId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BuddyReadUserId entity = (BuddyReadUserId) o;
        return Objects.equals(this.buddyReadId, entity.buddyReadId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(buddyReadId, userId);
    }

}
