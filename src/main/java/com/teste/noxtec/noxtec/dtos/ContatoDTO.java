/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.dtos;

import com.teste.noxtec.noxtec.entities.Contato;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Data;

/**
 *
 * @author Usuario
 */
@Data
public class ContatoDTO {
    private Long id;
    @NotNull(message = "O campo 'nome' não pode ser nulo.")
    private String nome;
    @NotNull(message = "O campo 'email' não pode ser nulo.")
    private String email;
    @NotNull(message = "O campo 'celular' não pode ser nulo.")
    private String celular;
    private String telefone;
    private char snFavorito;
    private char snAtivo;
    private Long usuario_id;
    private LocalDateTime dhCad;
    private LocalDateTime dhAlt;
    
    public ContatoDTO(){}
    // Construtor que converte de Contato para ContatoDTO
    public ContatoDTO(Contato contato) {
        this.id = contato.getId();
        this.nome = contato.getNome();
        this.email = contato.getEmail();
        this.celular = contato.getCelular();
        this.telefone = contato.getTelefone();
        this.snFavorito = contato.getSnFavorito();
        this.snAtivo = contato.getSnAtivo();
        this.usuario_id = contato.getUsuario().getId();
        this.dhCad = contato.getDhCad();
        this.dhAlt = contato.getDhAlt();
    }
}
