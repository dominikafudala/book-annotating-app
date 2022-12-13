package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.EditionBookUser;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public interface EditionBookUserRepository extends JpaRepository<EditionBookUser, Integer> {
    EditionBookUser findByUserAndEdition_Id(User user, Integer id);

    @Query("select e from EditionBookUser e where e.edition.id = ?1 and e.user is null")
    EditionBookUser findByEdition_IdAndUserNull(Integer id);

    @Query(value = "select * from edition_book_user where user_id is null order by edition_id limit 10 offset ?1 ", nativeQuery = true)
    List<EditionBookUser> findByUserNull(Integer skip);




}
