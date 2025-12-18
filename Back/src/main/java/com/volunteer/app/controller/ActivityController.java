package com.volunteer.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.volunteer.app.dto.CreateActivityRequest;
import com.volunteer.app.entity.Activity;
import com.volunteer.app.service.ActivityService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")  // или permitAll, если волонтёры тоже могут видеть
    public ResponseEntity<Activity> getById(@PathVariable Long id) {
        Activity activity = activityService.findById(id);
        return ResponseEntity.ok(activity);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Activity create(@Valid @RequestBody Activity activity, @RequestParam("eventId") Long eventId) {
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