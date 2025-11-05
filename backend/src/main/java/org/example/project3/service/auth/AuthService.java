package org.example.project3.service.auth;

import lombok.RequiredArgsConstructor;
import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.employer.Employer;
import org.example.project3.entity.job.reference.*;
import org.example.project3.repository.candidate.CandidateRepository;
import org.example.project3.repository.employer.EmployerRepository;
import org.example.project3.repository.reference.*;
import org.example.project3.request.auth.LoginRequesst;
import org.example.project3.request.auth.RegisterCandidateRequest;
import org.example.project3.request.auth.RegisterEmployerRequest;
import org.example.project3.response.ApiResponse;
import org.example.project3.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final CandidateRepository candidateRepository;
    private final EmployerRepository employerRepository;

    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private final JobLevelRepository jobLevelRepository;
    private final ExperienceYearRepository experienceYearRepository;
    private final WorkTypeRepository workTypeRepository;
    private final IndustryRepository industryRepository;
    private final SalaryRepository salaryRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    @Override
    public ApiResponse registerCandidate(RegisterCandidateRequest request) {
        try {
            // Kiểm tra trùng email / phone
            if (candidateRepository.findByEmail(request.getEmail()).isPresent()) {
                return new ApiResponse(false, "Email đã tồn tại trong hệ thống");
            }
            if (candidateRepository.findByPhone(request.getPhone()).isPresent()) {
                return new ApiResponse(false, "Số điện thoại đã tồn tại trong hệ thống");
            }

            // Mã hoá mật khẩu
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            // Lấy các entity tham chiếu
            City city = cityRepository.findById(request.getCityId()).orElse(null);
            District district = districtRepository.findById(request.getDistrictId()).orElse(null);
            Ward ward = wardRepository.findById(request.getWardId()).orElse(null);
            JobLevel jobLevel = jobLevelRepository.findById(request.getJobLevelId()).orElse(null);
            ExperienceYear expYear = experienceYearRepository.findById(request.getExperienceYearId()).orElse(null);
            WorkType workType = workTypeRepository.findById(request.getWorkTypeId()).orElse(null);
            Industry industry = industryRepository.findById(request.getIndustryId()).orElse(null);
            Salary salary = salaryRepository.findById(request.getSalaryId()).orElse(null);

            // Tạo Candidate
            Candidate candidate = Candidate.builder()
                    .email(request.getEmail())
                    .phone(request.getPhone())
                    .name(request.getName())
                    .password(encodedPassword)
                    .careerGoal(request.getCareerGoal())
                    .birthday(request.getBirthday())
                    .experienceYear(expYear)
                    .jobLevel(jobLevel)
                    .workType(workType)
                    .gender(request.getGender())
                    .industry(industry)
                    .salary(salary)
                    .city(city)
                    .district(district)
                    .ward(ward)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            // Lưu vào DB
            Candidate savedCandidate = candidateRepository.save(candidate);

            // Sinh JWT
            String accessToken = jwtUtil.generateToken(savedCandidate.getId(), savedCandidate.getEmail());

            // Gói dữ liệu trả về
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);
            data.put("candidate", savedCandidate);

            return new ApiResponse(true, data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng ký thất bại: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse loginCandidate(LoginRequesst requesst) {
        try {
            Optional<Candidate> candidate = candidateRepository.findByEmail(requesst.getEmail());
            if (candidate.isEmpty()) {
                return new ApiResponse(false, "Email không tồn tại trong hệ thống");
            }
            if (!passwordEncoder.matches(requesst.getPassword(), candidate.get().getPassword())) {
                return new ApiResponse(false, "Mật khẩu không đúng");
            }

            String accessToken = jwtUtil.generateToken(candidate.get().getId(), candidate.get().getEmail());
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);

            return new ApiResponse(true, data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng nhập thất bại: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse registerEmployer(RegisterEmployerRequest request) {
        try {
            // Kiểm tra trùng email / phone
            if (employerRepository.findByEmail(request.getEmail()).isPresent()) {
                return new ApiResponse(false, "Email đã tồn tại trong hệ thống");
            }
            if (employerRepository.findByPhone(request.getPhone()).isPresent()) {
                return new ApiResponse(false, "Số điện thoại đã tồn tại trong hệ thống");
            }

            // Mã hoá mật khẩu
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            // Tạo Employer
            Employer employer = Employer.builder()
                    .email(request.getEmail())
                    .phone(request.getPhone())
                    .password(encodedPassword)
                    .companyName(request.getCompanyName())
                    .address(request.getAddress())
                    .companyDescription(request.getCompanyDescription())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            // Lưu vào DB
            Employer savedEmployer = employerRepository.save(employer);

            // Sinh JWT
            String accessToken = jwtUtil.generateToken(savedEmployer.getId(), savedEmployer.getEmail());

            // Gói dữ liệu trả về
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);
            data.put("employer", savedEmployer);

            return new ApiResponse(true, data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng ký thất bại: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse loginEmployer(LoginRequesst requesst) {
        try {
            Optional<Employer> employer = employerRepository.findByEmail(requesst.getEmail());
            if (employer.isEmpty()) {
                return new ApiResponse(false, "Email không tồn tại trong hệ thống");
            }
            if (!passwordEncoder.matches(requesst.getPassword(), employer.get().getPassword())) {
                return new ApiResponse(false, "Mật khẩu không đúng");
            }

            String accessToken = jwtUtil.generateToken(employer.get().getId(), employer.get().getEmail());
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);

            return new ApiResponse(true, data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng nhập thất bại: " + e.getMessage());
        }
    }
}
