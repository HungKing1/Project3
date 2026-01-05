package org.example.project3.service.cloudinary;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

public interface ICloudinaryService {
    Map uploadFile(MultipartFile file) throws IOException;
}
