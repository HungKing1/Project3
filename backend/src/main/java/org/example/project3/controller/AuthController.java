package org.example.project3.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.project3.exception.ResourceNotFoundException;
import org.example.project3.request.auth.*;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.auth.IAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final IAuthService authService;

    @PostMapping("candidate/register")
    public ResponseEntity<ApiResponse> registerCandidate(@RequestBody RegisterCandidateRequest request, HttpServletResponse response) {
        try {
            ApiResponse apiResponse = authService.registerCandidate(request, response);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("candidate/login")
    public ResponseEntity<ApiResponse> loginCandidate(@RequestBody LoginRequesst request, HttpServletResponse response) {
        try {
            ApiResponse apiResponse = authService.loginCandidate(request, response);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new org.example.project3.response.ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("/candidate/logout")
    public ResponseEntity<ApiResponse> logoutCandidate(HttpServletResponse response) {
        try {
            ApiResponse apiResponse = authService.logoutCandidate(response);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new org.example.project3.response.ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("employer/register")
    public ResponseEntity<ApiResponse> registerEmployer(@RequestBody RegisterEmployerRequest request, HttpServletResponse response) {
        try {
            ApiResponse apiResponse = authService.registerEmployer(request, response);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("employer/login")
    public ResponseEntity<ApiResponse> loginEmployer(@RequestBody LoginRequesst request, HttpServletResponse response) {
        try {
            ApiResponse apiResponse = authService.loginEmployer(request, response);
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new org.example.project3.response.ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("/candidate/change-password")
    public ResponseEntity<ApiResponse> changePasswordCandidate(@RequestBody ChangePasswordRequest request) {
        try {
            ApiResponse apiResponse = authService.changePasswordCandidate(request);

            if (apiResponse.getSuccess()) {
                return ResponseEntity.ok(apiResponse);
            } else {
                return ResponseEntity.badRequest().body(apiResponse);
            }
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("candidate/delete-account")
    public ResponseEntity<ApiResponse> deleteCandidateAccount(@RequestBody DeleteAccountRequest request, HttpServletResponse response) {
        try {
            ApiResponse apiResponse = authService.deleteCandidateAccount(request, response);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(false, e.getMessage(), null));
        }
    }
}
