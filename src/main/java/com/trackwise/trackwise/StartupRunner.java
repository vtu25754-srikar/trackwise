package com.trackwise.trackwise;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {

    @Override
    public void run(String... args) {
        System.out.println("==========================================");
        System.out.println("🚀 Application Started Successfully!");
        System.out.println("🌐 Open Frontend: http://localhost:9090/index.html");
        System.out.println("🌐 Open Frontend: http://localhost:9090/login.html");
        System.out.println("🌐 Open Frontend: http://localhost:9090/register.html");
    }
}
