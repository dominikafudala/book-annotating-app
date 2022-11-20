package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Integer> {
}