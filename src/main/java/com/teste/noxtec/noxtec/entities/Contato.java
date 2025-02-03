/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.Data;

/**
 *
 * @author Usuario
 */
@Entity
@Table(name = "contato")
@Data
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contato_id")
    private Long id;
    @Column(name = "contato_nome", nullable = false)
    @NotNull
    @Size(min = 1, max = 100)
    private String nome;
    @Column(name = "contato_email", nullable = false)
    @NotNull
    @Email
    private String email;
    @Column(name = "contato_celular", nullable = false)
    @NotNull
    @Size(min = 10, max = 15)
    private String celular;
    @Column(name = "contato_telefone")
    @Size(max = 15)
    private String telefone;
    @Column(name = "contato_sn_favorito")
    private char snFavorito;
    @Column(name = "contato_sn_ativo")
    private char snAtivo;
    @Column(name = "contato_dh_cad", nullable = false)
    private LocalDateTime dhCad;
    @Column(name = "contato_dh_alt")
    private LocalDateTime dhAlt;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @PrePersist
    protected void onCreate() {
        dhCad = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        dhAlt = LocalDateTime.now();
    }
}
