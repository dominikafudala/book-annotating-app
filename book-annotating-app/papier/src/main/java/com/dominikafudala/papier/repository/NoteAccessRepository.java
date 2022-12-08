package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.NoteAccess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteAccessRepository extends JpaRepository<NoteAccess, Integer> {
    NoteAccess findByNameIgnoreCase(String name);
}
