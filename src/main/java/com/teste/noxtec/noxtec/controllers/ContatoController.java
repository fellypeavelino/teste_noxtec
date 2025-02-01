/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.controllers;

import com.teste.noxtec.noxtec.dtos.ContatoDTO;
import com.teste.noxtec.noxtec.entities.Contato;
import com.teste.noxtec.noxtec.services.ContatoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
@RequestMapping("/contatos")
public class ContatoController {
    @Autowired
    private ContatoService service;

    @GetMapping
    public List<ContatoDTO> listar() {
        return service.listarContatosDto();
    }

    @PostMapping
    public ResponseEntity<ContatoDTO> salvar(@RequestBody @Valid ContatoDTO contato) {
        ContatoDTO contatoDto = new ContatoDTO();
        try {
            contatoDto = service.salvarContatoDto(contato);
        } catch (Exception e) {
            return new ResponseEntity<>(contatoDto, HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(contatoDto);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ContatoDTO> alterar(@PathVariable Long id, @RequestBody @Valid ContatoDTO contato) {
        ContatoDTO contatoDto = new ContatoDTO();
        try {
            contatoDto = service.alterarDto(id, contato);
        } catch (Exception e) {
            return new ResponseEntity<>(contatoDto, HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(contatoDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContatoDTO> pesquisar(@PathVariable Long id) {
        ContatoDTO contatoDto = new ContatoDTO();
        try {
            contatoDto = service.pesquisar(id);
        } catch (Exception e) {
            return new ResponseEntity<>(contatoDto, HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(contatoDto);
    }
}
