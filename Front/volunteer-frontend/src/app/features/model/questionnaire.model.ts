export interface Questionnaire {
  education?: string | null;
  workplaceOrStudy?: string | null;
  foreignLanguages?: string | null;

  hasVolunteerExperience?: boolean | null;
  volunteerOrganization?: string | null;
  volunteerPeriod?: string | null;
  volunteerResponsibilities?: string | null;

  motivationWhy?: string | null;
  motivationAttracts?: string[] | null;

  volunteerDirections?: string[] | null;

  professionalSkills?: string | null;
  hobbies?: string | null;
  computerSkills?: string | null;
  hasCar?: boolean | null;
  drivingLicenseCategory?: string | null;

  hoursPerMonth?: number | null;
  convenientDays?: string | null;
  convenientTime?: string[] | null;

  responsibility?: number | null;
  communication?: number | null;
  stressResistance?: number | null;
  conflictLevel?: number | null;

  freeTime?: string | null;
  lifeMotto?: string | null;
  additionalComments?: string | null;
}