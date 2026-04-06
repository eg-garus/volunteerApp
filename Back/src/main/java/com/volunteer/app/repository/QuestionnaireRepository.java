package com.volunteer.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.volunteer.app.entity.Questionnaire;
import com.volunteer.app.entity.User;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {
    Optional<Questionnaire> findByUserId(Long userId);
    Optional<Questionnaire> findByUser(User user);
}