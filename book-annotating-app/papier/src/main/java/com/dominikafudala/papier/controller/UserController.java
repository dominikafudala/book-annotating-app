package com.dominikafudala.papier.controller;


import com.dominikafudala.papier.entity.User;
import com.dominikafudala.papier.model.UserModel;
import com.dominikafudala.papier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> newUser(@RequestBody UserModel userModel){
        User user = this.userService.newUser(userModel);
        this.userService.signupToken(user);

        return ResponseEntity.ok("ok");
    }

    @GetMapping("/verifyMail")
    public String verifyToken(@RequestParam("token") String token){
        try {
            userService.verifyToken(token);
        } catch(Exception e){
            // TODO: łapać exceptions z tokenów
            return "Couldn't verify account";
        }
        return "Your account was verified";
    }

    @GetMapping("/random")
    public void random(){
        System.out.println("ye");
    }


}
