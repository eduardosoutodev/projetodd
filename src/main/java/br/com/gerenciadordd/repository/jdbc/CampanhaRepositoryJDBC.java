package br.com.gerenciadordd.repository.jdbc;

// Acessa campanhas usando JDBC

import br.com.gerenciadordd.model.Campanha;
import br.com.gerenciadordd.repository.CampanhaRepository;
import br.com.gerenciadordd.repository.RepositoryException;
import br.com.gerenciadordd.util.Conexao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/*
 * Implementação do CampanhaRepository usando JDBC.
 * Converte os dados do banco em objetos Campanha
 * e os salva no banco de dados.
 */
public class CampanhaRepositoryJDBC implements CampanhaRepository {

    @Override
    public List<Campanha> listar() throws RepositoryException {
        List<Campanha> lista = new ArrayList<>();
        String sql = "SELECT * FROM campanhas ORDER BY id DESC";
        try (Connection conn = Conexao.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(mapear(rs));
            }
        } catch (SQLException e) {
            throw new RepositoryException("Erro ao listar campanhas", e);
        }
        return lista;
    }

    @Override
    public void inserir(Campanha campanha) throws RepositoryException {
        String sql = "INSERT INTO campanhas (nome, descricao, mestre) VALUES (?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, campanha.getNome());
            stmt.setString(2, campanha.getDescricao());
            stmt.setString(3, campanha.getMestre());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RepositoryException("Erro ao inserir campanha", e);
        }
    }

    private Campanha mapear(ResultSet rs) throws SQLException {
        Campanha c = new Campanha();
        c.setId(rs.getInt("id"));
        c.setNome(rs.getString("nome"));
        c.setDescricao(rs.getString("descricao"));
        c.setMestre(rs.getString("mestre"));
        return c;
    }
}
