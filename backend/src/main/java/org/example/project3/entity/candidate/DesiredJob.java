package org.example.project3.entity.candidate;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cand_id", nullable = false)
    private Candidate candidate;

    // Khu vực mong muốn làm việc
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ward_id")
    private Ward ward;

    // Ngành nghề
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_id")
    private Industry industry;

    // Hình thức làm việc (Full-time, Part-time,...)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_type_id")
    private WorkType workType;

    // Mức lương mong muốn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expected_salary_id")
    private Salary expectedSalary;

    // -------- Normal attributes --------
    //(VD: Nhân viên chăm sóc, ...)
    @Column(name = "job_title", nullable = false, columnDefinition = "TEXT")
    private String jobTitle;
}
