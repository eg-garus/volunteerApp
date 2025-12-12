package com.volunteer.app.controller;

import com.volunteer.app.dto.auth.AuthResponse;
import com.volunteer.app.dto.auth.LoginRequest;
import com.volunteer.app.dto.auth.RegisterRequest;
import com.volunteer.app.entity.User;
import com.volunteer.app.service.UserService;
import com.volunteer.app.security.JwtService; // твой класс для JWT
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = new User();
        user.setLogin(request.getLogin());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setMiddleName(request.getMiddleName());
        user.setPhone(request.getPhone());

        User registered = userService.register(user);
        String token = jwtService.generateToken(registered.getLogin());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setRole(registered.getRole().name());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user.getLogin());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setRole(user.getRole().name());

        return ResponseEntity.ok(response);
    }
}