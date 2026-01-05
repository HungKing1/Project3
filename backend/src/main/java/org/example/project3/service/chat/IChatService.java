package org.example.project3.service.chat;

import org.example.project3.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface IChatService {
    ResponseEntity<ApiResponse> getChatHistory();
    ResponseEntity<ApiResponse> sendMessage(String userMessage);
}
