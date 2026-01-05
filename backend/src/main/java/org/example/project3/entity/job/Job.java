package org.example.project3.entity.job;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.employer.Employer;
import org.example.project3.entity.job.reference.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "epml_id")
    private Employer employer;

    @ManyToOne
    @JoinColumn(name = "job_level_id")
    private JobLevel jobLevel;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    @ManyToOne
    @JoinColumn(name = "work_type_id")
    private WorkType workType;

    @ManyToOne
    @JoinColumn(name = "exp_years_id")
    private ExperienceYear experienceYear;

    @ManyToOne
    @JoinColumn(name = "industry_id")
    private Industry industry;

    @ManyToOne
    @JoinColumn(name = "salary_id")
    private Salary salary;

    @JsonIgnore
    @OneToMany(mappedBy = "job")
    private List<Application> applications;

    // -------- Normal attributes --------
    @Column(name = "title")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "employee_count")
    private Integer employeeCount;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "decription")
    private String description;

    @Column(name = "contact_phone")
    private String contactPhone;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
