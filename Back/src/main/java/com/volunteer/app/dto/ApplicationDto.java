package com.volunteer.app.dto;

import java.time.LocalDateTime;

import com.volunteer.app.entity.Status;

public class ApplicationDto {
    private Long id;
    private String userLogin;      // ← логин волонтёра
    private String activityName;   // ← название мероприятия
    private String eventName;      // ← опционально, если хочешь показывать событие
    private String comment;
    private Status status;
    private LocalDateTime submissionDate;
        private Long userId;

    // getter и setter
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    // Конструктор по умолчанию
    public ApplicationDto() {}

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserLogin() { return userLogin; }
    public void setUserLogin(String userLogin) { this.userLogin = userLogin; }

    public String getActivityName() { return activityName; }
    public void setActivityName(String activityName) { this.activityName = activityName; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDateTime submissionDate) { this.submissionDate = submissionDate; }
}