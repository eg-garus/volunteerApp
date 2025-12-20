package com.volunteer.app.controller;

import com.volunteer.app.entity.Event;
import com.volunteer.app.entity.Activity;
import com.volunteer.app.service.EventService;
import com.volunteer.app.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final ActivityService activityService;

    public EventController(EventService eventService, ActivityService activityService) {
        this.eventService = eventService;
        this.activityService = activityService;
    }

    @GetMapping
    public List<Event> getAll() {
        return eventService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id) {
        Event event = eventService.findById(id);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/{id}/activities")
    public List<Activity> getActivities(@PathVariable Long id) {
        return activityService.findByEventId(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Event create(@RequestBody Event event) {
        return eventService.create(event);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Event update(@PathVariable Long id, @RequestBody Event event) {
        return eventService.update(id, event);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }
}