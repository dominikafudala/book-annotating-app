package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Publisher;
import com.dominikafudala.papier.entity.Series;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeriesRepository extends JpaRepository<Series, Integer>, DataRepository {
}
