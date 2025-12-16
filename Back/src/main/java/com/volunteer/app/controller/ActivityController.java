package com.volunteer.app.controller;

import com.volunteer.app.entity.Activity;
import com.volunteer.app.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    // Новый метод — возвращает простой список (для фронтенда)
    @GetMapping
    public ResponseEntity<List<Activity>> getAll() {
        return ResponseEntity.ok(activityService.findAllList());
    }

    // Если хочешь оставить пагинацию — сделай отдельный эндпоинт
    // @GetMapping("/paged")
    // public ResponseEntity<Page<Activity>> getAllPaged(Pageable pageable) {
    //     return ResponseEntity.ok(activityService.findAll(pageable));
    // }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(activityService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Activity> create(@Valid @RequestBody Activity activity) {
        return ResponseEntity.ok(activityService.create(activity));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Activity> update(@PathVariable Long id, @Valid @RequestBody Activity activity) {
        return ResponseEntity.ok(activityService.update(id, activity));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Activity>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String afterDate) {
        // afterDate можно парсить в LocalDateTime, если нужно
        return ResponseEntity.ok(activityService.search(name, city, null, null));
    }
}