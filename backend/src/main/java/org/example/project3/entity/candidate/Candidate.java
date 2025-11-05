package org.example.project3.entity.candidate;

import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.job.reference.*;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cand_id")
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false, unique = true, length = 11)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    // Quan hệ với City
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    // Quan hệ với District
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ward_id")
    private Ward ward;

    // Trình độ học vấn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edu_level_id")
    private EducationLevel educationLevel;

    // Mức độ công việc
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_level_id")
    private JobLevel jobLevel;

    // Số năm kinh nghiệm
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exp_years_id")
    private ExperienceYear experienceYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_type_id")
    private WorkType workType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_id")
    private Industry industry;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salary_id")
    private Salary salary;

    // -------- Normal attributes --------
    @Column(name = "address")
    private String address;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "gender")
    private Integer gender; // 0 = Nam, 1 = Nữ

    @Column(name = "marital_status")
    private Integer maritalStatus;

    //vị trí mong muốn ???
    @Column(name = "career_goal")
    private String careerGoal;

    @Column(name = "personal_skill")
    private String personalSkill;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    // Quan hệ với bảng Chat
    @Column(name = "chat_id")
    private Long chatId;
}
