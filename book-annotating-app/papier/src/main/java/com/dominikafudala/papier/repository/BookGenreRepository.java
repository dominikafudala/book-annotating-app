package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.BookGenre;
import com.dominikafudala.papier.entity.BookGenreId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookGenreRepository extends JpaRepository<BookGenre, BookGenreId> {
}
