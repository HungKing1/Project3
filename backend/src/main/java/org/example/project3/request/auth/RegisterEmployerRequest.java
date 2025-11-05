package org.example.project3.request.auth;

import lombok.Data;

@Data
public class RegisterEmployerRequest {
    private String email;
    private String phone;
    private String password;
    private String companyName;
    private String address;
    private String companyDescription;
}
