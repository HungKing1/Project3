package org.example.project3.request.profileCandidate;

import lombok.Data;

@Data
public class DesiredJobRequest {
    private String jobTitle;
    private Long cityId;
    private Long districtId;
    private Long expectedSalaryId;
    private Long industryId;
    private Long wardId;
    private Long workTypeId;
    private Long jobLevelId;
}
