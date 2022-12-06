package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Author;
import com.dominikafudala.papier.entity.BookAuthor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, Integer>, DataRepository {
    Author findByAuthorOpenLibraryId(String id);
    List<Author> findByIdIn(List<Integer> id);
}
