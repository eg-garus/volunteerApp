package com.volunteer.app.repository;

import com.volunteer.app.entity.Application;
import com.volunteer.app.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserId(Long userId);
    List<Application> findByActivityId(Long activityId);
    List<Application> findByStatus(Status status);
    List<Application> findByUserIdAndStatus(Long userId, Status status);
    long countByActivityIdAndStatus(Long activityId, Status status);
}