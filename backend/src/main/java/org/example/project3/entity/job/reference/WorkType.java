package org.example.project3.entity.job.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "work_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkType {
    @Id
    @Column(name = "work_type_id")
    private Long id;

    @Column(name = "work_type_name", nullable = false)
    private String name;
}
