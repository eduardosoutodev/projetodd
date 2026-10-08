package br.com.gerenciadordd.controller;

// Recebe requisicoes de personagens

import br.com.gerenciadordd.model.Personagem;
import br.com.gerenciadordd.service.PersonagemService;
import br.com.gerenciadordd.service.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personagens")
@CrossOrigin
public class PersonagemController {

    private final PersonagemService service;

    public PersonagemController(PersonagemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Personagem> listar() throws ServiceException {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Personagem buscarPorId(@PathVariable int id) throws ServiceException {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Personagem criar(@RequestBody PersonagemRequest request) throws ServiceException {
        return service.criar(
                request.nome(),
                request.classe(),
                String.valueOf(request.nivel()),
                request.raca(),
                request.alinhamento(),
                String.valueOf(request.forca()),
                String.valueOf(request.destreza()),
                String.valueOf(request.constituicao()),
                String.valueOf(request.inteligencia()),
                String.valueOf(request.sabedoria()),
                String.valueOf(request.carisma()),
                String.valueOf(request.pvMax()),
                String.valueOf(request.ca()),
                request.campanhaId()
        );
    }

    @PutMapping("/{id}/notas")
    public Personagem atualizarNotas(@PathVariable int id, @RequestBody NotasRequest request) throws ServiceException {
        Personagem personagem = service.buscarPorId(id);
        service.atualizarNotas(personagem, request.notas());
        return personagem;
    }

    public record NotasRequest(String notas) {}

    public record PersonagemRequest(
            String nome,
            String classe,
            int nivel,
            String raca,
            String alinhamento,
            int forca,
            int destreza,
            int constituicao,
            int inteligencia,
            int sabedoria,
            int carisma,
            int pvMax,
            int pvAtual,
            int ca,
            String notas,
            Integer campanhaId
    ) {}
}
