package org.example.project3.request.profileCandidate;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LanguageCertificateRequest {
    private Long id; // lang_cer_id
    private String name; // Tên chứng chỉ (VD: IELTS, TOPIK)
    private String issuingOrganization; // Đơn vị cấp (issuing_organization)
    private String result; // Kết quả (result)
    private LocalDate startDate; // time_start
    private LocalDate endDate; // time_end
}