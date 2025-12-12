package com.volunteer.app.service;

import com.volunteer.app.entity.Activity;
import com.volunteer.app.exception.ResourceNotFoundException;
import com.volunteer.app.repository.ActivityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Transactional
    public Activity create(Activity activity) {
        return activityRepository.save(activity);
    }

    @Transactional
    public Activity update(Long id, Activity updated) {
        Activity activity = findById(id);
        activity.setName(updated.getName());
        activity.setDescription(updated.getDescription());
        activity.setDate(updated.getDate());
        activity.setRequiredVolunteers(updated.getRequiredVolunteers());
        activity.setCity(updated.getCity());
        activity.setType(updated.getType());
        activity.setKind(updated.getKind());
        activity.setLocationEntity(updated.getLocationEntity());
        return activityRepository.save(activity);
    }

    @Transactional
    public void delete(Long id) {
        if (!activityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Мероприятие не найдено: " + id);
        }
        activityRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Activity findById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Мероприятие не найдено: " + id));
    }

    @Transactional(readOnly = true)
    public Page<Activity> findAll(Pageable pageable) {
        return activityRepository.findAll(pageable);
    }

    // Пример сортировки и фильтрации (по дате, названию, городу)
    @Transactional(readOnly = true)
    public List<Activity> search(String name, String city, LocalDateTime afterDate, Sort sort) {
        Specification<Activity> spec = Specification.where(null);

        if (name != null && !name.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }
        if (city != null && !city.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("city"), city));
        }
        if (afterDate != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("date"), afterDate));
        }

        return activityRepository.findAll(spec, sort);
    }
}