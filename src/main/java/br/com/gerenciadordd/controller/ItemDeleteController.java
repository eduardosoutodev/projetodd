package br.com.gerenciadordd.controller;

// Remove itens do inventario

import br.com.gerenciadordd.service.ItemService;
import br.com.gerenciadordd.service.ServiceException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/itens")
@CrossOrigin
public class ItemDeleteController {

    private final ItemService service;

    public ItemDeleteController(ItemService service) {
        this.service = service;
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable int id) throws ServiceException {
        service.excluir(id);
    }
}
