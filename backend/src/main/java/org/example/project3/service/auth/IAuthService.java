package org.example.project3.service.auth;

import org.example.project3.request.auth.LoginRequesst;
import org.example.project3.request.auth.RegisterCandidateRequest;
import org.example.project3.request.auth.RegisterEmployerRequest;
import org.example.project3.response.ApiResponse;

public interface IAuthService {
    ApiResponse registerCandidate(RegisterCandidateRequest request);
    ApiResponse loginCandidate(LoginRequesst requesst);
    ApiResponse registerEmployer(RegisterEmployerRequest request);
    ApiResponse loginEmployer(LoginRequesst requesst);
}
