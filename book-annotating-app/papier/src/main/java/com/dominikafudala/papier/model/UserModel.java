package com.dominikafudala.papier.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor
public class UserModel {
    private String username;
    private String email;
    private String password;
    private String repeatPassword;

    public String getUsername() {
        return username;
    }
}
