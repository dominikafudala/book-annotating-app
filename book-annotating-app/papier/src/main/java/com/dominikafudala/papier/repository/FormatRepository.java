package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Format;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormatRepository extends JpaRepository<Format, Integer>, DataRepository {
    Format findByNameContainingIgnoreCase(String format);
}
