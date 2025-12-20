package com.volunteer.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "events")
@Data
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

    private String kind;  // вид: культурное, спортивное, благотворительное и т.д.

    private String type;  // тип: фестиваль, концерт, субботник и т.д.

    private String city;

    private String address;

    private String organizer;

    private String contactPhone;

    private String contactEmail;

    private String website;

    private String imageUrl;  // ссылка на фото/постер

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Activity> activities = new ArrayList<>();
}