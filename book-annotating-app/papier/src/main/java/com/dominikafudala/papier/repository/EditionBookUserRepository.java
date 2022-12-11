package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.EditionBookUser;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EditionBookUserRepository extends JpaRepository<EditionBookUser, Integer> {
    EditionBookUser findByUserAndEdition_Id(User user, Integer id);

    @Query("select e from EditionBookUser e where e.edition.id = ?1 and e.user is null")
    EditionBookUser findByEdition_IdAndUserNull(Integer id);
}
