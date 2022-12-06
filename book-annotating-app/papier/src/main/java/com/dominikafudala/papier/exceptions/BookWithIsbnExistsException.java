package com.dominikafudala.papier.exceptions;

public class BookWithIsbnExistsException extends RuntimeException{
    public BookWithIsbnExistsException(Integer bookId){
        super(String.valueOf(bookId));
    }
}
