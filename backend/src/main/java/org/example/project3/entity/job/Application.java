package org.example.project3.entity.job;

import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.candidate.Candidate;

@Entity
@Table(name = "applications")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cand_id", nullable = false)
    private Candidate candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column(name = "appl_status")
    private String status;  // pending, approved, rejected...

    @Column(name = "appl_applied_at")
    private String appliedAt;
}
