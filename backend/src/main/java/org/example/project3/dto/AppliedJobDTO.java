package org.example.project3.dto;

    import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class AppliedJobDTO {
    // Thông tin đơn ứng tuyển
    private Long applicationId;
    private String status;
    private LocalDateTime appliedAt;

    // Thông tin công việc tóm tắt
    private Long jobId;
    private String jobTitle;
    private String jobSalary;     // Ví dụ: "Thỏa thuận"
    private String jobWorkType;   // Ví dụ: "Toàn thời gian"

    // Thông tin địa điểm làm việc (Chỉ cần Tỉnh/TP là đủ cho list view)
    private String jobCity;

    // Thông tin nhà tuyển dụng
    private Long employerId;
    private String companyName;
    private String companyLogo;   // Avatar URL của công ty
}