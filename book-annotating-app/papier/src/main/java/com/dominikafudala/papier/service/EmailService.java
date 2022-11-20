package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.Transport;

@Service
@Configuration
public class EmailService {

    @Value("${spring.mail.username}")
    private String mailFrom;

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTokenMail(User user, String token){
        String msg = "Verify your email address\n";
        String baseUrl = "http://localhost:3000/verifyMail?token=" + token;

        SimpleMailMessage emailVerification = new SimpleMailMessage();

        emailVerification.setFrom(this.mailFrom);
        emailVerification.setTo(user.getEmail());
        emailVerification.setSubject("Papier - email verification");
        emailVerification.setText(msg+baseUrl);


        this.mailSender.send(emailVerification);
    }
}
