package br.com.gerenciadordd;

// Configura o acesso ao banco

import br.com.gerenciadordd.util.DBConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;

@Configuration
public class DatabaseConfig {
    @Value("${spring.datasource.url:jdbc:mysql://localhost:3306/gerenciador_dd3_2?useSSL=false&serverTimezone=UTC}")
    private String url;

    @Value("${spring.datasource.username:root}")
    private String user;

    @Value("${spring.datasource.password:root}")
    private String password;

    @PostConstruct
    public void configure() {
        DBConfig.configure(url, user, password);
    }
}
