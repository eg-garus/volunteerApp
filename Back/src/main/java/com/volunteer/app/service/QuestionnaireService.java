package com.volunteer.app.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.volunteer.app.entity.Questionnaire;
import com.volunteer.app.entity.User;
import com.volunteer.app.repository.QuestionnaireRepository;

@Service
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;

    public QuestionnaireService(QuestionnaireRepository questionnaireRepository) {
        this.questionnaireRepository = questionnaireRepository;
    }

    @Transactional(readOnly = true)
    public Questionnaire getByUser(User user) {
        return questionnaireRepository.findByUser(user)
                .orElse(null);
    }

    public Questionnaire getByUserId(Long userId) {
        return questionnaireRepository.findByUserId(userId)
                .orElse(null);
    }

    @Transactional
    public Questionnaire saveForUser(User user, Questionnaire questionnaire) {
        Optional<Questionnaire> existingOpt = questionnaireRepository.findByUser(user);

        if (existingOpt.isPresent()) {
            Questionnaire existing = existingOpt.get();

            BeanUtils.copyProperties(questionnaire, existing, "id", "user");

            return questionnaireRepository.save(existing);
        } else {
            questionnaire.setUser(user);
            return questionnaireRepository.save(questionnaire);
        }
    }
}