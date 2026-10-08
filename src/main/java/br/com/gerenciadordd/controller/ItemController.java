package br.com.gerenciadordd.controller;

// Recebe requisicoes de itens

import br.com.gerenciadordd.model.Item;
import br.com.gerenciadordd.service.ItemService;
import br.com.gerenciadordd.service.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personagens/{personagemId}/itens")
@CrossOrigin
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> listar(@PathVariable int personagemId) throws ServiceException {
        return service.listarPorPersonagem(personagemId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void adicionar(@PathVariable int personagemId, @RequestBody ItemRequest request) throws ServiceException {
        service.adicionarItemPadrao(request.nome(), personagemId);
    }

    public record ItemRequest(String nome) {}
}
