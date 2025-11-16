package org.example.project3.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.project3.response.ApiResponse;
import org.example.project3.util.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = Optional.ofNullable(request.getCookies())
                .stream()
                .flatMap(Arrays::stream)
                .filter(c -> "access_token".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (token != null && jwtUtil.validateToken(token)) {
            String email = jwtUtil.extractEmail(token);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null, null);

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // Nếu không có Authentication
        if (SecurityContextHolder.getContext().getAuthentication() == null && !request.getRequestURI().startsWith("/auth") && !request.getRequestURI().startsWith("/public")) {

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            ApiResponse apiResponse = new ApiResponse(false, "Bạn chưa đăng nhập hoặc token không hợp lệ!", null);
            new ObjectMapper().writeValue(response.getOutputStream(), apiResponse);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
