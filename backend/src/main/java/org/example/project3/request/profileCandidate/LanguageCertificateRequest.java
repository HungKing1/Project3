package org.example.project3.request.profileCandidate;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LanguageCertificateRequest {
    private Long id;
    private String name;
    private String result;
    private LocalDate timeStart;
    private LocalDate timeEnd;
    private String issuingOrganization;
}
