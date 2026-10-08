package br.com.gerenciadordd.service;

// Aplica regras de negocio das criaturas

import br.com.gerenciadordd.model.Criatura;
import br.com.gerenciadordd.repository.CriaturaRepository;
import br.com.gerenciadordd.repository.RepositoryException;

import java.util.List;
import java.util.stream.Collectors;

public class CriaturaService {
    private final CriaturaRepository repository;

    public CriaturaService(CriaturaRepository repository) {
        this.repository = repository;
    }

    public List<Criatura> listar() throws ServiceException {
        try {
            return repository.listar();
        } catch (RepositoryException e) {
            throw new ServiceException("Não foi possível carregar as criaturas.", e);
        }
    }

    public List<Criatura> filtrar(List<Criatura> todas, String termoBusca) {
        if (termoBusca == null || termoBusca.trim().isEmpty()) {
            return todas;
        }
        String termo = termoBusca.toLowerCase().trim();
        return todas.stream()
                .filter(c -> (c.getNome() != null && c.getNome().toLowerCase().contains(termo))
                        || (c.getTipo() != null && c.getTipo().toLowerCase().contains(termo)))
                .collect(Collectors.toList());
    }

    public void criar(Criatura criatura) throws ServiceException {
        if (criatura == null || criatura.getNome() == null || criatura.getNome().trim().isEmpty()) {
            throw new ServiceException("O nome da criatura é obrigatório.");
        }
        criatura.setNome(criatura.getNome().trim());
        try {
            repository.inserir(criatura);
        } catch (RepositoryException e) {
            throw new ServiceException("Não foi possível salvar a criatura.", e);
        }
    }
}
