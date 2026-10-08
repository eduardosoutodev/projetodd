package br.com.gerenciadordd.util;

// Abre conexao com o banco de dados

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/*
 * Responsável por abrir a conexão com o banco de dados.
 * As configurações da conexão são lidas do arquivo
 * db.properties, facilitando a troca de ambiente.
 */
public class Conexao {

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(
                    DBConfig.getUrl(), DBConfig.getUser(), DBConfig.getPassword());
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver MySQL não encontrado", e);
        }
    }
}
