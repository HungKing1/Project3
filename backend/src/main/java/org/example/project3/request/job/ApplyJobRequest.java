package org.example.project3.request.job;

import lombok.Data;

@Data
public class ApplyJobRequest {
    private Long candidateId;
    private Long jobId;
}
