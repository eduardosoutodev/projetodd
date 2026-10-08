package br.com.gerenciadordd.service;

// Trata erros da camada de servico

/*
 * Exceção usada pela camada de serviço para representar
 * erros de validação e problemas ao acessar o banco de dados.
 *
 * Dessa forma, a interface trata apenas ServiceException,
 * deixando o código mais simples e organizado.
 */
public class ServiceException extends Exception {
    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
