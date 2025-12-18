package com.volunteer.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubmitApplicationRequest {
    @NotNull(message = "ID задачи обязателен")
    private Long activityId;

    private String comment;

    // Lombok @Data генерирует геттеры/сеттеры
}