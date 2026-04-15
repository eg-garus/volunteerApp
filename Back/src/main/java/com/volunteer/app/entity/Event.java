package com.volunteer.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 1000)
    private String description;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String kind;        // вид: культурное, спортивное и т.д.
    private String type;        // тип: фестиваль, концерт, субботник и т.д.

    private String city;
    private String address;
    private String organizer;
    private String contactPhone;
    private String contactEmail;
    private String website;
    private String imageUrl;

    // Одно большое событие содержит много мероприятий
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Activity> activities = new ArrayList<>();
}