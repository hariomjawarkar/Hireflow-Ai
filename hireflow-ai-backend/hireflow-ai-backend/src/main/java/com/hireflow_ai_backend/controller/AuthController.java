package com.hireflow_ai_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hireflow_ai_backend.dto.AuthResponse;
import com.hireflow_ai_backend.dto.LoginRequest;
import com.hireflow_ai_backend.entity.Role;
import com.hireflow_ai_backend.entity.User;
import com.hireflow_ai_backend.security.JwtUtil;
import com.hireflow_ai_backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@org.springframework.web.bind.annotation.CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        // 🔒 Block ADMIN self-registration
        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin cannot register");
        }

        return userService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        System.out.println("DEBUG: Login attempt for email: [" + email + "]");

        User user = userService.findByEmail(email);

        if (user == null) {
            System.out.println("DEBUG: User not found in database: [" + email + "]");
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User not found: " + email);
        }

        System.out.println("DEBUG: User found. Role: " + user.getRole());
        System.out.println("DEBUG: Stored password starts with: "
                + (user.getPassword().length() > 10 ? user.getPassword().substring(0, 10) : user.getPassword()));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        System.out.println("DEBUG: Password match result: " + passwordMatches);

        if (!passwordMatches) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid password");
        }

        String token = jwtUtil.generateToken(user);
        System.out.println("DEBUG: Token generated successfully");

        return new AuthResponse(token, user.getRole().name(), user.getName(), user.getId());
    }

    @org.springframework.web.bind.annotation.GetMapping("/user")
    public User getProfile() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        return userService.findByEmail(email);
    }

    @org.springframework.web.bind.annotation.PutMapping("/profile")
    public User updateProfile(@RequestBody User profileData) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        User user = userService.findByEmail(email);

        user.setName(profileData.getName());
        user.setSkills(profileData.getSkills());
        user.setBio(profileData.getBio());
        // For bio, we might need to add it to the User entity if it's missing
        // For now, let's assume skills and name are the priority

        return userService.save(user); // Use save to avoid re-encoding password
    }

    @org.springframework.web.bind.annotation.GetMapping("/debug/users")
    public java.util.List<String> getDebugUsers() {
        return userService.findAll().stream()
                .map(u -> u.getEmail() + " (" + u.getRole() + ")")
                .collect(java.util.stream.Collectors.toList());
    }
}
