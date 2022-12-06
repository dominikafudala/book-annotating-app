package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Edition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EditionRepository extends JpaRepository<Edition, Integer> {
    Edition findByEditionIsbn(String isbn);
}
