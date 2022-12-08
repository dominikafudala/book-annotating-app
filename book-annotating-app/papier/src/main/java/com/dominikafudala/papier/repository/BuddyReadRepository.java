package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.BuddyRead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuddyReadRepository extends JpaRepository<BuddyRead, Integer> {
}
