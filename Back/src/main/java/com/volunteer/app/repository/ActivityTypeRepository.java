package com.volunteer.app.repository;

import com.volunteer.app.entity.ActivityType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ActivityTypeRepository extends JpaRepository<ActivityType, Long> {
    Optional<ActivityType> findByName(String name);
    boolean existsByName(String name);
}