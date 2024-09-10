package com.example.demo.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // /api/** 경로에 대해 CORS 허용
                .allowedOrigins("http://localhost:3000")  // 허용할 출처 지정
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // 허용할 메서드
                .allowedHeaders("*")  // 모든 헤더 허용
                .allowCredentials(true);  // 자격 증명 허용
    }
}