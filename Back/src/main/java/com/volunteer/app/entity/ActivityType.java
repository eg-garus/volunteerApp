// ActivityType.java
package com.volunteer.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "activity_types", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class ActivityType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 300)
    private String description;
}