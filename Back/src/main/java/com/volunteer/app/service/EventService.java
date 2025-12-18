package com.volunteer.app.service;

import com.volunteer.app.entity.Event;
import com.volunteer.app.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional(readOnly = true)
    public List<Event> findAll() {
        return eventRepository.findAllByOrderByStartDateAsc();
    }

    @Transactional(readOnly = true)
    public List<Event> findByCity(String city) {
        return eventRepository.findByCityContainingIgnoreCase(city);
    }

    @Transactional(readOnly = true)
    public List<Event> findByKind(String kind) {
        return eventRepository.findByKindContainingIgnoreCase(kind);
    }

    @Transactional(readOnly = true)
    public List<Event> findByType(String type) {
        return eventRepository.findByTypeContainingIgnoreCase(type);
    }

    @Transactional(readOnly = true)
    public List<Event> findUpcoming(LocalDateTime now) {
        return eventRepository.findByStartDateAfter(now);
    }

    @Transactional(readOnly = true)
    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Событие не найдено: " + id));
    }

    @Transactional
    public Event create(Event event) {
        return eventRepository.save(event);
    }

    @Transactional
    public Event update(Long id, Event updatedEvent) {
        Event event = findById(id);
        event.setName(updatedEvent.getName());
        event.setDescription(updatedEvent.getDescription());
        event.setStartDate(updatedEvent.getStartDate());
        event.setEndDate(updatedEvent.getEndDate());
        event.setKind(updatedEvent.getKind());
        event.setType(updatedEvent.getType());
        event.setCity(updatedEvent.getCity());
        event.setAddress(updatedEvent.getAddress());
        event.setOrganizer(updatedEvent.getOrganizer());
        event.setContactPhone(updatedEvent.getContactPhone());
        event.setContactEmail(updatedEvent.getContactEmail());
        event.setWebsite(updatedEvent.getWebsite());
        event.setImageUrl(updatedEvent.getImageUrl());
        return eventRepository.save(event);
    }

    @Transactional
    public void delete(Long id) {
        eventRepository.deleteById(id);
    }
}