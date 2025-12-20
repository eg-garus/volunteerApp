package com.volunteer.app.service;

import com.volunteer.app.entity.Activity;
import com.volunteer.app.entity.Event;
import com.volunteer.app.repository.ActivityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final EventService eventService;

    public ActivityService(ActivityRepository activityRepository, EventService eventService) {
        this.activityRepository = activityRepository;
        this.eventService = eventService;
    }

    @Transactional(readOnly = true)
    public List<Activity> findByEventId(Long eventId) {
        return activityRepository.findByEventIdOrderByDateAsc(eventId);
    }

    @Transactional(readOnly = true)
    public List<Activity> findByLevel(String level) {
        return activityRepository.findByLevel(level);
    }

    @Transactional(readOnly = true)
    public List<Activity> findByCity(String city) {
        return activityRepository.findByCityContainingIgnoreCase(city);
    }

    @Transactional(readOnly = true)
    public Activity findById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Задача не найдена: " + id));
    }

    @Transactional
    public Activity create(Activity activity, Long eventId) {
        Event event = eventService.findById(eventId);
        activity.setEvent(event);
        return activityRepository.save(activity);
    }

    @Transactional
    public Activity update(Long id, Activity updatedActivity) {
        Activity activity = findById(id);
        activity.setName(updatedActivity.getName());
        activity.setDescription(updatedActivity.getDescription());
        activity.setDate(updatedActivity.getDate());
        activity.setRequiredVolunteers(updatedActivity.getRequiredVolunteers());
        activity.setLevel(updatedActivity.getLevel());
        activity.setCity(updatedActivity.getCity());
        return activityRepository.save(activity);
    }

    @Transactional
    public void delete(Long id) {
        activityRepository.deleteById(id);
    }
}