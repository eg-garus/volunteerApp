package com.volunteer.app.dto;

import com.volunteer.app.entity.Activity;
import jakarta.validation.Valid;
import lombok.Data;

@Data
public class CreateActivityRequest {
    @Valid
    private Activity activity;

    private Long eventId;

    // Lombok @Data генерирует геттеры/сеттеры, или добавь вручную
    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}