package com.dominikafudala.papier.filter;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthorizationFilter extends OncePerRequestFilter {
    private final AuthorizationHelper authorizationHelper;

    private UserDetailsService userDetailsService;

    public AuthorizationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
        authorizationHelper = new AuthorizationHelper();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = authorizationHelper.getToken(request);

        if(token != null){

            String mail = authorizationHelper.getUsernameFromToken(token);

            if(mail != null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(mail);
                if(authorizationHelper.checkDate(token)){
                    UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);

    }
}
