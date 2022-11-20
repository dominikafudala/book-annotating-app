package com.dominikafudala.papier.controller;


import com.dominikafudala.papier.model.UserModel;
import com.dominikafudala.papier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController() {
        this.userService = new UserService();
    }


    @PostMapping("/signup")
    public String newUser(@RequestBody UserModel userModel){
        return "ye";
    }


}
