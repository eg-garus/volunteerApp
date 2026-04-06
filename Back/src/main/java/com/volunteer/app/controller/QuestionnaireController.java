package com.volunteer.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.volunteer.app.entity.Questionnaire;
import com.volunteer.app.security.UserDetailsImpl;
import com.volunteer.app.service.QuestionnaireService;

@RestController
@RequestMapping("/api/questionnaires")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    // Получить свою анкету
    @GetMapping("/me")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<Questionnaire> getMyQuestionnaire(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Questionnaire questionnaire = questionnaireService.getByUser(userDetails.getUser());
        return ResponseEntity.ok(questionnaire);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Questionnaire> getByUserId(@PathVariable Long userId) {
        Questionnaire questionnaire = questionnaireService.getByUserId(userId);
        if (questionnaire == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(questionnaire);
    }

    // Сохранить/обновить свою анкету
    @PostMapping("/me")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<Questionnaire> saveMyQuestionnaire(
            @RequestBody Questionnaire questionnaire,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Questionnaire saved = questionnaireService.saveForUser(userDetails.getUser(), questionnaire);
        return ResponseEntity.ok(saved);
    }
}