package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.Token;
import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.entity.UserType;
import com.dominikafudala.papier.exceptions.PasswordDontMatchException;
import com.dominikafudala.papier.model.UserModel;
import com.dominikafudala.papier.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final EmailService emailService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, EmailService emailService, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    public User newUser(UserModel userModel){
        checkPasswords(userModel.getPassword(), userModel.getRepeatPassword());

        User newUser = new User();
        newUser.setUsername(userModel.getUsername());
        newUser.setEmail(userModel.getEmail());
        newUser.setPassword(passwordEncoder.encode(userModel.getPassword()));

        UserType userType = new UserType();
        userType.setId(2);
        newUser.setUserTypeid(userType);

        this.userRepository.save(newUser);

        return newUser;
    }

    private void checkPasswords(String password, String repeatPassword){
        if(!Objects.equals(password, repeatPassword)){
            throw new PasswordDontMatchException();
        }
    }

    public void signupToken(User user) {
        Token token = this.tokenService.createSignupToken(user);
        this.emailService.sendTokenMail(user, token.getToken());
    }

    public void verifyToken(String token) {
        Token tokenFound = tokenService.findToken(token);

        if(tokenFound == null) {
            // TODO: exception token not found
            System.out.println("Token not found");
            return;
        }

        if(!tokenService.verifyTime(tokenFound)){
            // TODO: token expired
            System.out.println("Token expired");
            tokenService.deleteToken(tokenFound);
            return;
        }

        User user = tokenFound.getUserID();

        tokenService.deleteToken(tokenFound);

        if(user == null){
            // TODO: users token not found
            System.out.println("Token not found");
            return;
        }

        user.setEnabled(true);

        userRepository.save(user);
    }
}
