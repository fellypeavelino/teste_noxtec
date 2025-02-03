/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.services;

import com.teste.noxtec.noxtec.dtos.UsuarioDTO;
import com.teste.noxtec.noxtec.entities.Usuario;
import com.teste.noxtec.noxtec.repositories.UsuarioRepository;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Optional<Usuario> encontrarPorLoguinESenha(String loguin, String senha) {
        return usuarioRepository.findByLoguinAndSenha(loguin, senha);
    }
    
    public UsuarioDTO encontrarPorLoguinESenhaDTO(UsuarioDTO dto) {
        Optional<Usuario> op = this.encontrarPorLoguinESenha(dto.getLoguin(), dto.getSenha());
        if (op.isPresent()) {
            dto = convertToDto(op.get());
        }
        return dto;
    }
    
    private UsuarioDTO convertToDto(Usuario usuario) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(usuario, UsuarioDTO.class);
    }

    private Usuario convertToEntity(UsuarioDTO usuarioDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(usuarioDto, Usuario.class);
    }
}
