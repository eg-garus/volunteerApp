package com.volunteer.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.volunteer.app.dto.ApplicationDto;
import com.volunteer.app.dto.SubmitApplicationRequest;
import com.volunteer.app.entity.Application;
import com.volunteer.app.security.UserDetailsImpl;
import com.volunteer.app.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Подача заявки волонтёром
    @PostMapping
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<Application> submit(
            @Valid @RequestBody SubmitApplicationRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Application application = applicationService.submit(
                request.getActivityId(),
                userDetails.getUser().getLogin(),
                request.getComment()
        );

        return ResponseEntity.ok(application);
    }

    // Мои заявки
    @GetMapping("/my")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<List<ApplicationDto>> getMyApplications(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getUser().getId();
        return ResponseEntity.ok(applicationService.findByUser(userId));
    }

    // Все заявки — только для админа
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationDto>> getAllForAdmin() {
        return ResponseEntity.ok(applicationService.findAllForAdmin());
    }

    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN') or principal.username == #userLogin")  // админ или владелец заявки
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
    String userLogin = userDetails.getUser().getLogin();
    applicationService.delete(id, userLogin);  // сервис проверит права
    return ResponseEntity.noContent().build();
}

    // Одобрение
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Application> approve(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.approve(id));
    }

    // Отклонение
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Application> reject(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.reject(id));
    }
}