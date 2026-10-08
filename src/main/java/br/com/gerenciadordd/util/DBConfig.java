package br.com.gerenciadordd.util;

// Carrega as configuracoes do banco

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class DBConfig {
    private static final Properties props = new Properties();

    static {
        try (InputStream in = DBConfig.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (in != null) props.load(in);
        } catch (IOException e) {
            System.err.println("Aviso: não foi possível carregar db.properties: " + e.getMessage());
        }
    }

    public static void configure(String url, String user, String password) {
        props.setProperty("db.url", url);
        props.setProperty("db.user", user);
        props.setProperty("db.password", password);
    }

    public static String getUrl() {
        return props.getProperty("db.url", "jdbc:mysql://localhost:3306/gerenciador_dd3_2?useSSL=false&serverTimezone=UTC");
    }

    public static String getUser() {
        return props.getProperty("db.user", "root");
    }

    public static String getPassword() {
        return props.getProperty("db.password", "root");
    }
}
