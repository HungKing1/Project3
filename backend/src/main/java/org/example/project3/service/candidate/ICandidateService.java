package org.example.project3.service.candidate;

import org.example.project3.request.profileCandidate.*;
import org.example.project3.response.ApiResponse;

public interface ICandidateService {
    ApiResponse updatePersonalInfo(PersonalInfoRequest request);
    ApiResponse updateDesiredJob(DesiredJobRequest request);
    ApiResponse updateCareerGoal();
    ApiResponse updatePersonalSkill();

    //bằng cấp
    ApiResponse updateDegree(DegreeRequest request);
    ApiResponse addDegree(DegreeRequest request);

    //Ngoại ngữ
    ApiResponse updateLanguageCertificate(LanguageCertificateRequest request);
    ApiResponse addLanguageCertificate(LanguageCertificateRequest request);

    //Kinh nghiệm
    ApiResponse updateWorkExperience(ExperienceRequest request);
}
