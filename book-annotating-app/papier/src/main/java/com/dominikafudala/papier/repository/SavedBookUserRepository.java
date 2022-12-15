package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.SavedBookUser;
import com.dominikafudala.papier.entity.SavedBookUserId;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedBookUserRepository extends JpaRepository<SavedBookUser, SavedBookUserId> {
    SavedBookUser findByBookAndUser(Book book, User user);

    List<SavedBookUser> findByUser(User user);



}
