package org.example.project3.service.auth;

import jakarta.servlet.http.HttpServletResponse;
import org.example.project3.request.auth.*;
import org.example.project3.response.ApiResponse;

public interface IAuthService {
    ApiResponse registerCandidate(RegisterCandidateRequest request, HttpServletResponse response);
    ApiResponse loginCandidate(LoginRequesst requesst, HttpServletResponse response);
    ApiResponse registerEmployer(RegisterEmployerRequest request, HttpServletResponse response);
    ApiResponse loginEmployer(LoginRequesst requesst, HttpServletResponse response);
    ApiResponse logoutCandidate(HttpServletResponse response);
    ApiResponse changePasswordCandidate(ChangePasswordRequest request);
    ApiResponse deleteCandidateAccount(DeleteAccountRequest request, HttpServletResponse response);
}
