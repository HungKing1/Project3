package org.example.project3.request.profileCandidate;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DegreeRequest {
    private Long id;
    private Long educationLevelId;
    private String name;
    private String institutionName;
    private String major;
    private String classification;
    private LocalDate startDate;
    private LocalDate endDate;
}
