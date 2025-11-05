package org.example.project3.entity.job.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "experience_years")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceYear {
    @Id
    @Column(name = "exp_years_id")
    private Long id;

    @Column(name = "exp_years_name", nullable = false)
    private String name;
}
