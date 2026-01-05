package org.example.project3.controller;

import lombok.RequiredArgsConstructor;
import org.example.project3.request.chatbot.ChatRequest;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.chat.IChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final IChatService chatService;

    @GetMapping("/chat/history")
    private ResponseEntity<ApiResponse> getChat() {
        return chatService.getChatHistory();
    }

    @PostMapping("/chat/send")
    private ResponseEntity<ApiResponse> sendMessage(@RequestBody ChatRequest chatRequest) {
        return chatService.sendMessage(chatRequest.getMessage());
    }
}
