package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.BookGenre;
import com.dominikafudala.papier.entity.BookGenreId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookGenreRepository extends JpaRepository<BookGenre, BookGenreId> {
    List<BookGenre> findAllByBookID(Book id);
}
