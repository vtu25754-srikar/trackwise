package com.trackwise.trackwise.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trackwise.trackwise.dto.LoginRequest;
import com.trackwise.trackwise.entity.User;
import com.trackwise.trackwise.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        System.out.println("===== REGISTER HIT =====");
        System.out.println(user);

        return authService.register(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }
}