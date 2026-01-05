package org.example.project3.response;

import lombok.Data;
import org.example.project3.entity.job.Job;

import java.time.LocalDateTime;

@Data
public class GetJobResponse {
    private Long id;
    private String title;
    private String address;
    private Integer employeeCount;
    private String contactName;
    private String contactPhone;
    private String contactEmail;
    private String description;
    private LocalDateTime createdAt;

    // --- Các trường đã được làm phẳng (Flat fields) ---
    private String employerName;
    private String jobLevelName;
    private String cityName;      // Chỉ lấy tên City
    private String districtName;  // Chỉ lấy tên District
    private String wardName;      // Chỉ lấy tên Ward
    private String workTypeName;
    private String experienceYearName;
    private String industryName;
    private String salaryName;
    private Integer gender;

    private boolean isApplied;

    // Constructor để map từ Entity sang DTO
    public GetJobResponse(Job job) {
        this.id = job.getId();
        this.title = job.getTitle();
        this.address = job.getAddress();
        this.employeeCount = job.getEmployeeCount();
        this.contactName = job.getContactName();
        this.contactPhone = job.getContactPhone();
        this.contactEmail = job.getContactEmail();
        this.description = job.getDescription();
        this.createdAt = job.getCreatedAt();

        // Map các object liên kết (Cần check null an toàn)
        this.employerName = (job.getEmployer() != null) ? job.getEmployer().getCompanyName() : null; // Giả sử Employer có getName()
        this.jobLevelName = (job.getJobLevel() != null) ? job.getJobLevel().getName() : null;
        this.cityName = (job.getCity() != null) ? job.getCity().getName() : null;
        this.districtName = (job.getDistrict() != null) ? job.getDistrict().getName() : null;
        this.wardName = (job.getWard() != null) ? job.getWard().getName() : null;
        this.workTypeName = (job.getWorkType() != null) ? job.getWorkType().getName() : null;
        this.experienceYearName = (job.getExperienceYear() != null) ? job.getExperienceYear().getName() : null;
        this.industryName = (job.getIndustry() != null) ? job.getIndustry().getName() : null;
        this.salaryName = (job.getSalary() != null) ? job.getSalary().getName() : null; // Giả sử Salary có getName()
        this.gender = job.getGender();
    }
}