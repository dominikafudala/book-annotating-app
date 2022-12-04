package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
