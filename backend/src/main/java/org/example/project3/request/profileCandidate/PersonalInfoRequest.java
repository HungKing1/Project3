package org.example.project3.request.profileCandidate;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class PersonalInfoRequest {
    private String name;
    private String phone;
    private LocalDate birthday;
    private Integer gender;
    private Integer maritalStatus;
    private Long cityId;
    private Long districtId;
    private Long WardId;
    private String address;
    private MultipartFile avatarFile;
    private String avatarUrl;
}
