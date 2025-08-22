package com.maro.project.stockanalyzer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        // 기본 경로 접근 시 로그인 페이지로 리다이렉트
        return "redirect:/login.html";
    }
}