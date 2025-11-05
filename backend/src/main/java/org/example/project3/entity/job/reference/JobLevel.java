package org.example.project3.entity.job.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "job_levels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobLevel {
    @Id
    @Column(name = "job_level_id")
    private Long id;

    @Column(name = "job_level_name", nullable = false)
    private String name;
}
