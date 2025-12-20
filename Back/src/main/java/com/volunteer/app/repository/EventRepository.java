package com.volunteer.app.repository;

import com.volunteer.app.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAllByOrderByStartDateAsc();

    List<Event> findByCityContainingIgnoreCase(String city);

    List<Event> findByKindContainingIgnoreCase(String kind);

    List<Event> findByTypeContainingIgnoreCase(String type);

    List<Event> findByStartDateAfter(LocalDateTime date);

    List<Event> findByStartDateBetween(LocalDateTime start, LocalDateTime end);

    // Поиск по названию или описанию
    List<Event> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}