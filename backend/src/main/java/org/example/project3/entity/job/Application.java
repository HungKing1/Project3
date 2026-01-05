package org.example.project3.entity.job;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.candidate.Candidate;

import java.time.LocalDateTime;

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

    @ManyToOne
    @JoinColumn(name = "cand_id", nullable = false)
    @JsonIgnoreProperties("applications")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    @JsonIgnoreProperties("applications")
    private Job job;

    @Column(name = "appl_status")
    private Status status;  // pending, approved, rejected...

    @Column(name = "appl_applied_at")
    private LocalDateTime appliedAt;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}
