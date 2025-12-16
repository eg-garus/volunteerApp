package com.volunteer.app.dto;

import com.volunteer.app.entity.Status; // Импорт enum Status, если он используется
import java.time.LocalDateTime;

public class ApplicationDto {
    private Long id;
    private String activityName; // Название мероприятия (вместо полного Activity)
    private String comment;
    private Status status; // Или String, если status - строка
    private LocalDateTime submissionDate;
    private String userLogin;

    // Конструктор по умолчанию
    public ApplicationDto() {}

    // Конструктор с параметрами (опционально)
    public ApplicationDto(Long id, String activityName, String comment, Status status, LocalDateTime submissionDate) {
        this.id = id;
        this.activityName = activityName;
        this.comment = comment;
        this.status = status;
        this.submissionDate = submissionDate;
    }

    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    // геттер и сеттер
    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }
}