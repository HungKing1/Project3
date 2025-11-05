package org.example.project3.request.profileCandidate;

import lombok.Data;

@Data
public class DesiredJobRequest {
    private Long id;
    private String jobTitle;
    private Long workTypeId;
    private Long jobLevelId;
    private Long experienceId;
    private Long cityId;
    private Long industryId;
    private Long expectedSalaryId;
    private Long districtId;
}
