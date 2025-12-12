package com.volunteer.app.service;

import com.volunteer.app.entity.Event;
import com.volunteer.app.exception.ResourceNotFoundException;
import com.volunteer.app.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional
    public Event create(Event event) {
        return eventRepository.save(event);
    }

    @Transactional
    public Event update(Long id, Event updated) {
        Event event = findById(id);
        event.setName(updated.getName());
        event.setDescription(updated.getDescription());
        event.setStartDate(updated.getStartDate());
        event.setEndDate(updated.getEndDate());
        event.setActivities(updated.getActivities());
        return eventRepository.save(event);
    }

    @Transactional
    public void delete(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Событие не найдено: " + id);
        }
        eventRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Событие не найдено: " + id));
    }

    @Transactional(readOnly = true)
    public Page<Event> findAll(Pageable pageable) {
        return eventRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<Event> findUpcoming() {
        return eventRepository.findByStartDateAfter(java.time.LocalDateTime.now());
    }
}