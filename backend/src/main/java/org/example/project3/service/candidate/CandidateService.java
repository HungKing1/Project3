package org.example.project3.service.candidate;

import lombok.RequiredArgsConstructor;
import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.candidate.DesiredJob;
import org.example.project3.entity.job.reference.*;
import org.example.project3.repository.candidate.CandidateRepository;
import org.example.project3.repository.candidate.DesiredJobRepository;
import org.example.project3.repository.reference.*;
import org.example.project3.request.profileCandidate.*;
import org.example.project3.response.ApiResponse;
import org.example.project3.util.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

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

    private final JwtUtil jwtUtil;

//    String token = jwtUtil.extractToken();
//    Long candidateId = jwtUtil.extractId(token);

    @Override
    public ApiResponse updatePersonalInfo(PersonalInfoRequest request) {
        String token = jwtUtil.extractToken();
        Long candidateId = jwtUtil.extractId(token);
        try {
            Optional<Candidate> optionalCandidate = candidateRepository.findById(candidateId);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "Ứng viên không tồn tại");
            }
            Candidate candidate = optionalCandidate.get();

            City city = cityRepository.findById(request.getCityId()).orElse(null);
            District district = districtRepository.findById(request.getDistrictId()).orElse(null);
            Ward ward = wardRepository.findById(request.getWardId()).orElse(null);

            candidate.setName(request.getName());
            candidate.setPhone(request.getPhone());
            candidate.setBirthday(request.getBirthday());
            candidate.setGender(request.getGender());
            candidate.setCity(city);
            candidate.setDistrict(district);
            candidate.setWard(ward);

            candidateRepository.save(candidate);

            Map<String, String> successData = Map.of("message", "Cập nhật thông tin cá nhân thành công");
            return new ApiResponse(true, successData);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse updateDesiredJob(DesiredJobRequest request) {
        String token = jwtUtil.extractToken();
        Long candidateId = jwtUtil.extractId(token);
        try {
            DesiredJob desiredJob;
            if (request.getId() != null) {
                // Nếu có ID thì tìm để cập nhật
                Optional<DesiredJob> optionalDesiredJob = desiredJobRepository.findById(request.getId());
                desiredJob = optionalDesiredJob.orElseGet(DesiredJob::new); // nếu không có thì tạo mới
            } else {
                // Nếu không có ID thì tạo mới
                desiredJob = new DesiredJob();
            }

            WorkType workType = workTypeRepository.findById(request.getId()).orElse(null);
            JobLevel jobLevel = jobLevelRepository.findById(request.getJobLevelId()).orElse(null);
            ExperienceYear experienceYear = experienceYearRepository.findById(request.getExperienceId()).orElse(null);
            Industry industry = industryRepository.findById(request.getIndustryId()).orElse(null);
            Salary salary = salaryRepository.findById(request.getExpectedSalaryId()).orElse(null);
            City city = cityRepository.findById(request.getCityId()).orElse(null);
            District district = districtRepository.findById(request.getDistrictId()).orElse(null);

            desiredJob.setJobTitle(request.getJobTitle());
            desiredJob.setWorkType(workType);
            desiredJob.setIndustry(industry);
            desiredJob.setCity(city);
            desiredJob.setDistrict(district);

            desiredJobRepository.save(desiredJob);

            Optional<Candidate> optionalCandidate = candidateRepository.findById(candidateId);
            if (optionalCandidate.isEmpty()) {
                return new ApiResponse(false, "Ứng viên không tồn tại");
            }
            Candidate candidate = optionalCandidate.get();

            candidate.setJobLevel(jobLevel);
            candidate.setExperienceYear(experienceYear);
            candidate.setSalary(salary);

            candidateRepository.save(candidate);

            Map<String, String> successData = Map.of("message", "Cập nhật công việc mong muốn thành công");
            return new ApiResponse(true, successData);
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse updateCareerGoal() {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse updatePersonalSkill() {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse updateDegree(DegreeRequest request) {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse addDegree(DegreeRequest request) {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse updateLanguageCertificate(LanguageCertificateRequest request) {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse addLanguageCertificate(LanguageCertificateRequest request) {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }

    @Override
    public ApiResponse updateWorkExperience(ExperienceRequest request) {
        try {
            return null;
        } catch (Exception e) {
            Map<String, String> errorData = Map.of("message", "Cập nhật thất bại: " + e.getMessage());
            return new ApiResponse(false, errorData);
        }
    }
}