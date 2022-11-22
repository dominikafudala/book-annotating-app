package com.dominikafudala.papier.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    private final Integer EXP_TIME_MINUTES = 15;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tokenID", nullable = false)
    private Integer id;

    @Column(name = "expiration_date", nullable = false)
    private Instant expirationDate;

    @Column(name = "token", nullable = false)
    private String token;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "userID", nullable = false)
    private User userID;

    public Token(User user, String token) {
        this.token = token;
        this.userID = user;
        this.expirationDate = this.calculateExpDate();
    }

    private Instant calculateExpDate() {
        Instant i = Instant.now();
        return i.plus(EXP_TIME_MINUTES, ChronoUnit.MINUTES);
    }

}