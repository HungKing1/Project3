package org.example.project3.request.profileCandidate;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PersonalInfoRequest {
    private String name;
    private String phone;
    private LocalDate birthday;
    private Integer gender;
    private Long cityId;
    private Long districtId;
    private Long wardId;
}
