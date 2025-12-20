package com.volunteer.app.repository;

import com.volunteer.app.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByEventId(Long eventId);

    List<Activity> findByEventIdOrderByDateAsc(Long eventId);

    List<Activity> findByLevel(String level);

    List<Activity> findByCityContainingIgnoreCase(String city);
}