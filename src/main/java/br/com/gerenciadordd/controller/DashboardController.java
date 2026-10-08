package br.com.gerenciadordd.controller;

// Fornece dados para o painel

import br.com.gerenciadordd.service.CampanhaService;
import br.com.gerenciadordd.service.CriaturaService;
import br.com.gerenciadordd.service.PersonagemService;
import br.com.gerenciadordd.service.ServiceException;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final CampanhaService campanhas;
    private final PersonagemService personagens;
    private final CriaturaService criaturas;

    public DashboardController(CampanhaService campanhas, PersonagemService personagens, CriaturaService criaturas) {
        this.campanhas = campanhas;
        this.personagens = personagens;
        this.criaturas = criaturas;
    }

    @GetMapping
    public ResponseEntity<Map<String, Integer>> resumo() throws ServiceException {
        return ResponseEntity.ok(Map.of(
                "campanhas", campanhas.listar().size(),
                "personagens", personagens.listar().size(),
                "criaturas", criaturas.listar().size()
        ));
    }
}
