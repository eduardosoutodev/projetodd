package br.com.gerenciadordd.repository;

// Define operacoes de criaturas

import br.com.gerenciadordd.model.Criatura;
import java.util.List;

public interface CriaturaRepository {
    List<Criatura> listar() throws RepositoryException;
    void inserir(Criatura criatura) throws RepositoryException;
}
