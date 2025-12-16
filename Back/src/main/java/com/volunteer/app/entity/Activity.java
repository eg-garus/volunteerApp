package com.volunteer.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotBlank;

@Entity
@Data
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(min = 5, max = 30)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private ActivityType type;        // Тип

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kind_id")
    private ActivityKind kind;

    private String location;

    @Min(value = 1, message = "Требуется хотя бы 1 волонтёр")
    @Column(name = "required_volunteers", nullable = false)
    private Integer requiredVolunteers;

    @Min(1) @Max(100)
    private Integer volunteerCount;

    private LocalDateTime date;

    private String description;

    @NotBlank @Size(min = 5, max = 30)
    private String city;

    private String level;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location locationEntity;

    @ManyToMany(mappedBy = "activities")
    private List<Event> events;

    @OneToMany(mappedBy = "activity")
    @JsonIgnore
    private List<Application> applications;
}