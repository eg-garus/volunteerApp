package com.volunteer.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.volunteer.app.dto.ApplicationDto;
import com.volunteer.app.entity.Activity;
import com.volunteer.app.entity.Application;
import com.volunteer.app.entity.Status;
import com.volunteer.app.entity.User;
import com.volunteer.app.exception.ResourceNotFoundException;
import com.volunteer.app.repository.ApplicationRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserService userService;
    private final ActivityService activityService;

    public ApplicationService(ApplicationRepository applicationRepository,
                              UserService userService,
                              ActivityService activityService) {
        this.applicationRepository = applicationRepository;
        this.userService = userService;
        this.activityService = activityService;
    }

    @Transactional(readOnly = true)
    public List<ApplicationDto> findAllForAdmin() {
        List<Application> apps = applicationRepository.findAll();
        return apps.stream().map(app -> {
            ApplicationDto dto = new ApplicationDto();
            dto.setId(app.getId());
            dto.setUserLogin(app.getUser().getLogin());
            dto.setActivityName(app.getActivity() != null ? app.getActivity().getName() : "Не указано");
            // Если у Activity есть связь с Event — заполняем eventName
            dto.setEventName(app.getActivity() != null && app.getActivity().getEvent() != null
                ? app.getActivity().getEvent().getName()
                : "Не указано");
            dto.setComment(app.getComment());
            dto.setStatus(app.getStatus());
            dto.setSubmissionDate(app.getSubmissionDate());
            dto.setUserId(app.getUser().getId());
            return dto;
        }).toList();
    }

    @Transactional
    public void delete(Long id, String userLogin) {
        Application app = findById(id);
        applicationRepository.delete(app);
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
    public List<ApplicationDto> findByUser(Long userId) {
        List<Application> apps = applicationRepository.findByUserId(userId);
        return apps.stream().map(app -> {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(app.getId());
        dto.setActivityName(app.getActivity().getName());  // ← название мероприятия
        dto.setComment(app.getComment());
        dto.setStatus(app.getStatus());
        dto.setSubmissionDate(app.getSubmissionDate());
        return dto;
    }).toList();
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

    @Transactional
    public Application submit(Long activityId, String login, String comment) {
        User user = userService.findByLogin(login);
        Activity activity = activityService.findById(activityId);

        if (applicationRepository.existsByUserAndActivity(user, activity)) {
            throw new IllegalArgumentException("Заявка уже подана");
        }

        Application app = new Application();
        app.setUser(user);
        app.setActivity(activity);
        app.setComment(comment);
        app.setStatus(Status.PENDING);  // ← используем enum, а не строку
        app.setSubmissionDate(LocalDateTime.now());

        return applicationRepository.save(app);
    }
}