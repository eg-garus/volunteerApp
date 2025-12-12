package com.volunteer.app.repository;

import com.volunteer.app.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.time.LocalDateTime;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long>,
                                                JpaSpecificationExecutor<Activity> {
    List<Activity> findByCity(String city);
    List<Activity> findByDateAfter(LocalDateTime date);
    List<Activity> findByDateBetween(LocalDateTime start, LocalDateTime end);
    List<Activity> findByTypeId(Long typeId);
    List<Activity> findByKindId(Long kindId);
    List<Activity> findByNameContainingIgnoreCase(String name);
}