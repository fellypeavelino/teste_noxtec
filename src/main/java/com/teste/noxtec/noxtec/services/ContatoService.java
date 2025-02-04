/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.services;

import com.teste.noxtec.noxtec.dtos.ContatoDTO;
import com.teste.noxtec.noxtec.dtos.RequestPageDTO;
import com.teste.noxtec.noxtec.entities.Contato;
import com.teste.noxtec.noxtec.entities.Usuario;
import com.teste.noxtec.noxtec.repositories.ContatoRepository;
import com.teste.noxtec.noxtec.repositories.UsuarioRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class ContatoService {
    
    @Autowired
    private ContatoRepository repository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<Contato> listarContatos() {
        return repository.findAll();
    }

    public List<ContatoDTO> listarContatosDto() {
        List<Contato> contatos = repository.findAllByOrderByDhCadDesc();
        List<ContatoDTO> listResult = new ArrayList<>();
        contatos.forEach(c -> {
            listResult.add(new ContatoDTO(c));
        });
        return listResult;
    }
    
    public Page<ContatoDTO> getContatosPaginados(int page, int size) {
        Page<Contato> contatosPage = repository.findAll(PageRequest.of(page, size));
        return contatosPage.map(contato -> this.convertToDto(contato));
    }
    
    public Optional<Contato> buscarPorCelular(String celular) {
        return repository.findByCelular(celular);
    }

    public ContatoDTO buscarPorCelularDTO(String celular) {
        return buscarPorCelular(celular)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

    public Contato salvarContato(Contato contato, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        contato.setUsuario(usuario);
        return repository.save(contato);
    }

    public ContatoDTO salvarContatoDto(ContatoDTO contatoDto) {
        Contato contato = convertToEntity(contatoDto);
        contato = salvarContato(contato, contatoDto.getUsuario_id());
        return convertToDto(contato);
    }

    public ContatoDTO alterarDto(Long id, ContatoDTO contatoDto) {
        repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        return salvarContatoDto(contatoDto);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    public ContatoDTO pesquisar(Long id) {
        Contato contato = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        return convertToDto(contato);
    }

    private ContatoDTO convertToDto(Contato contato) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(contato, ContatoDTO.class);
    }

    private Contato convertToEntity(ContatoDTO contatoDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(contatoDto, Contato.class);
    }
    
    public Page<Contato> getContatosPaginadosEOrdenados(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();;
        Pageable pageable = PageRequest.of(page, size, sort);
        return repository.findPage(pageable);
    }
    
    public Page<Contato> getContatosPaginadosEOrdenadosPorQuery(RequestPageDTO dto) {
        String sortBy = dto.getSortBy();
        String sortDir = dto.getSortDir();
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();;
        Pageable pageable = PageRequest.of(dto.getPage(), dto.getSize(), sort);
        if (dto.getFiltro() != null && !dto.getFiltro().equals("")) {
            return repository.findPageByFiltro(dto.getFiltro(), pageable);
        }
        return repository.findPage(pageable);
    }
}
