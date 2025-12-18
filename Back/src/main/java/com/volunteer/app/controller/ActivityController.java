package com.volunteer.app.controller;

import com.volunteer.app.entity.Activity;
import com.volunteer.app.service.ActivityService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Activity create(@Valid @RequestBody Activity activity,
                        @RequestParam("eventId") @NotNull Long eventId) {
        return activityService.create(activity, eventId);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Activity update(@PathVariable Long id, @RequestBody Activity activity) {
        return activityService.update(id, activity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}