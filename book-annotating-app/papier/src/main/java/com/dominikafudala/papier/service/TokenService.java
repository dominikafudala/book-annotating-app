package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.Token;
import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class TokenService {

    @Autowired
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Token createSignupToken(User user) {
        String token = UUID.randomUUID().toString();

        Token newToken = new Token(user, token);

        this.tokenRepository.save(newToken);

        return newToken;
    }

    public Token findToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public boolean verifyTime(Token tokenFound) {
        Instant i = Instant.now();

        return(ChronoUnit.MINUTES.between(i, tokenFound.getExpirationDate()) > 0);
    }

    public void deleteToken(Token token) {
        tokenRepository.delete(token);
    }
}
