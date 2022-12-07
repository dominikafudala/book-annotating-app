package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.Book;
import com.dominikafudala.papier.entity.BookProgress;
import com.dominikafudala.papier.entity.BookProgressId;
import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.filter.AuthorizationHelper;
import com.dominikafudala.papier.repository.BookProgressRepository;
import com.dominikafudala.papier.repository.BookRepository;
import com.dominikafudala.papier.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BookProgressService {
    private final UserRepository userRepository;
    private final BookProgressRepository bookProgressRepository;
    private final BookRepository bookRepository;

    private final AuthorizationHelper authorizationHelper;

    public BookProgress getBookProgressFromTokenAndBookId(String token, Integer bookId){
        String userMail = authorizationHelper.getUsernameFromToken(token);

        Book book = bookRepository.findById(bookId).orElseThrow();
        User user = userRepository.findByEmail(userMail);

        return  bookProgressRepository.findByBookAndAndUser(book, user);
    }

    public BookProgress createProgressFromTokenAndBookId(String userToken, Integer bookId, Integer pages) {
        String userMail = authorizationHelper.getUsernameFromToken(userToken);

        Book book = bookRepository.findById(bookId).orElseThrow();
        User user = userRepository.findByEmail(userMail);

        BookProgressId bookProgressId = new BookProgressId(book.getId(), user.getId());
        return new BookProgress(bookProgressId, user, book, pages);
    }
}
