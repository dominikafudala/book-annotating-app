package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<Publisher, Integer>, DataRepository{

}
