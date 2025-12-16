package com.volunteer.app.controller;

import com.volunteer.app.entity.User;
import com.volunteer.app.security.UserDetailsImpl;
import com.volunteer.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@PreAuthorize("isAuthenticated()")  // только залогиненным
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Получить свой профиль
    @GetMapping
    public ResponseEntity<User> getProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getUser().getId();
        User user = userService.findById(userId);
        return ResponseEntity.ok(user);
    }

    // Обновить профиль
    @PutMapping
    public ResponseEntity<User> updateProfile(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody User updatedUser) {
        Long userId = userDetails.getUser().getId();
        User updated = userService.updateProfile(userId, updatedUser);
        return ResponseEntity.ok(updated);
    }
}