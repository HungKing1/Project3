package org.example.project3.entity.candidate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "language_certificates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LanguageCertificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lang_cer_id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cand_id", nullable = false)
    private Candidate candidate;

    // -------- Normal attributes --------
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "result", nullable = false)
    private String result;

    @Column(name = "time_start", nullable = false)
    private LocalDate timeStart;

    @Column(name = "time_end", nullable = false)
    private LocalDate timeEnd;

    @Column(name = "issuing_organization", nullable = false)
    private String issuingOrganization;
}
