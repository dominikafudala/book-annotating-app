package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.BookProgress;
import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.BookProgressId;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookProgressRepository extends JpaRepository<BookProgress, BookProgressId> {
    BookProgress findByBookAndAndUser(Book book, User user);
    List<BookProgress> findByUser(User user);
}
