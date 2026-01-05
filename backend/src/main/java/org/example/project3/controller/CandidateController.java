package org.example.project3.controller;

import lombok.RequiredArgsConstructor;
import org.example.project3.request.job.ApplyJobRequest;
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
                    .body(new ApiResponse(false, "Thao tác thất bại: " + e.getMessage(), null));
        }
    }

    // --- THÔNG TIN CÁ NHÂN ---
    @PostMapping("/update-personal-info")
    public ResponseEntity<ApiResponse> updatePersonalInfo(@ModelAttribute PersonalInfoRequest request) {
        return handleApiCall(() -> candidateService.updatePersonalInfo(request));
    }

    @GetMapping("/get-personal-info") // Thêm dấu / ở trước cho đồng bộ
    public ResponseEntity<ApiResponse> getPersonalInfo() {
        return handleApiCall(candidateService::getPersonalInfo);
    }

    // --- CÔNG VIỆC MONG MUỐN ---
    @GetMapping("/get-desired-job")
    public ResponseEntity<ApiResponse> getDesiredJob() {
        return handleApiCall(() -> candidateService.getDesiredJob());
    }

    @PostMapping("/update-desired-job")
    public ResponseEntity<ApiResponse> updateDesiredJob(@RequestBody DesiredJobRequest request) {
        return handleApiCall(() -> candidateService.updateDesiredJob(request));
    }

    // --- MỤC TIÊU NGHỀ NGHIỆP ---
    @GetMapping("/get-career-goal")
    public ResponseEntity<ApiResponse> getCareerGoal() {
        return handleApiCall(candidateService::getCareerGoal);
    }

    @PostMapping("/update-career-goal")
    public ResponseEntity<ApiResponse> updateCareerGoal(@RequestBody CareerGoalRequest careerGoal) {
        return handleApiCall(() -> candidateService.updateCareerGoal(careerGoal));
    }

    // --- KỸ NĂNG CÁ NHÂN ---
    @GetMapping("/get-personal-skill")
    public ResponseEntity<ApiResponse> getPersonalSkill() {
        return handleApiCall(candidateService::getPersonalSkill);
    }

    @PostMapping("/update-personal-skill")
    public ResponseEntity<ApiResponse> updatePersonalSkill(@RequestBody PersonalSkillRequest request) {
        return handleApiCall(() -> candidateService.updatePersonalSkill(request));
    }

    // --- BẰNG CẤP (DEGREES) ---
    @GetMapping("/get-degrees")
    public ResponseEntity<ApiResponse> getDegrees() {
        return handleApiCall(candidateService::getDegrees);
    }

    @PostMapping("/add-degree")
    public ResponseEntity<ApiResponse> addDegree(@RequestBody DegreeRequest request) {
        return handleApiCall(() -> candidateService.addDegree(request));
    }

    @PostMapping("/update-degree")
    public ResponseEntity<ApiResponse> updateDegree(@RequestBody DegreeRequest request) {
        return handleApiCall(() -> candidateService.updateDegree(request));
    }

    @DeleteMapping("/delete-degree/{id}")
    public ResponseEntity<ApiResponse> deleteDegree(@PathVariable Long id) {
        return handleApiCall(() -> candidateService.deleteDegree(id));
    }

    // --- CHỨNG CHỈ NGOẠI NGỮ (LANGUAGE CERTIFICATES) ---
    @GetMapping("/get-language-certificates") // BỔ SUNG: Lấy danh sách chứng chỉ
    public ResponseEntity<ApiResponse> getLanguageCertificates() {
        return handleApiCall(candidateService::getLanguageCertificates);
    }

    @PostMapping("/add-language-certificate")
    public ResponseEntity<ApiResponse> addLanguageCertificate(@RequestBody LanguageCertificateRequest request) {
        return handleApiCall(() -> candidateService.addLanguageCertificate(request));
    }

    @PostMapping("/update-language-certificate")
    public ResponseEntity<ApiResponse> updateLanguageCertificate(@RequestBody LanguageCertificateRequest request) {
        return handleApiCall(() -> candidateService.updateLanguageCertificate(request));
    }

    @DeleteMapping("/delete-language-certificate/{id}") // BỔ SUNG: Xóa chứng chỉ
    public ResponseEntity<ApiResponse> deleteLanguageCertificate(@PathVariable Long id) {
        return handleApiCall(() -> candidateService.deleteLanguageCertificate(id));
    }

    // --- KINH NGHIỆM LÀM VIỆC (WORK EXPERIENCE) ---
    @GetMapping("/get-work-experiences")
    public ResponseEntity<ApiResponse> getWorkExperiences() {
        return handleApiCall(candidateService::getWorkExperiences);
    }

    @PostMapping("/add-work-experience")
    public ResponseEntity<ApiResponse> addWorkExperience(@RequestBody ExperienceRequest request) {
        return handleApiCall(() -> candidateService.addWorkExperience(request));
    }

    @PostMapping("/update-work-experience")
    public ResponseEntity<ApiResponse> updateWorkExperience(@RequestBody ExperienceRequest request) {
        return handleApiCall(() -> candidateService.updateWorkExperience(request));
    }

    @DeleteMapping("/delete-work-experience/{id}")
    public ResponseEntity<ApiResponse> deleteWorkExperience(@PathVariable Long id) {
        return handleApiCall(() -> candidateService.deleteWorkExperience(id));
    }

    // --- ỨNG TUYỂN VÀ QUẢN LÝ VIỆC LÀM ---
    @PostMapping("/apply-job")
    public ResponseEntity<ApiResponse> applyJob(@RequestBody ApplyJobRequest request) {
        return candidateService.applyJob(request);
    }

    @GetMapping("/applied-job")
    public ResponseEntity<ApiResponse> getAppliedJob(@RequestParam(name = "page", defaultValue = "1") int page,
                                                     @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return candidateService.getAppliedJob(page, pageSize);
    }
}