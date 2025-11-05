package org.example.project3.controller;

import lombok.RequiredArgsConstructor;
import org.example.project3.request.profileCandidate.*;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.candidate.ICandidateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.function.Supplier;

@RestController
@RequiredArgsConstructor
@RequestMapping("/candidate")
public class CandidateController {

    private final ICandidateService candidateService;

    private ResponseEntity<ApiResponse> handleApiCall(Supplier<ApiResponse> action) {
        try {
            return ResponseEntity.ok(action.get());
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Thao tác thất bại: " + e.getMessage()));
        }
    }

    @PostMapping("/update-personal-info")
    public ResponseEntity<ApiResponse> updatePersonalInfo(@RequestBody PersonalInfoRequest request) {
        return handleApiCall(() -> candidateService.updatePersonalInfo(request));
    }

    @PostMapping("/update-desired-job")
    public ResponseEntity<ApiResponse> updateDesiredJob(@RequestBody DesiredJobRequest request) {
        return handleApiCall(() -> candidateService.updateDesiredJob(request));
    }

    @PostMapping("/update-career-goal")
    public ResponseEntity<ApiResponse> updateCareerGoal() {
        return handleApiCall(() -> candidateService.updateCareerGoal());
    }

    @PostMapping("/update-personal-skill")
    public ResponseEntity<ApiResponse> updatePersonalSkill() {
        return handleApiCall(() -> candidateService.updatePersonalSkill());
    }

    @PostMapping("/update-degree")
    public ResponseEntity<ApiResponse> updateDegree(@RequestBody DegreeRequest request) {
        return handleApiCall(() -> candidateService.updateDegree(request));
    }

    @PostMapping("/add-degree")
    public ResponseEntity<ApiResponse> addDegree(@RequestBody DegreeRequest request) {
        return handleApiCall(() -> candidateService.addDegree(request));
    }

    @PostMapping("/update-language-certificate")
    public ResponseEntity<ApiResponse> updateLanguageCertificate(@RequestBody LanguageCertificateRequest request) {
        return handleApiCall(() -> candidateService.updateLanguageCertificate(request));
    }

    @PostMapping("/add-language-certificate")
    public ResponseEntity<ApiResponse> addLanguageCertificate(@RequestBody LanguageCertificateRequest request) {
        return handleApiCall(() -> candidateService.addLanguageCertificate(request));
    }

    @PostMapping("/update-work-experience")
    public ResponseEntity<ApiResponse> updateWorkExperience(@RequestBody ExperienceRequest request) {
        return handleApiCall(() -> candidateService.updateWorkExperience(request));
    }
}
