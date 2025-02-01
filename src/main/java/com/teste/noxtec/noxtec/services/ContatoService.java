/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.services;

import com.teste.noxtec.noxtec.dtos.ContatoDTO;
import com.teste.noxtec.noxtec.entities.Contato;
import com.teste.noxtec.noxtec.repositories.ContatoRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class ContatoService {
    @Autowired
    private ContatoRepository repository;

    public List<Contato> listarContatos() {
        return repository.findAll();
    }

    public List<ContatoDTO> listarContatosDto() {
        List<Contato> contatos = repository.findAll();
        List<ContatoDTO> contatosDto = new ArrayList<>();
        contatos.forEach(contato -> {
            ContatoDTO contatoDto = new ModelMapper().map(contato, ContatoDTO.class);
            contatosDto.add(contatoDto);
        });
        return contatosDto;
    }
    
    public Optional<Contato> buscarPorCelular(String celular) {
        return repository.findByCelular(celular);
    }

    public ContatoDTO buscarPorCelularDTO(String celular) {
        Optional<Contato> optional = this.buscarPorCelular(celular);
        Contato contato = new Contato();
        if(optional.isPresent()){
            contato = optional.get();
        }
        return new ModelMapper().map(contato, ContatoDTO.class);
    }
    
    public Contato salvarContato(Contato contato) {
        return repository.save(contato);
    }
    
    public ContatoDTO salvarContatoDto(ContatoDTO contatoDto) {
        Contato contato = new ModelMapper().map(contatoDto, Contato.class);
        contato = this.salvarContato(contato);
        contatoDto = new ModelMapper().map(contato, ContatoDTO.class);
        return contatoDto;
    }
    
    public ContatoDTO alterarDto(Long id, ContatoDTO contatoDto) {
        repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        return this.salvarContatoDto(contatoDto);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    public ContatoDTO pesquisar(Long id) {
        Contato contato = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        return new ModelMapper().map(contato, ContatoDTO.class);
    }
}
