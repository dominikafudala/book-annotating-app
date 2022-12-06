package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.BookAuthor;
import com.dominikafudala.papier.entity.BookAuthorId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookAuthorRepository extends JpaRepository<BookAuthor, BookAuthorId> {
    List<BookAuthor> findAllByBookID(Book id);
}
