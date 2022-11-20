package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserType, Integer> {
}