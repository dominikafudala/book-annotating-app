package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.BuddyRead;
import com.dominikafudala.papier.entity.BuddyReadUser;
import com.dominikafudala.papier.entity.BuddyReadUserId;
import com.dominikafudala.papier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BuddyReadUserRepository extends JpaRepository<BuddyReadUser, BuddyReadUserId> {
    @Query("select b.buddyRead from BuddyReadUser b where b.user = ?1")
    List<BuddyRead> findBuddyReadsByUserId(User user);
}
