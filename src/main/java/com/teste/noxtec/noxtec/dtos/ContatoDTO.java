/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.dtos;

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
}
