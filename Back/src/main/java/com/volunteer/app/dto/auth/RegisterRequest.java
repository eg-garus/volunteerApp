package com.volunteer.app.dto.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Size(min = 4, max = 8)
    private String login;

    @NotBlank @Size(min = 4, max = 12)
    private String password;

    @Email @NotBlank
    private String email;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String middleName;

    @Pattern(regexp = "\\d{11}")
    private String phone;
}