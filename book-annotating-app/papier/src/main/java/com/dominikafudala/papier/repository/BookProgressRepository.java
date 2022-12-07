package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.BookProgress;
import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.BookProgressId;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookProgressRepository extends JpaRepository<BookProgress, BookProgressId> {
    BookProgress findByBookAndAndUser(Book book, User user);
}
