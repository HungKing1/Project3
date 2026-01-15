package org.example.project3.service.auth;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.employer.Employer;
import org.example.project3.entity.job.reference.*;
import org.example.project3.repository.candidate.CandidateRepository;
import org.example.project3.repository.employer.EmployerRepository;
import org.example.project3.repository.reference.*;
import org.example.project3.request.auth.*;
import org.example.project3.response.ApiResponse;
import org.example.project3.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
    public ApiResponse registerCandidate(RegisterCandidateRequest request, HttpServletResponse response) {
        try {
            // Kiểm tra trùng email / phone
            if (candidateRepository.findByEmail(request.getEmail()).isPresent()) {
                return new ApiResponse(false, "Email đã tồn tại trong hệ thống", null);
            }
            if (candidateRepository.findByPhone(request.getPhone()).isPresent()) {
                return new ApiResponse(false, "Số điện thoại đã tồn tại trong hệ thống", null);
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
            String accessToken = jwtUtil.generateToken(savedCandidate.getEmail());

            ResponseCookie cookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // Gói dữ liệu trả về
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);
            data.put("candidate", savedCandidate);

            return new ApiResponse(true, "Đăng ký thành công" , data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng ký thất bại: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse loginCandidate(LoginRequesst requesst, HttpServletResponse response) {
        try {
            Optional<Candidate> candidateOptional = candidateRepository.findByEmail(requesst.getEmail());
            if (candidateOptional.isEmpty()) {
                return new ApiResponse(false, "Email không tồn tại trong hệ thống", null);
            }
            if (!passwordEncoder.matches(requesst.getPassword(), candidateOptional.get().getPassword())) {
                return new ApiResponse(false, "Mật khẩu không đúng", null);
            }

            String accessToken = jwtUtil.generateToken(candidateOptional.get().getEmail());

            ResponseCookie cookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            Candidate candidate = candidateOptional.get();
            Long candidateId = candidate.getId();
            String email = candidate.getEmail();
            String name = candidate.getName();
            String phone =  candidate.getPhone();
            String avatar = candidate.getAvatarUrl();

            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);
            data.put("candidateId", candidateId);
            data.put("email", email);
            data.put("name", name);
            data.put("phone", phone);
            data.put("avatar", avatar);

            return new ApiResponse(true, "Đăng nhập thành công" , data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng nhập thất bại: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse logoutCandidate(HttpServletResponse response) {
        try {
            // Tạo cookie với cùng tên "access_token" nhưng maxAge=0 để xóa
            ResponseCookie cookie = ResponseCookie.from("access_token", "")
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(0) // maxAge=0 => xóa cookie
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return new ApiResponse(true, "Đăng xuất thành công", null);
        } catch (Exception e) {
            return new ApiResponse(false, "Đăng xuất thất bại: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse changePasswordCandidate(ChangePasswordRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                return new ApiResponse(false, "Mật khẩu xác nhận không trùng khớp", null);
            }

            Optional<Candidate> candidateOptional = candidateRepository.findByEmail(email);
            if (candidateOptional.isEmpty()) {
                return new ApiResponse(false, "Email không tồn tại", null);
            }

            Candidate candidate = candidateOptional.get();

            if (!passwordEncoder.matches(request.getOldPassword(), candidate.getPassword())) {
                return new ApiResponse(false, "Mật khẩu hiện tại không đúng", null);
            }

            String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
            candidate.setPassword(encodedNewPassword);
            candidate.setUpdatedAt(LocalDateTime.now());

            candidateRepository.save(candidate);

            return new ApiResponse(true, "Đổi mật khẩu thành công", null);

        } catch (Exception e) {
            return new ApiResponse(false, "Lỗi đổi mật khẩu: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse deleteCandidateAccount(DeleteAccountRequest request, HttpServletResponse response) {
        try {
            String currentEmail = JwtUtil.getUserEmail();
            if (currentEmail == null || currentEmail.equals("anonymousUser")) {
                return new ApiResponse(false, "Vui lòng đăng nhập để thực hiện chức năng này", null);
            }

            Optional<Candidate> candidateOptional = candidateRepository.findByEmail(currentEmail);
            if (candidateOptional.isEmpty()) {
                return new ApiResponse(false, "Không tìm thấy tài khoản", null);
            }

            Candidate candidate = candidateOptional.get();

            if (!passwordEncoder.matches(request.getPassword(), candidate.getPassword())) {
                return new ApiResponse(false, "Mật khẩu không đúng, không thể xóa tài khoản", null);
            }

            candidateRepository.delete(candidate);

            ResponseCookie cookie = ResponseCookie.from("access_token", "")
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(0)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return new ApiResponse(true, "Xóa tài khoản thành công", null);

        } catch (Exception e) {
            return new ApiResponse(false, "Lỗi xóa tài khoản: " + e.getMessage(), null);
        }
    }


    @Override
    public ApiResponse registerEmployer(RegisterEmployerRequest request, HttpServletResponse response) {
        try {
            // Kiểm tra trùng email / phone
            if (employerRepository.findByEmail(request.getEmail()).isPresent()) {
                return new ApiResponse(false, "Email đã tồn tại trong hệ thống", null);
            }
            if (employerRepository.findByPhone(request.getPhone()).isPresent()) {
                return new ApiResponse(false, "Số điện thoại đã tồn tại trong hệ thống", null);
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
            String accessToken = jwtUtil.generateToken(savedEmployer.getEmail());

            ResponseCookie cookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // Gói dữ liệu trả về
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);
            data.put("employer", savedEmployer);

            return new ApiResponse(true, "Đăng ký thành công"  , data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng ký thất bại: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse loginEmployer(LoginRequesst requesst, HttpServletResponse response) {
        try {
            Optional<Employer> employer = employerRepository.findByEmail(requesst.getEmail());
            if (employer.isEmpty()) {
                return new ApiResponse(false, "Email không tồn tại trong hệ thống", null);
            }
            if (!passwordEncoder.matches(requesst.getPassword(), employer.get().getPassword())) {
                return new ApiResponse(false, "Mật khẩu không đúng", null);
            }

            String accessToken = jwtUtil.generateToken(employer.get().getEmail());
            ResponseCookie cookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            Map<String, Object> data = new HashMap<>();
            data.put("accessToken", accessToken);

            return new ApiResponse(true, "Đăng nhập thành công" , data);

        } catch (Exception e) {
            return new ApiResponse(false, "Đăng nhập thất bại: " + e.getMessage(), null);
        }
    }
}
