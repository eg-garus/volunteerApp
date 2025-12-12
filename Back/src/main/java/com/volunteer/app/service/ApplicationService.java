package com.volunteer.app.service;

import com.volunteer.app.entity.Application;
import com.volunteer.app.entity.Status;
import com.volunteer.app.exception.ResourceNotFoundException;
import com.volunteer.app.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Transactional
    public Application submit(Application application) {
        application.setStatus(Status.PENDING);
        application.setSubmissionDate(LocalDateTime.now());
        return applicationRepository.save(application);
    }

    @Transactional
    public Application approve(Long id) {
        Application app = findById(id);
        app.setStatus(Status.APPROVED);
        return applicationRepository.save(app);
    }

    @Transactional
    public Application reject(Long id) {
        Application app = findById(id);
        app.setStatus(Status.REJECTED);
        return applicationRepository.save(app);
    }

    @Transactional(readOnly = true)
    public Application findById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Заявка не найдена: " + id));
    }

    @Transactional(readOnly = true)
    public List<Application> findByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<Application> findByActivity(Long activityId) {
        return applicationRepository.findByActivityId(activityId);
    }

    // Отчёт: количество одобренных по мероприятию
    @Transactional(readOnly = true)
    public long countApprovedByActivity(Long activityId) {
        return applicationRepository.countByActivityIdAndStatus(activityId, Status.APPROVED);
    }
}