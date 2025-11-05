package org.example.project3.entity.job.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "education_levels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EducationLevel {
    @Id
    @Column(name = "edu_level_id")
    private Long id;

    @Column(name = "edu_name", nullable = false)
    private String name;
}
