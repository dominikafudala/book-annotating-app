package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Token;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}