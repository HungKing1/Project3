package org.example.project3.entity.job.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "salaries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Salary {
    @Id
    @Column(name = "salary_id")
    private Long id;

    @Column(name = "salary_name", nullable = false)
    private String name;
}
