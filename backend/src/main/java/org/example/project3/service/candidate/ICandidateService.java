package org.example.project3.service.candidate;

import com.cloudinary.Api;
import org.example.project3.request.job.ApplyJobRequest;
import org.example.project3.request.profileCandidate.*;
import org.example.project3.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface ICandidateService {
    ApiResponse getPersonalInfo();
    ApiResponse updatePersonalInfo(PersonalInfoRequest request);

    ApiResponse getDesiredJob();
    ApiResponse updateDesiredJob(DesiredJobRequest request);

    ApiResponse getCareerGoal();
    ApiResponse updateCareerGoal(CareerGoalRequest careerGoal);

    ApiResponse getPersonalSkill();
    ApiResponse updatePersonalSkill(PersonalSkillRequest request);

    //bằng cấp
    ApiResponse getDegrees();
    ApiResponse addDegree(DegreeRequest request);
    ApiResponse updateDegree(DegreeRequest request);
    ApiResponse deleteDegree(Long id);

    //Ngoại ngữ
    ApiResponse getLanguageCertificates();
    ApiResponse addLanguageCertificate(LanguageCertificateRequest request);
    ApiResponse updateLanguageCertificate(LanguageCertificateRequest request);
    ApiResponse deleteLanguageCertificate(Long id);

    //Kinh nghiệm
    ApiResponse getWorkExperiences();
    ApiResponse addWorkExperience(ExperienceRequest request);
    ApiResponse updateWorkExperience(ExperienceRequest request);
    ApiResponse deleteWorkExperience(Long id);

    //apply
    ResponseEntity<ApiResponse> applyJob(ApplyJobRequest request);

    ResponseEntity<ApiResponse> getAppliedJob(int page, int limit);
}
