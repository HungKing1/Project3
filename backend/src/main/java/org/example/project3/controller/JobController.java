package org.example.project3.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.project3.request.job.GetJobRequest;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.job.IJobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class JobController {
    private final IJobService jobService;

    @GetMapping("/get-jobs")
    public ResponseEntity<ApiResponse> getJobs(@RequestParam int page,
                                               @RequestParam int pageSize,
                                               HttpServletResponse response) {
        return jobService.getJobs(page, pageSize);
    }

    @GetMapping("/get-job-detail/{id}")
    public ResponseEntity<ApiResponse> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

        @GetMapping("/search-jobs")
    public ResponseEntity<ApiResponse> searchJobs(@RequestParam(name = "city", defaultValue = "0") Long city_id,
                                                  @RequestParam(name = "district", defaultValue = "0") Long district_id,
                                                  @RequestParam(name = "exp", defaultValue = "0") Long exp_id,
                                                  @RequestParam(name = "salary", defaultValue = "0") Long salary_id,
                                                  @RequestParam(name = "job_level", defaultValue = "0") Long job_level_id,
                                                  @RequestParam(name = "work_type_id", defaultValue = "0") Long work_type_id,
                                                  @RequestParam int page,
                                                  @RequestParam int pageSize) {
        return jobService.searchJobs(city_id, district_id, job_level_id, exp_id, salary_id, work_type_id, page, pageSize);
    }
}
