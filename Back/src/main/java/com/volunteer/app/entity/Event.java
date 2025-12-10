package com.volunteer.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Название события обязательно")
    @Size(min = 5, max = 30, message = "Название должно быть от 5 до 30 символов")
    @Column(nullable = false)
    private String name;

    // Тип события (можно связать с отдельной сущностью ActivityType, если нужно)
    private String type;

    // Вид события (аналогично)
    private String kind;

    // Дата и время начала события
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    // Дата и время окончания события (опционально)
    @Column(name = "end_date")
    private LocalDateTime endDate;

    // Описание события
    private String description;

    // Связь многие-ко-многим с мероприятиями (Activity)
    @ManyToMany
    @JoinTable(
        name = "event_activity",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    private List<Activity> activities;
}