package com.volunteer.app.repository;

import com.volunteer.app.entity.ActivityKind;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ActivityKindRepository extends JpaRepository<ActivityKind, Long> {
    Optional<ActivityKind> findByName(String name);
    boolean existsByName(String name);
}