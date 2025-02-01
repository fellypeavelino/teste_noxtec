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
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    private Long id;
    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "celular", nullable = false)
    private String celular;
    private String telefone;
    private char snFavorito;
    private char snAtivo;
    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dhCad;
    @Column(name = "data_alteracao")
    private LocalDateTime dhAlt;
    
    @PrePersist
    protected void onCreate() {
        dhCad = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        dhAlt = LocalDateTime.now();
    }
}
