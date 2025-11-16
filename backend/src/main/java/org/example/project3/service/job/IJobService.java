package org.example.project3.service.job;

import org.example.project3.request.job.GetJobRequest;
import org.example.project3.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface IJobService {
    ResponseEntity<ApiResponse> getJobs(int page, int pageSize);
    ResponseEntity<ApiResponse> getJobById(Long id);
    ResponseEntity<ApiResponse> searchJobs(Long city_id, Long district_id, Long job_level_id, Long exp_id, Long salary_id, Long work_type_id, int page, int pageSize);
}
