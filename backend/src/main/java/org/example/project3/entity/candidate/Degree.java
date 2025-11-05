package org.example.project3.entity.candidate;

import jakarta.persistence.*;
import lombok.*;
import org.example.project3.entity.job.reference.EducationLevel;

import java.time.LocalDate;

@Entity
@Table(name = "degrees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Degree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "degree_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cand_id", nullable = false)
    private Candidate candidate;

    // -------- Normal attributes --------
    // Trình độ học vấn (VD: Đại học, Thạc sĩ, Tiến sĩ)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edu_level_id")
    private EducationLevel educationLevel;

    @Column(name = "name", nullable = false)
    private String name; // Tên bằng cấp (VD: Cử nhân, Kĩ sư)

    @Column(name = "institution_name")
    private String institutionName; // Tên trường / cơ sở đào tạo

    @Column(name = "major")
    private String major; // Ngành học

    @Column(name = "classification")
    private String classification; // Xếp loại (VD: Giỏi, Khá, ...)

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
}
