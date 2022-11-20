package com.dominikafudala.papier.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    @Value("${spring.mail.username}")
    private String username;
    @Value("${spring.mail.password}")
    private String password;

    @Bean
    public JavaMailSender javaMailSender(){
        JavaMailSenderImpl impl = new JavaMailSenderImpl();
        Properties pros = new Properties();
        pros.put("mail.smtp.starttls.enable", "true");
        pros.put("spring.mail.properties.mail.smtp.auth", "true");
        pros.put("spring.mail.properties.mail.transport.protocol", "smtp");
        impl.setJavaMailProperties(pros);

        impl.setUsername(username);
        impl.setPassword(password);
        impl.setHost("smtp.gmail.com");
        impl.setPort(587);
        return impl;
    }
}
