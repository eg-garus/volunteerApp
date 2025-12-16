package com.volunteer.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Data
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "activity_id")
    private Activity activity;

    private LocalDateTime submissionDate;

    @Enumerated(EnumType.STRING)  // Хранит как строку в БД (PENDING и т.д.)
    @Column(nullable = false)
    private Status status = Status.PENDING;  // PENDING, APPROVED, REJECTED

    private String comment;
}

