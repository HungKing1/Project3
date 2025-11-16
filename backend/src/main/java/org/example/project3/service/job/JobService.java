package org.example.project3.service.job;

import lombok.RequiredArgsConstructor;
import org.example.project3.entity.job.Job;
import org.example.project3.repository.job.JobRepository;
import org.example.project3.response.ApiResponse;
import org.example.project3.response.GetJobResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

@Service
@RequiredArgsConstructor
public class JobService implements IJobService{
    private final JobRepository jobRepository;

    @Override
    public ResponseEntity<ApiResponse> getJobs(int page, int pageSize) {
        try {
            // 1. Xử lý chỉ số trang (Page Index)
            // Spring Data bắt đầu từ trang 0, nhưng User thường nhập từ trang 1.
            // Nếu request.getPage() < 1 thì mặc định về 0.
            int pageIndex = page > 0 ? page - 1 : 0;

            // 2. Tạo đối tượng Pageable
            // Có thể thêm Sort để sắp xếp job mới nhất lên đầu (tùy chọn)
            Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by("createdAt").descending());

            // 3. Truy vấn Database
            // Kết quả trả về là Page<Job>, chứa cả danh sách job và thông tin phân trang (totalElements, totalPages...)
            Page<Job> jobPage = jobRepository.findAll(pageable);
            Page<GetJobResponse> responsePage = jobPage.map(GetJobResponse::new);
            // 4. Trả về phản hồi thành công
            // Giả sử ApiResponse có constructor (boolean success, String message, Object data)
            return ResponseEntity.ok(new ApiResponse(true, "Lấy danh sách công việc thành công", responsePage));

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(false, "Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại: " + e.getMessage(), null));
        }
    }

    @Override
    public ResponseEntity<ApiResponse> getJobById(Long id) {
        try {
            GetJobResponse convertedJob = jobRepository.findById(id)
                    .map(GetJobResponse::new)
                    .orElseThrow(() -> new Exception("Không tìm thấy job theo id"));
            return  ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponse(true, "Lấy job thành công", convertedJob)
            );
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(false, "Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại: " + e.getMessage(), null));
        }
    }

    @Override
    public ResponseEntity<ApiResponse> searchJobs(Long city_id, Long district_id, Long job_level_id, Long exp_id, Long salary_id, Long work_type_id, int page, int pageSize) {
        try {
            // 1. Xử lý phân trang
            int pageIndex = page > 0 ? page - 1 : 0;
            Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by("createdAt").descending());

            // 2. Xây dựng Specification (truy vấn động)
            Specification<Job> spec = (root, query, criteriaBuilder) -> {
                List<Predicate> predicates = new ArrayList<>();

                // --- SỬA LỖI TẠI ĐÂY ---
                // Ta chỉ lọc nếu ID không null VÀ lớn hơn 0

                // So sánh ID của City
                if (city_id != null && city_id > 0) {
                    predicates.add(criteriaBuilder.equal(root.get("city").get("id"), city_id));
                }

                // So sánh ID của District
                if (district_id != null && district_id > 0) {
                    predicates.add(criteriaBuilder.equal(root.get("district").get("id"), district_id));
                }

                // So sánh ID của JobLevel
                if (job_level_id != null && job_level_id > 0) {
                    predicates.add(criteriaBuilder.equal(root.get("jobLevel").get("id"), job_level_id));
                }

                // So sánh ID của ExperienceYear
                if (exp_id != null && exp_id > 0) {
                    predicates.add(criteriaBuilder.equal(root.get("experienceYear").get("id"), exp_id));
                }

                // So sánh ID của Salary
                if (salary_id != null && salary_id > 0) {
                    predicates.add(criteriaBuilder.equal(root.get("salary").get("id"), salary_id));
                }

                // So sánh ID của WorkType
                if (work_type_id != null && work_type_id > 0) {
                    predicates.add(criteriaBuilder.equal(root.get("workType").get("id"), work_type_id));
                }

                // Kết hợp tất cả các điều kiện (predicates) bằng mệnh đề AND
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            };

            // 3. Thực thi truy vấn với cả Specification và Pageable
            Page<Job> jobPage = jobRepository.findAll(spec, pageable);

            // 4. Ánh xạ kết quả sang DTO
            Page<GetJobResponse> responsePage = jobPage.map(GetJobResponse::new);

            // 5. Trả về kết quả
            return ResponseEntity.ok(new ApiResponse(true, "Tìm kiếm công việc thành công", responsePage));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(false, "Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại: " + e.getMessage(), null));
        }
    }
}
