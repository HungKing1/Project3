package org.example.project3.request.auth;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterCandidateRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 11, message = "Số điện thoại phải có từ 10 đến 11 chữ số")
    private String phone;

    @NotBlank(message = "Tên không được để trống")
    private String name;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
            message = "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 chữ số"
    )
    private String password;

    private  String careerGoal;

    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate birthday;

    @NotBlank(message = "Kinh nghiệm không được để trống")
    private Long experienceYearId;

    @NotBlank(message = "Cấp bậc công việc không được để trống")
    private Long jobLevelId;

    @NotBlank(message = "Hình thức làm việc không được để trống")
    private Long workTypeId;

    @NotBlank(message = "Giới tính không được để trống")
    private Integer gender;

    @NotBlank(message = "Ngành nghề không được để trống")
    private Long industryId;

    @NotBlank(message = "Mức lương mong muốn không được để trống")
    private Long salaryId;

    @NotBlank(message = "Thành phố không được để trống")
    private Long cityId;

    @NotBlank(message = "Quận/Huyện không được để trống")
    private Long districtId;

    @NotBlank(message = "Phường/Xã không được để trống")
    private Long wardId;
}
