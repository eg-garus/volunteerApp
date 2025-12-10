package com.volunteer.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;


@Entity
@Data
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

    private LocalDateTime submissionDate;

    @Enumerated(EnumType.STRING)  // Хранит как строку в БД (PENDING и т.д.)
    @Column(nullable = false)
    private Status status = Status.PENDING;  // PENDING, APPROVED, REJECTED

    private String comment;
}

