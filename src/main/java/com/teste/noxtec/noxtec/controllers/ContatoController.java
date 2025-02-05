/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.controllers;

import com.teste.noxtec.noxtec.dtos.ContatoDTO;
import com.teste.noxtec.noxtec.dtos.ContatosPaginadosDTO;
import com.teste.noxtec.noxtec.dtos.RequestPageDTO;
import com.teste.noxtec.noxtec.entities.Contato;
import com.teste.noxtec.noxtec.services.ContatoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @GetMapping("/paginar/{page}/{size}")
    public ResponseEntity<Page<ContatoDTO>> getContatosPaginados(@PathVariable int page, @PathVariable int size) {
        Page<ContatoDTO> listaPaginada = null;
        try {
            listaPaginada = service.getContatosPaginados(page, size);
        } catch (Exception e) {
            return new ResponseEntity<>(listaPaginada, HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(listaPaginada);
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
    
    @GetMapping("paginacao")
    public Page<Contato> getContatosPaginadosEOrdenados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dhCad") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return service.getContatosPaginadosEOrdenados(page, size, sortBy, sortDir);
    }
    
    @PostMapping("/paginacao")
    public ContatosPaginadosDTO getContatosPaginadosEOrdenadosPorQuery(@Valid @RequestBody RequestPageDTO dto) {
        return service.getContatosPaginadosEOrdenadosPorQuery(dto);
    }
}
