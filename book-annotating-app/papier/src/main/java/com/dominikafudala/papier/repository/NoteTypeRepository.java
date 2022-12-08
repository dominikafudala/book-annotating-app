package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.NoteType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteTypeRepository extends JpaRepository<NoteType, Integer> {
    NoteType findByNameIgnoreCase(String name);
}
