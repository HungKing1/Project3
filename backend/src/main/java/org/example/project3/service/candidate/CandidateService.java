package org.example.project3.service.candidate;

import lombok.RequiredArgsConstructor;
import org.example.project3.dto.AppliedJobDTO;
import org.example.project3.entity.candidate.*;
import org.example.project3.entity.job.Application;
import org.example.project3.entity.job.Job;
import org.example.project3.entity.job.reference.*;
import org.example.project3.repository.candidate.*;
import org.example.project3.repository.job.ApplicationRepository;
import org.example.project3.repository.job.JobRepository;
import org.example.project3.repository.reference.*;
import org.example.project3.request.job.ApplyJobRequest;
import org.example.project3.request.profileCandidate.*;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.cloudinary.ICloudinaryService;
import org.example.project3.util.JwtUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.HashMap;
import java.util.Map;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidateService implements ICandidateService {
    private final CandidateRepository candidateRepository;
    private final DesiredJobRepository desiredJobRepository;
    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private final WorkTypeRepository workTypeRepository;
    private final JobLevelRepository jobLevelRepository;
    private final ExperienceYearRepository experienceYearRepository;
    private final IndustryRepository industryRepository;
    private final SalaryRepository salaryRepository;
    private final ApplicationRepository applicationRepository;
    private final EducationLevelRepository educationLevelRepository;
    private final LanguageCertificateRepository languageCertificateRepository;
    private final ExperienceRepository experienceRepository;

    private final ICloudinaryService cloudinaryService;


    private final JwtUtil jwtUtil;
    private final JobRepository jobRepository;
    private final DegreeRepository degreeRepository;

//    String token = jwtUtil.extractToken();
//    Long candidateId = jwtUtil.extractId(token);

    @Override
    public ApiResponse getPersonalInfo() {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> candidateOptional = candidateRepository.findByEmail(email);
            if (candidateOptional.isEmpty()) {
                return new ApiResponse(false, "Candidate not found", null);
            }

            Candidate candidate = candidateOptional.get();

            PersonalInfoRequest personalInfoRequest = new PersonalInfoRequest();
            personalInfoRequest.setName(candidate.getName());
            personalInfoRequest.setPhone(candidate.getPhone());
            personalInfoRequest.setBirthday(candidate.getBirthday());
            personalInfoRequest.setGender(candidate.getGender());
            personalInfoRequest.setMaritalStatus(candidate.getMaritalStatus());
            personalInfoRequest.setCityId(candidate.getCity().getId());
            personalInfoRequest.setDistrictId(candidate.getDistrict().getId());
            personalInfoRequest.setWardId(candidate.getWard().getId());
            personalInfoRequest.setAddress(candidate.getAddress());
            personalInfoRequest.setAvatarUrl(candidate.getAvatarUrl());

            return new ApiResponse(true, "Lấy thông tin cá nhân thành công", personalInfoRequest);
        }  catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại" , errorData);
        }
    }

    @Override
    public ApiResponse updatePersonalInfo(PersonalInfoRequest request) {
        String email = JwtUtil.getUserEmail();
        try {
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "Ứng viên không tồn tại", null);
            }
            Candidate candidate = optionalCandidate.get();

            City city = cityRepository.findById(request.getCityId()).orElse(null);
            District district = districtRepository.findById(request.getDistrictId()).orElse(null);
            Ward ward = wardRepository.findById(request.getWardId()).orElse(null);

            if (request.getAvatarFile() != null && !request.getAvatarFile().isEmpty()) {
                Map uploadResult = cloudinaryService.uploadFile(request.getAvatarFile());
                String imageUrl = (String) uploadResult.get("url");
                candidate.setAvatarUrl(imageUrl); // Lưu link ảnh vào DB
            }

            candidate.setName(request.getName());
            candidate.setPhone(request.getPhone());
            candidate.setBirthday(request.getBirthday());
            candidate.setGender(request.getGender());
            candidate.setMaritalStatus(request.getMaritalStatus());
            candidate.setCity(city);
            candidate.setDistrict(district);
            candidate.setWard(ward);
            candidate.setAddress(request.getAddress());

            candidateRepository.save(candidate);

            Map<String, String> successData = Map.of("message", "Cập nhật thông tin cá nhân thành công");
            return new ApiResponse(true, "Cập nhật thông tin cá nhân thành công" ,successData);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại" , errorData);
        }
    }

    @Override
    public ApiResponse getDesiredJob() {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> candidateOptional = candidateRepository.findByEmail(email);
            if (candidateOptional.isEmpty()) {
                return new  ApiResponse(false, "User not found", null);
            }
            Candidate candidate = candidateOptional.get();
            DesiredJob desiredJob = new DesiredJob();
            desiredJob = candidate.getDesiredJob();

            return new ApiResponse(true, "Lấy thông tin công việc mong muốn thành công", desiredJob);
        } catch (Exception e) {
            return new ApiResponse(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse updateDesiredJob(DesiredJobRequest request) {
        String email = JwtUtil.getUserEmail();
        try {
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "User not found", null);
            }
            Candidate candidate = optionalCandidate.get();
            DesiredJob desiredJob = candidate.getDesiredJob();

            City city = cityRepository.findById(request.getCityId()).orElse(null);
//            District district = districtRepository.findById(request.getDistrictId()).orElse(null);
            Salary salary = salaryRepository.findById(request.getExpectedSalaryId()).orElse(null);
            Industry industry = industryRepository.findById(request.getIndustryId()).orElse(null);
//            Ward ward = wardRepository.findById(request.getWardId()).orElse(null);
            WorkType workType = workTypeRepository.findById(request.getWorkTypeId()).orElse(null);
            JobLevel jobLevel = jobLevelRepository.findById(request.getJobLevelId()).orElse(null);

            desiredJob.setCandidate(candidate);
            desiredJob.setJobTitle(request.getJobTitle());
            desiredJob.setCity(city);
//            desiredJob.setDistrict(district);
            desiredJob.setExpectedSalary(salary);
            desiredJob.setIndustry(industry);
//            desiredJob.setWard(ward);
            desiredJob.setWorkType(workType);
            desiredJob.setJobLevel(jobLevel);

            desiredJobRepository.save(desiredJob);
            candidate.setDesiredJob(desiredJob);

            candidate.setJobLevel(jobLevel);
            candidate.setSalary(salary);
            candidate.setIndustry(industry);

            candidateRepository.save(candidate);

            Map<String, String> successData = Map.of("message", "Cập nhật công việc mong muốn thành công");
            return new ApiResponse(true, "Cập nhật công việc mong muốn thành công", successData);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại" , errorData);
        }
    }

    @Override
    public ApiResponse getCareerGoal() {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "User not found", null);
            }
            Candidate candidate = optionalCandidate.get();
            return new ApiResponse(true, "Lấy mục tiêu nghề nghiệp thành công", candidate.getCareerGoal());
        } catch (Exception e) {
            return new ApiResponse(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse updateCareerGoal(CareerGoalRequest careerGoal) {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "User not found", null);
            }
            Candidate candidate = optionalCandidate.get();
            candidate.setCareerGoal(careerGoal.getCareerGoal());
            candidateRepository.save(candidate);

            return new ApiResponse(true, "Cập nhật mục tiêu nghề nghiệp thành công", candidate.getCareerGoal());
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại" , errorData);
        }
    }

    @Override
    public ApiResponse getPersonalSkill() {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "User not found", null);
            }
            Candidate candidate = optionalCandidate.get();
            return new ApiResponse(true, "Lấy thông tin kỹ năng cá nhân thành công", candidate.getPersonalSkill());
        } catch (Exception e) {
            return new ApiResponse(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse updatePersonalSkill(PersonalSkillRequest  personalSkill) {
        try {
            try {
                String email = JwtUtil.getUserEmail();
                Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
                if (optionalCandidate.isEmpty()) {
                    return new ApiResponse(false, "User not found", null);
                }
                Candidate candidate = optionalCandidate.get();
                candidate.setPersonalSkill(personalSkill.getPersonalSkill());
                candidateRepository.save(candidate);

                return new ApiResponse(true, "Cập nhật thông tin kỹ năng cá nhân thành công",  candidate.getPersonalSkill());
            } catch (Exception e) {
                return new ApiResponse(false, e.getMessage(), null);
            }
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại" , errorData);
        }
    }

    @Override
    public ApiResponse getDegrees() {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "User not found", null);
            }

            Candidate candidate = optionalCandidate.get();
            List<Degree> degrees = candidate.getDegrees();

            List<DegreeRequest> responseData = degrees.stream().map(degree -> {
                DegreeRequest dto = new DegreeRequest();
                dto.setId(degree.getId());
                dto.setName(degree.getName());
                dto.setInstitutionName(degree.getInstitutionName());
                dto.setMajor(degree.getMajor());
                dto.setClassification(degree.getClassification());
                dto.setStartDate(degree.getStartDate());
                dto.setEndDate(degree.getEndDate());

                if (degree.getEducationLevel() != null) {
                    dto.setEducationLevelId(degree.getEducationLevel().getId());
                }

               return dto;
            }).collect(Collectors.toList());

            return new ApiResponse(true, "Lấy thông tin các bằng cấp thành công",  responseData);

        } catch (Exception e) {
            return  new ApiResponse(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse updateDegree(DegreeRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            Degree degree = degreeRepository.findById(request.getId())
                    .orElseThrow(() -> new RuntimeException("Degree not found"));

            if(!degree.getCandidate().getEmail().equals(email)) {
                return new ApiResponse(false, "Bạn không có quyền sửa bản ghi này", null);
            }

            EducationLevel eduLevel = educationLevelRepository.findById(request.getEducationLevelId())
                    .orElseThrow(() -> new RuntimeException("EducationLevel not found"));

            degree.setName(request.getName());
            degree.setInstitutionName(request.getInstitutionName());
            degree.setMajor(request.getMajor());
            degree.setClassification(request.getClassification());
            degree.setStartDate(request.getStartDate());
            degree.setEndDate(request.getEndDate());
            degree.setEducationLevel(eduLevel);

            degreeRepository.save(degree);
            return new ApiResponse(true, "Cập nhật bằng cấp thành công", degree);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại", errorData);
        }
    }

    @Override
    public ApiResponse deleteDegree(Long id) {
        try {
            String email = JwtUtil.getUserEmail();
            Degree degree = degreeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Degree not found"));
            if(!degree.getCandidate().getEmail().equals(email)) {
                return new ApiResponse(false, "Bạn không có quyền sửa bản ghi này", null);
            }

            degreeRepository.delete(degree);
            return new ApiResponse(true, "Xóa bằng cấp thành công", null);
        } catch (Exception e) {
            return new ApiResponse(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse addDegree(DegreeRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "User not found", null);
            }

            EducationLevel eduLevel = educationLevelRepository.findById(request.getEducationLevelId()).orElseThrow(
                    () -> new RuntimeException("EducationLevel not found")
            );

            Candidate candidate = optionalCandidate.get();
            Degree degree = Degree.builder()
                    .candidate(candidate)
                    .educationLevel(eduLevel)
                    .name(request.getName())
                    .institutionName(request.getInstitutionName())
                    .major(request.getMajor())
                    .classification(request.getClassification())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .build();

            degreeRepository.save(degree);
            return new ApiResponse(true, "Thêm bằng cấp thành công",  degree);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại" , errorData);
        }
    }

    @Override
    public ApiResponse getLanguageCertificates() {
        try {
            String email = JwtUtil.getUserEmail();
            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Candidate không tồn tại"));

            // Lấy danh sách từ repository dựa trên đối tượng candidate
            List<LanguageCertificate> certificates = languageCertificateRepository.findByCandidate(candidate);

            // Chuyển đổi từ Entity sang Request DTO để gửi về Frontend
            List<LanguageCertificateRequest> responseData = certificates.stream().map(cert -> {
                LanguageCertificateRequest req = new LanguageCertificateRequest();
                req.setId(cert.getId());
                req.setName(cert.getName());
                req.setIssuingOrganization(cert.getIssuingOrganization());
                req.setResult(cert.getResult());
                req.setStartDate(cert.getTimeStart()); // ánh xạ từ time_start
                req.setEndDate(cert.getTimeEnd());     // ánh xạ từ time_end
                return req;
            }).collect(Collectors.toList());

            return new ApiResponse(true, "Lấy thông tin các chứng chỉ thành công", responseData);
        } catch (Exception e) {
            return new ApiResponse(false, "Lỗi lấy dữ liệu: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse addLanguageCertificate(LanguageCertificateRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Candidate không tồn tại"));

            // Tạo mới đối tượng Entity từ DTO
            LanguageCertificate cert = LanguageCertificate.builder()
                    .candidate(candidate)
                    .name(request.getName())
                    .issuingOrganization(request.getIssuingOrganization())
                    .result(request.getResult())
                    .timeStart(request.getStartDate())
                    .timeEnd(request.getEndDate())
                    .build();

            languageCertificateRepository.save(cert);
            return new ApiResponse(true, "Thêm chứng chỉ thành công", null);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Thêm mới thất bại: " + e.getMessage());
            return new ApiResponse(false, "Thao tác thất bại", errorData);
        }
    }

    @Override
    public ApiResponse updateLanguageCertificate(LanguageCertificateRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            LanguageCertificate cert = languageCertificateRepository.findById(request.getId())
                    .orElseThrow(() -> new RuntimeException("Chứng chỉ không tồn tại"));

            // KIỂM TRA BẢO MẬT: Phải đúng chủ sở hữu mới được sửa
            if (!cert.getCandidate().getEmail().equals(email)) {
                return new ApiResponse(false, "Bạn không có quyền cập nhật bản ghi này", null);
            }

            // Cập nhật các trường thông tin
            cert.setName(request.getName());
            cert.setIssuingOrganization(request.getIssuingOrganization());
            cert.setResult(request.getResult());
            cert.setTimeStart(request.getStartDate());
            cert.setTimeEnd(request.getEndDate());

            languageCertificateRepository.save(cert);
            return new ApiResponse(true, "Cập nhật chứng chỉ thành công", null);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Thao tác thất bại", errorData);
        }
    }

    @Override
    public ApiResponse deleteLanguageCertificate(Long id) {
        try {
            String email = JwtUtil.getUserEmail();
            LanguageCertificate cert = languageCertificateRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Chứng chỉ không tồn tại"));

            // KIỂM TRA BẢO MẬT
            if (!cert.getCandidate().getEmail().equals(email)) {
                return new ApiResponse(false, "Bạn không có quyền xóa bản ghi này", null);
            }

            languageCertificateRepository.delete(cert);
            return new ApiResponse(true, "Xóa chứng chỉ thành công", null);
        } catch (Exception e) {
            return new ApiResponse(false, "Lỗi khi xóa: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse getWorkExperiences() {
        try {
            String email = JwtUtil.getUserEmail();
            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Ứng viên không tồn tại"));

            // Lấy danh sách kinh nghiệm từ repository dựa trên đối tượng candidate
            List<Experience> experiences = experienceRepository.findByCandidate(candidate);

            // Chuyển đổi từ Entity sang DTO (ExperienceRequest) để trả về Frontend
            List<ExperienceRequest> responseData = experiences.stream().map(exp -> {
                ExperienceRequest req = new ExperienceRequest();
                req.setId(exp.getId());
                req.setCompanyName(exp.getCompanyName());
                req.setJobTitle(exp.getJobTitle());
                req.setJobDescription(exp.getJobDescription());
                req.setStartDate(exp.getTimeStart()); // Ánh xạ từ time_start
                req.setEndDate(exp.getTimeEnd());     // Ánh xạ từ time_end
                return req;
            }).collect(Collectors.toList());

            return new ApiResponse(true, "Lấy danh sách kinh nghiệm thành công", responseData);
        } catch (Exception e) {
            return new ApiResponse(false, "Lỗi lấy dữ liệu: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse addWorkExperience(ExperienceRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Ứng viên không tồn tại"));

            // Tạo đối tượng Entity mới từ dữ liệu Request
            Experience experience = Experience.builder()
                    .candidate(candidate)
                    .companyName(request.getCompanyName())
                    .jobTitle(request.getJobTitle())
                    .jobDescription(request.getJobDescription())
                    .timeStart(request.getStartDate())
                    .timeEnd(request.getEndDate())
                    .build();

            experienceRepository.save(experience);
            return new ApiResponse(true, "Thêm kinh nghiệm làm việc thành công", null);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Thêm mới thất bại: " + e.getMessage());
            return new ApiResponse(false, "Thao tác thất bại", errorData);
        }
    }

    @Override
    public ApiResponse updateWorkExperience(ExperienceRequest request) {
        try {
            String email = JwtUtil.getUserEmail();
            Experience experience = experienceRepository.findById(request.getId())
                    .orElseThrow(() -> new RuntimeException("Kinh nghiệm này không tồn tại"));

            // KIỂM TRA BẢO MẬT: Chỉ chủ sở hữu mới được cập nhật
            if (!experience.getCandidate().getEmail().equals(email)) {
                return new ApiResponse(false, "Bạn không có quyền cập nhật bản ghi này", null);
            }

            // Cập nhật thông tin mới
            experience.setCompanyName(request.getCompanyName());
            experience.setJobTitle(request.getJobTitle());
            experience.setJobDescription(request.getJobDescription());
            experience.setTimeStart(request.getStartDate());
            experience.setTimeEnd(request.getEndDate());

            experienceRepository.save(experience);
            return new ApiResponse(true, "Cập nhật kinh nghiệm thành công", null);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, "Cập nhật thất bại", errorData);
        }
    }

    @Override
    public ApiResponse deleteWorkExperience(Long id) {
        try {
            String email = JwtUtil.getUserEmail();
            Experience experience = experienceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Kinh nghiệm này không tồn tại"));

            // KIỂM TRA BẢO MẬT: Chỉ chủ sở hữu mới được xóa
            if (!experience.getCandidate().getEmail().equals(email)) {
                return new ApiResponse(false, "Bạn không có quyền xóa bản ghi này", null);
            }

            experienceRepository.delete(experience);
            return new ApiResponse(true, "Xóa kinh nghiệm thành công", null);
        } catch (Exception e) {
            return new ApiResponse(false, "Lỗi khi xóa: " + e.getMessage(), null);
        }
    }

    @Override
    public ResponseEntity<ApiResponse> applyJob(ApplyJobRequest request) {
        try {
            if (applicationRepository.existsByCandidateIdAndJobId(request.getCandidateId(), request.getJobId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(false, "Bạn đã ứng tuyển vào công việc này.", null));
            }

            Candidate candidate = candidateRepository.findById(request.getCandidateId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Ứng viên có ID: " + request.getCandidateId()));

            Job job = jobRepository.findById(request.getJobId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Công việc có ID: " + request.getJobId()));

            Application application = Application.builder()
                    .appliedAt(LocalDateTime.now())
                    .status(Application.Status.PENDING)
                    .candidate(candidate)
                    .job(job)
                    .build();
            applicationRepository.save(application);

            List<Application> candidateApplications = candidate.getApplications();
            if (candidateApplications == null) {
                candidateApplications = new ArrayList<>();
                candidate.setApplications(candidateApplications);
            }
            candidateApplications.add(application);
            candidateRepository.save(candidate);

            List<Application> jobApplications = job.getApplications();
            if (jobApplications == null) {
                jobApplications = new ArrayList<>();
                job.setApplications(jobApplications);
            }
            jobApplications.add(application);
            jobRepository.save(job);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Ứng tuyển thành công", null));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }

    @Override
    public ResponseEntity<ApiResponse> getAppliedJob(int page, int limit) {
        try {
            String email = JwtUtil.getUserEmail();
            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Không xác định được người dùng hiện tại", null));
            }

            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin ứng viên với email: " + email));

            Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, limit, Sort.by("appliedAt").descending());

            Page<Application> applicationPage = applicationRepository.findByCandidateId(candidate.getId(), pageable);

            // 3. Map dữ liệu Page<Application> sang Page<AppliedJobDTO>
            Page<AppliedJobDTO> dtoPage = applicationPage.map(app -> {
                Job job = app.getJob();
                return AppliedJobDTO.builder()
                        .applicationId(app.getId())
                        .status(app.getStatus().toString())
                        .appliedAt(app.getAppliedAt())
                        .jobId(job.getId())
                        .jobTitle(job.getTitle())
                        .jobSalary(job.getSalary() != null ? job.getSalary().getName() : "Chưa cập nhật")
                        .jobWorkType(job.getWorkType() != null ? job.getWorkType().getName() : "")
                        .jobCity(job.getCity() != null ? job.getCity().getName() : "")
                        .employerId(job.getEmployer() != null ? job.getEmployer().getId() : null)
                        .companyName(job.getEmployer() != null ? job.getEmployer().getCompanyName() : "Ẩn danh")
                        .companyLogo(job.getEmployer() != null ? job.getEmployer().getAvatarUrl() : null)
                        .build();
            });

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("content", dtoPage.getContent());      // Danh sách DTO (cái frontend cần hiển thị)
            responseData.put("currentPage", dtoPage.getNumber() + 1); // Trang hiện tại (trả về kiểu bắt đầu từ 1 cho dễ dùng)
            responseData.put("totalItems", dtoPage.getTotalElements()); // Tổng số bản ghi
            responseData.put("totalPages", dtoPage.getTotalPages());    // Tổng số trang

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "Lấy danh sách ứng tuyển thành công", responseData));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }

}