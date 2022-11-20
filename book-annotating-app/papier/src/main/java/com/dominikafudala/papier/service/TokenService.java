package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.Token;
import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
