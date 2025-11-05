package org.example.project3.controller;

import lombok.RequiredArgsConstructor;
import org.example.project3.exception.ResourceNotFoundException;
import org.example.project3.request.auth.LoginRequesst;
import org.example.project3.request.auth.RegisterCandidateRequest;
import org.example.project3.request.auth.RegisterEmployerRequest;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.auth.IAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final IAuthService authService;

    @PostMapping("candidate/register")
    public ResponseEntity<ApiResponse> registerCandidate(@RequestBody RegisterCandidateRequest request) {
        try {
            ApiResponse apiResponse = authService.registerCandidate(request);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("candidate/login")
    public ResponseEntity<ApiResponse> loginCandidate(@RequestBody LoginRequesst request) {
        try {
            ApiResponse apiResponse = authService.loginCandidate(request);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new org.example.project3.response.ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("employer/register")
    public ResponseEntity<ApiResponse> registerEmployer(@RequestBody RegisterEmployerRequest request) {
        try {
            ApiResponse apiResponse = authService.registerEmployer(request);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("employer/login")
    public ResponseEntity<ApiResponse> loginEmployer(@RequestBody LoginRequesst request) {
        try {
            ApiResponse apiResponse = authService.loginEmployer(request);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new org.example.project3.response.ApiResponse(false, e.getMessage()));
        }
    }
}
