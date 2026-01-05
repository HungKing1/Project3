package org.example.project3.entity.candidate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.job.Application;
import org.example.project3.entity.job.reference.*;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

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

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "candidate")
    private List<Application> applications;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<Message> messages;

    // Quan hệ với City
    @ManyToOne()
    @JoinColumn(name = "city_id")
    private City city;

    // Quan hệ với District
    @ManyToOne()
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne()
    @JoinColumn(name = "ward_id")
    private Ward ward;

    // Trình độ học vấn
    @ManyToOne()
    @JoinColumn(name = "edu_level_id")
    private EducationLevel educationLevel;

    // Mức độ công việc
    @ManyToOne()
    @JoinColumn(name = "job_level_id")
    private JobLevel jobLevel;

    // Số năm kinh nghiệm
    @ManyToOne()
    @JoinColumn(name = "exp_years_id")
    private ExperienceYear experienceYear;

    @ManyToOne()
    @JoinColumn(name = "work_type_id")
    private WorkType workType;

    @ManyToOne()
    @JoinColumn(name = "industry_id")
    private Industry industry;

    @ManyToOne()
    @JoinColumn(name = "salary_id")
    private Salary salary;

    @OneToOne(mappedBy = "candidate", cascade =  CascadeType.ALL)
    @JsonIgnore
    private DesiredJob desiredJob;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<Degree> degrees;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<LanguageCertificate> languageCertificates;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<Experience> experiences;


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
