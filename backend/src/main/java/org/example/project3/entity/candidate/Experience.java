package org.example.project3.entity.candidate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.candidate.Candidate;

import java.time.LocalDate;

@Entity
@Table(name = "experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_id")
    private Long id;

    // Quan hệ N-1: nhiều kinh nghiệm thuộc về 1 ứng viên
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cand_id", nullable = false)
    private Candidate candidate;

    // -------- Normal attributes --------
    @Column(name = "job_title", nullable = false, columnDefinition = "TEXT")
    private String jobTitle;

    @Column(name = "company_name", nullable = false, columnDefinition = "TEXT")
    private String companyName;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "time_start")
    private LocalDate timeStart;

    @Column(name = "time_end")
    private LocalDate timeEnd;
}
