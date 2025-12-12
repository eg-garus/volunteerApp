package com.volunteer.app.controller;

import com.volunteer.app.entity.Application;
import com.volunteer.app.security.UserDetailsImpl;
import com.volunteer.app.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<Application> submit(@RequestBody Application application, Principal principal) {
        // principal.getName() — логин пользователя
        return ResponseEntity.ok(applicationService.submit(application));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<List<Application>> getMyApplications(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getUser().getId();
        return ResponseEntity.ok(applicationService.findByUser(userId));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Application> approve(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.approve(id));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Application> reject(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.reject(id));
    }
}