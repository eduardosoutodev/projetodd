# GerenciadorDD Web - Etapa 9

Projeto Web do GerenciadorDD desenvolvido com Spring Boot, Maven, Spring Web, JDBC e MySQL.

## Base do projeto
- Código Java: Etapa 7
- Front-end: Etapa 8
- Banco de dados: database.sql
- Java: 21

## Tecnologias
- Spring Boot
- Spring Web
- Spring JDBC
- MySQL
- Maven
- HTML, CSS e JavaScript

## Executar
1. Crie o banco usando `database.sql`.
2. Ajuste `DB_URL`, `DB_USER` e `DB_PASSWORD` se necessário.
3. Execute: `mvn spring-boot:run`
4. Abra: `http://localhost:8080/login.html

Comandos que utilizei para iniciar spring-boot
cd /home/carlos/Documentos/Senac/UC15-B/Etapa9/GerenciadorDD-campanhas-bestiario/GerenciadorDD-campanhas-bestiario

JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 /snap/netbeans/149/netbeans/java/maven/bin/mvn --no-transfer-progress spring-boot:run

## API inicial
- GET /api/criaturas
- GET /api/campanhas
- POST /api/campanhas
- GET /api/personagens
- GET /api/personagens/{id}
- POST /api/personagens
- PUT /api/personagens/{id}/notas
- GET /api/personagens/{id}/itens
- POST /api/personagens/{id}/itens
- DELETE /api/itens/{id}
- GET /api/dashboard
