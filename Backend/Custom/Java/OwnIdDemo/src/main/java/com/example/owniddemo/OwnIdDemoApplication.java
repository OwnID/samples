package com.example.owniddemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@SpringBootApplication
@RestController
public class OwnIdDemoApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(OwnIdDemoApplication.class);
        app.setDefaultProperties(Collections
                .singletonMap("server.port", "3002"));
        app.run(args);
    }
}
