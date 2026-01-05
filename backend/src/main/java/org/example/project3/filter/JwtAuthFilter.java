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
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    public static final List<String> PUBLIC_URLS = List.of(
            "/auth/candidate/login",
            "/auth/candidate/register",
            "/auth/candidate/logout",
            "/auth/employer/login",
            "/auth/employer/register",
            "/auth/employer/logout",
            "/public/get-jobs",
            "/public/get-job-detail/*",
            "/public/*"
    );

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

        //có token
        if (token != null && jwtUtil.validateToken(token)) {
            String email = jwtUtil.extractEmail(token);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null, null);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        //không có token
        String requestURI = request.getRequestURI();
        if (isPublicUrl(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            ApiResponse apiResponse = new ApiResponse(false, "Bạn chưa đăng nhập hoặc token không hợp lệ!", null);
            new ObjectMapper().writeValue(response.getOutputStream(), apiResponse);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean isPublicUrl(String requestURI) {
        for (String pattern : PUBLIC_URLS) {
            // match() sẽ kiểm tra xem requestURI có khớp với mẫu pattern không
            if (pathMatcher.match(pattern, requestURI)) {
                return true;
            }
        }
        return false;
    }
}