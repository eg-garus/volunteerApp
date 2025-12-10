package com.volunteer.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activity_types", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class ActivityType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name; // например: "Экологический", "Культурный", "Спортивный"

    // опционально: описание
    private String description;
}