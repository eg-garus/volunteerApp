package com.volunteer.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activity_kinds", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class ActivityKind {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name; // например: "Субботник", "Фестиваль", "Благотворительный забег"

    private String description;
}