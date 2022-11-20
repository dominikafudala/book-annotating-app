package com.dominikafudala.papier.exceptions;

public class PasswordDontMatchException extends RuntimeException {
    public PasswordDontMatchException() {
        super("Passwords don't match");
    }
}
