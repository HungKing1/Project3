package org.example.project3.request.profileCandidate;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExperienceRequest {
    private Long id;
    private String jobTitle;
    private String companyName;
    private String jobDescription;
    private LocalDate timeStart;
    private LocalDate timeEnd;
}
