package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.BuddyRead;
import com.dominikafudala.papier.entity.BuddyReadUser;
import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.filter.AuthorizationHelper;
import com.dominikafudala.papier.repository.BuddyReadRepository;
import com.dominikafudala.papier.repository.BuddyReadUserRepository;
import com.dominikafudala.papier.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BuddyReadService {
    private final AuthorizationHelper authorizationHelper;
    private final UserRepository userRepository;
    private final BuddyReadRepository buddyReadRepository;
    private final BuddyReadUserRepository buddyReadUserRepository;

    public List<BuddyReadUser> getBuddyReadsForBookAndUser(Integer bookid, String authorization) {
        String userMail = authorizationHelper.getUsernameFromToken(authorization);
        User user = userRepository.findByEmail(userMail);

        List<BuddyRead> buddyReads = buddyReadUserRepository.findBuddyReadsByUserId(user);

        List<BuddyRead> bookBuddyReads = buddyReads.stream().filter(buddyRead -> {
            return buddyRead.getBook().getId().intValue() == bookid.intValue();
        }).toList();


        return buddyReadUserRepository.findBuddyReadUserByBuddyRead(bookBuddyReads);

    }
}
