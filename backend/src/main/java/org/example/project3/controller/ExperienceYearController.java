package org.example.project3.controller;

import lombok.RequiredArgsConstructor;
import org.example.project3.entity.job.reference.ExperienceYear;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.IExperienceYearService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ExperienceYearController {
    private final IExperienceYearService experienceYearService;

    @GetMapping("/exp")
    public ResponseEntity<ApiResponse> findAll() {
        List<ExperienceYear> experienceYears = experienceYearService.findAll();

        return ResponseEntity.ok(new ApiResponse(true, experienceYears));
    }
}
