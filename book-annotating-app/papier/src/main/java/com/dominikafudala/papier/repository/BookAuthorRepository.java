package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.BookAuthor;
import com.dominikafudala.papier.entity.BookAuthorId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookAuthorRepository extends JpaRepository<BookAuthor, BookAuthorId> {
}
