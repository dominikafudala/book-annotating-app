package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    public Book findByIsbn(String isbn);

    List<Book> findByEditionID_Id(Integer id);

}
