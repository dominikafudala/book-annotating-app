package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    @Query("select n from Note n where n.book = ?1 and n.access = ?2 and n.parentNote is null order by n.likes desc")
    List<Note> findAllByBookAndAccess(Book book, NoteAccess access);

    @Query("select count(distinct n) from Note n where n.parentNote.id = ?1")
    Integer countDistinctByParentNote_IdIs(Integer id);

    @Query("select n from Note n where n.book = ?1 and n.user = ?2 and n.parentNote is null order by n.likes desc")
    List<Note> findAllByBookAndUser(Book book, User user);

    List<Note> findNoteByBookAndBuddyReadidIn(Book book, List<BuddyRead> buddyReads);

    long countByBook_IdIsAndAccess_NameIs(Integer id, String name);



}
