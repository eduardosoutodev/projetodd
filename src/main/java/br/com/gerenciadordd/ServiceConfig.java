package br.com.gerenciadordd;

// Configura os servicos da aplicacao

import br.com.gerenciadordd.repository.jdbc.CampanhaRepositoryJDBC;
import br.com.gerenciadordd.repository.jdbc.CriaturaRepositoryJDBC;
import br.com.gerenciadordd.repository.jdbc.ItemRepositoryJDBC;
import br.com.gerenciadordd.repository.jdbc.PersonagemRepositoryJDBC;
import br.com.gerenciadordd.service.CampanhaService;
import br.com.gerenciadordd.service.CriaturaService;
import br.com.gerenciadordd.service.ItemService;
import br.com.gerenciadordd.service.PersonagemService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {
    @Bean
    public CampanhaService campanhaService() {
        return new CampanhaService(new CampanhaRepositoryJDBC());
    }

    @Bean
    public CriaturaService criaturaService() {
        return new CriaturaService(new CriaturaRepositoryJDBC());
    }

    @Bean
    public ItemService itemService() {
        return new ItemService(new ItemRepositoryJDBC());
    }

    @Bean
    public PersonagemService personagemService() {
        return new PersonagemService(new PersonagemRepositoryJDBC());
    }
}
