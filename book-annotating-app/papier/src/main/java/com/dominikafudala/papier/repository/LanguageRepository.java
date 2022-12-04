package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Integer>, DataRepository {
    Language findLanguageByCode(String code);
}
