package com.dominikafudala.papier.config;

import com.dominikafudala.papier.filter.AuthenticationFilter;
import com.dominikafudala.papier.filter.AuthorizationFilter;
import com.dominikafudala.papier.filter.ResponseServerFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private  final UserDetailsService userDetailsService;
    private static final String[] NO_AUTH_URLS = {
            "/signup",
            "/verifyMail",
            "/login",
            "/book/{id:\\d+}",
            "/book/languages",
            "/note/{bookid:\\d+}",
            "/edition/{editionid:\\d+}"
    };

    private static final String[] USER_URLS = {
            "/book/**",
            "/note/**",
            "/buddy/**",
            "/edition/**"

    };
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors()
                .and()
                .csrf()
                .disable()
                .sessionManagement().sessionCreationPolicy(STATELESS);
        http
                .authorizeHttpRequests()
                .antMatchers(NO_AUTH_URLS).permitAll()
                .antMatchers(USER_URLS).hasAnyAuthority("user");

        // authorize user

        AuthenticationManager authenticationManager = authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager);
        authenticationFilter.setFilterProcessesUrl("/login");
        http.addFilter(authenticationFilter);
        http.addFilterBefore(new AuthorizationFilter(userDetailsService), UsernamePasswordAuthenticationFilter.class);
        http.addFilterAfter(new ResponseServerFilter(), AuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public static PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    }
