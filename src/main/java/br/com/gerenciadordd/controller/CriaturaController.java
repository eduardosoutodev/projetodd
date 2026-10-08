package br.com.gerenciadordd.controller;

// Recebe requisicoes de criaturas

import br.com.gerenciadordd.model.Criatura;
import br.com.gerenciadordd.service.CriaturaService;
import br.com.gerenciadordd.service.ServiceException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/criaturas")
public class CriaturaController {
    private final CriaturaService service;

    public CriaturaController(CriaturaService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Criatura>> listar(@RequestParam(required = false) String busca) throws ServiceException {
        List<Criatura> todas = service.listar();
        return ResponseEntity.ok(service.filtrar(todas, busca));
    }

    @PostMapping
    public ResponseEntity<Void> criar(@RequestBody Criatura criatura) throws ServiceException {
        service.criar(criatura);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
