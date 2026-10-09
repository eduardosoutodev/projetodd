# GerenciadorDD Web

Sistema web para gerenciar campanhas de D&D 5e, personagens, criaturas e itens.

## Tecnologias

- Java 21
- Spring Boot
- Spring Web
- Spring JDBC
- Maven
- MySQL
- HTML, CSS e JavaScript

## Requisitos

- Java 21 instalado
- MySQL instalado e em execução
- Maven instalado ou disponível pelo NetBeans

## Banco de dados

Execute o arquivo `database.sql` para criar as tabelas necessárias.

Atenção: o script pode apagar o banco existente antes de recriá-lo. Faça backup antes de executá-lo.

## Como executar

Na pasta principal do projeto, execute:

    mvn spring-boot:run

Depois, abra no navegador:

- Login: http://localhost:8080/login.html
- Painel: http://localhost:8080/dashboard.html

## Funcionalidades

- Cadastro e consulta de campanhas
- Cadastro e consulta de personagens
- Cadastro e consulta de criaturas
- Gerenciamento de itens dos personagens
- Atualização das notas dos personagens
- Painel com informações do sistema

## Evidências

A pasta `evidencias` contém capturas de tela, relatórios de testes, bugtracking e informações sobre o versionamento.


