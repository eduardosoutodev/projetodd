package br.com.gerenciadordd.controller;

// Recebe requisicoes de campanhas

import br.com.gerenciadordd.model.Campanha;
import br.com.gerenciadordd.service.CampanhaService;
import br.com.gerenciadordd.service.ServiceException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/campanhas")
public class CampanhaController {
    private final CampanhaService service;

    public CampanhaController(CampanhaService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Campanha>> listar() throws ServiceException {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<Void> criar(@RequestBody Campanha campanha) throws ServiceException {
        service.criar(campanha.getNome(), campanha.getDescricao(), campanha.getMestre());
        return ResponseEntity.ok().build();
    }
}
