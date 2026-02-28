package com.trackwise.trackwise.service;

import org.springframework.stereotype.Service;

import com.trackwise.trackwise.entity.User;
import com.trackwise.trackwise.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER
    public User register(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        return userRepository.save(user);
    }

    // LOGIN
    public User login(String email, String password) {
        User dbUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!dbUser.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return dbUser;
    }
    
    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setMonthlyLimit(updatedUser.getMonthlyLimit());

        return userRepository.save(user);
    }
}