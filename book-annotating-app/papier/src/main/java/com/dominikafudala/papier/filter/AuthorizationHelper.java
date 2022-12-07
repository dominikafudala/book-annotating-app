package com.dominikafudala.papier.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class AuthorizationHelper {
    private static Algorithm SIGNATURE_ALGORITHM = Algorithm.HMAC256("secret".getBytes());
    private static final JWTVerifier verifier = JWT.require(SIGNATURE_ALGORITHM).build();

    public String getToken(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");

        if ( authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring("Bearer ".length());
        }

        return null;
    }

    public String getUsernameFromToken(String token){

        String username;
        if(token.startsWith("Bearer "))
            token = token.substring(7);
        try{
            DecodedJWT decodedJWT = verifier.verify(token);
            username = decodedJWT.getSubject();
        }catch(Exception e){
            username = null;
        }

        return username;
    }

    public boolean checkDate(String token){
        boolean isValid = false;
        try{
            DecodedJWT decodedJWT = verifier.verify(token);
            isValid = decodedJWT.getExpiresAt().after(new Date(System.currentTimeMillis()));
        }catch(Exception e){

        }

        return isValid;
    }

}
