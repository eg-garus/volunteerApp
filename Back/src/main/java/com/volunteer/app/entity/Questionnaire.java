package com.volunteer.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "questionnaires")
@Getter
@Setter
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    // 3. Образование и занятость
    private String education;                    // Образование
    private String workplaceOrStudy;             // Место учёбы/работы
    private String foreignLanguages;             // Владение иностранными языками (с уровнем)

    // 4. Опыт волонтёрской деятельности
    private boolean hasVolunteerExperience;      // Есть ли опыт?
    private String volunteerOrganization;        // Название организации/проекта
    private String volunteerPeriod;              // Период участия
    private String volunteerResponsibilities;    // Обязанности и достижения

    // 5. Мотивация и интересы
    private String motivationWhy;                // Почему решили стать волонтёром?
    private String motivationAttracts;           // Что привлекает (можно через запятую)

    // 6. Направления деятельности (через запятую)
    private String volunteerDirections;          // Выбранные сферы (через запятую)

    // 7. Навыки и умения
    private String professionalSkills;           // Профессиональные навыки
    private String hobbies;                      // Хобби и увлечения
    private String computerSkills;               // Владение программами
    private boolean hasCar;                      // Наличие автомобиля
    private String drivingLicenseCategory;       // Категория прав (если есть машина)

    // 8. Готовность к участию
    private Integer hoursPerMonth;               // Сколько часов в месяц
    private String convenientDays;               // Удобные дни недели
    private String convenientTime;               // Утро/День/Вечер (через запятую)

    // 9. Личностные качества
    private Integer responsibility;              // 1-10
    private Integer communication;               // 1-10
    private Integer stressResistance;            // 1-10
    private Integer conflictLevel;               // 1-10 (чем ниже, тем лучше)

    // 10. Дополнительные сведения
    private String freeTime;                     // Как проводите свободное время
    private String lifeMotto;                    // Жизненный девиз
    private String additionalComments;           // Другие комментарии
}