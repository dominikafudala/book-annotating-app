package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.Token;
import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.entity.UserType;
import com.dominikafudala.papier.exceptions.PasswordDontMatchException;
import com.dominikafudala.papier.model.UserModel;
import com.dominikafudala.papier.repository.UserRepository;
import com.dominikafudala.papier.repository.UserTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TokenService tokenService;
    private final UserTypeRepository userTypeRepository;
    private final PasswordEncoder passwordEncoder;

    public User newUser(UserModel userModel){
        checkPasswords(userModel.getPassword(), userModel.getRepeatPassword());

        User newUser = new User();
        newUser.setUsername(userModel.getUsername());
        newUser.setEmail(userModel.getEmail());
        newUser.setPassword(passwordEncoder.encode(userModel.getPassword()));

        UserType userType = userTypeRepository.findById(2).orElse(new UserType());

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

    public User login(String email, String password) {
        // TODO: case jak nie znajdzie usera o danym mailu
        User user = userRepository.findByEmail(email);

        if(Objects.equals(passwordEncoder.encode(password), user.getPassword())){
            System.out.println("złe hasło");
        }

        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(mail);

        if (user != null) {
            return new org.springframework.security.core.userdetails.User(user.getEmail(),
                    user.getPassword(),
                    mapRolesToAuthorities(user.getUserTypeid()));
        }else{
            throw new UsernameNotFoundException("Invalid username or password.");
        }
    }

    private Collection < ? extends GrantedAuthority> mapRolesToAuthorities(UserType role) {
        return Collections.singleton(new SimpleGrantedAuthority(role.getName()));
    }
}
