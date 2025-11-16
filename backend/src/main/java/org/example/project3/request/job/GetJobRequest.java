package org.example.project3.request.job;

import lombok.Data;

@Data
public class GetJobRequest {
    private Integer page;
    private Integer pageSize;
}
