package org.example.project3.entity.candidate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.job.reference.*;

@Entity
@Table(name = "desired_jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DesiredJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "desired_job_id")
    private Long id;

    // Mỗi DesiredJob thuộc về một Candidate
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "cand_id", nullable = false)
    private Candidate candidate;

    // Khu vực mong muốn làm việc
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    // Ngành nghề
    @ManyToOne
    @JoinColumn(name = "industry_id")
    private Industry industry;

    // Hình thức làm việc (Full-time, Part-time,...)
    @ManyToOne
    @JoinColumn(name = "work_type_id")
    private WorkType workType;

    // Mức lương mong muốn
    @ManyToOne
    @JoinColumn(name = "expected_salary_id")
    private Salary expectedSalary;

    @ManyToOne
    @JoinColumn(name = "job_level_id")
    private JobLevel jobLevel;

    // -------- Normal attributes --------
    //(VD: Nhân viên chăm sóc, ...)
    @Column(name = "job_title", nullable = false, columnDefinition = "TEXT")
    private String jobTitle;
}
