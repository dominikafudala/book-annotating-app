package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer>, DataRepository {
    Genre findByName(String name);
}
