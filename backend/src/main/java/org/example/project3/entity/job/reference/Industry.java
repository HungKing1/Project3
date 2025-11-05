package org.example.project3.entity.job.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "industries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Industry {
    @Id
    @Column(name = "industry_id")
    private Long id;

    @Column(name = "industry_name", nullable = false)
    private String name;
}
