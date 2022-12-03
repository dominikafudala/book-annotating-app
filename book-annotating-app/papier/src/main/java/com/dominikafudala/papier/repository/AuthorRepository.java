package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer>, DataRepository {
}
