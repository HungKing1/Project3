package org.example.project3.service.chat;

import lombok.RequiredArgsConstructor;
import org.example.project3.dto.ChatMessageDTO;
import org.example.project3.dto.PythonResponse;
import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.candidate.Message;
import org.example.project3.repository.candidate.CandidateRepository;
import org.example.project3.repository.candidate.MessageRepository;
import org.example.project3.response.ApiResponse;
import org.example.project3.util.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ChatService implements IChatService{
    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${app.ai-service.url}")
    private String pythonApiUrl;

    private final CandidateRepository candidateRepository;
    private final MessageRepository messageRepository;

    @Override
    public ResponseEntity<ApiResponse> getChatHistory() {
        try {
            // Lấy email từ JWT
            String email = JwtUtil.getUserEmail();
            if (email == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Không thể xác thực người dùng", null)
                );
            }

            // Tìm candidate
            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Candidate không tồn tại"));

            // Lấy chat history
            List<Message> messages = messageRepository.findByCandidateOrderByCreatedAtAsc(candidate);

            // Convert về DTO
            List<ChatMessageDTO> result = messages.stream()
                    .map(m -> new ChatMessageDTO(
                            m.getId(),
                            m.getSenderType().name(),
                            m.getMessage(),
                            m.getCreatedAt()
                    ))
                    .toList();

            return ResponseEntity.ok(
                    new ApiResponse(true, "Lấy lịch sử chat thành công", result)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(false, "Lỗi khi lấy lịch sử chat", e.getMessage())
            );
        }
    }

    @Override
    public ResponseEntity<ApiResponse> sendMessage(String userMessage) {
        try {

            /* ---------------------------------------------------------
             * 1. VALIDATION MESSAGE
             * --------------------------------------------------------- */
            if (userMessage == null || userMessage.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(false, "Tin nhắn rỗng, không thể gửi đến AI", null)
                );
            }

            /* ---------------------------------------------------------
             * 2. LẤY EMAIL USER TỪ JWT
             * --------------------------------------------------------- */
            String email = JwtUtil.getUserEmail();
            if (email == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Không xác thực được người dùng", null)
                );
            }

            /* ---------------------------------------------------------
             * 3. GỌI PYTHON API
             * --------------------------------------------------------- */
            Map<String, String> request = new HashMap<>();
            request.put("text", userMessage);

            Map<String, Object> responseMap = restTemplate.postForObject(pythonApiUrl, request, Map.class);

            // Case: Python trả null hoặc lỗi
            if (responseMap == null) {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(
                        new ApiResponse(false, "Không nhận được phản hồi từ AI service", "/search")
                );
            }

            /* ---------------------------------------------------------
             * 4. ĐỌC DỮ LIỆU FILTERS TỪ PYTHON
             * --------------------------------------------------------- */
            Map<String, Object> filters = (Map<String, Object>) responseMap.get("filters");

            if (filters == null) {
                return ResponseEntity.ok(new ApiResponse(false, "AI service không trả về filters", "/search"));
            }

            PythonResponse response = extractPythonResponse(filters);

            /* ---------------------------------------------------------
             * 5. TẠO URL TỪ FILTERS
             * --------------------------------------------------------- */
            String url = buildSearchUrl(response);

            /* ---------------------------------------------------------
             * 6. LƯU MESSAGE USER & BOT
             * --------------------------------------------------------- */
            Candidate candidate = candidateRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Candidate không tồn tại"));

            Message msgBotReply = saveChatHistory(candidate, userMessage, url);

            /* ---------------------------------------------------------
             * 7. RESPONSE
             * --------------------------------------------------------- */
            return ResponseEntity.ok(
                    new ApiResponse(true, "Lọc bằng RAG thành công", msgBotReply)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(false, "Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại", e.getMessage())
            );
        }
    }

    /* ================================================================
       HÀM TÁCH RIÊNG CHO DỮ LIỆU PYTHON
       ================================================================ */
    private PythonResponse extractPythonResponse(Map<String, Object> filters) {
        PythonResponse response = new PythonResponse();

        response.setCity(getLong(filters.get("city")));
        response.setDistrict(getLong(filters.get("district")));
        response.setSalary(getLong(filters.get("salary")));
        response.setJob_level(getLong(filters.get("job_level")));
        response.setWork_type(getLong(filters.get("work_type")));
        response.setExp(getLong(filters.get("exp")));

        return response;
    }

    private Long getLong(Object value) {
        return value != null ? ((Number) value).longValue() : null;
    }

    /* ================================================================
       HÀM BUILD URL
       ================================================================ */
    private String buildSearchUrl(PythonResponse r) {
        return String.format(
                "tim-viec-lam?city=%s&district=%s&exp=%s&salary=%s&job_level=%s&work_type=%s",
                safeNull(r.getCity()),
                safeNull(r.getDistrict()),
                safeNull(r.getExp()),
                safeNull(r.getSalary()),
                safeNull(r.getJob_level()),
                safeNull(r.getWork_type())
        );
    }

    private String safeNull(Long value) {
        return value != null ? value.toString() : "";
    }

    /* ================================================================
       LƯU LỊCH SỬ CHAT
       ================================================================ */
    private Message saveChatHistory(Candidate candidate, String userMessage, String botReply) {
        LocalDateTime now = LocalDateTime.now();

        Message msgUser = Message.builder()
                .candidate(candidate)
                .senderType(Message.SenderType.USER)
                .message(userMessage)
                .createdAt(now)
                .build();

        messageRepository.save(msgUser);

        Message msgBot = Message.builder()
                .candidate(candidate)
                .senderType(Message.SenderType.BOT)
                .message(botReply)
                .createdAt(now)
                .build();

        messageRepository.save(msgBot);

        return msgBot;
    }
}
