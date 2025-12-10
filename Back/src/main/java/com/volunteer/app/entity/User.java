package com.volunteer.app.entity;   // ← всё строчными буквами

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(min = 4, max = 8)
    private String login;

    @NotBlank @Size(min = 4, max = 12)
    private String password;

    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 4, max = 30)
    private String lastName;

    @NotBlank @Size(min = 4, max = 30)
    private String firstName;

    @Size(max = 30)
    private String middleName;

    @Pattern(regexp = "\\d{11}")
    private String phone;

    @Min(1900) @Max(2025)
    private Integer birthYear;

    private String languages;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.VOLUNTEER;  // VOLUNTEER или ADMIN
}