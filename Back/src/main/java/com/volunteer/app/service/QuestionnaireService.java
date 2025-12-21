package com.volunteer.app.service;

import org.springframework.stereotype.Service;

import com.volunteer.app.entity.Questionnaire;
import com.volunteer.app.entity.User;
import com.volunteer.app.repository.QuestionnaireRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;

    public QuestionnaireService(QuestionnaireRepository questionnaireRepository) {
        this.questionnaireRepository = questionnaireRepository;
    }

    public Questionnaire getByUser(User user) {
        return questionnaireRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Анкета не найдена"));
    }

    public Questionnaire getByUserId(Long userId) {
        return questionnaireRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Анкета не найдена"));
    }

    public Questionnaire saveForUser(User user, Questionnaire questionnaire) {
        questionnaire.setUser(user);
        return questionnaireRepository.save(questionnaire);
    }
}