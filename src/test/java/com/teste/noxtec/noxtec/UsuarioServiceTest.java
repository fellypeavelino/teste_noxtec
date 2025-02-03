package com.teste.noxtec.noxtec;

import com.teste.noxtec.noxtec.dtos.UsuarioDTO;
import com.teste.noxtec.noxtec.entities.Usuario;
import com.teste.noxtec.noxtec.repositories.UsuarioRepository;
import com.teste.noxtec.noxtec.services.UsuarioService;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;
    
    @InjectMocks
    private UsuarioService usuarioService;
    
    private Usuario usuario;
    private UsuarioDTO usuarioDTO;
    
    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setLoguin("usuario_teste");
        usuario.setSenha("senha_teste");
        
        usuarioDTO = new UsuarioDTO();
        usuarioDTO.setLoguin("usuario_teste");
        usuarioDTO.setSenha("senha_teste");
    }
    
    @Test
    void testEncontrarPorLoguinESenha_Sucesso() {
        when(usuarioRepository.findByLoguinAndSenha("usuario_teste", "senha_teste"))
            .thenReturn(Optional.of(usuario));
        
        Optional<Usuario> resultado = usuarioService.encontrarPorLoguinESenha("usuario_teste", "senha_teste");
        
        assertTrue(resultado.isPresent());
        assertEquals("usuario_teste", resultado.get().getLoguin());
    }
    
    @Test
    void testEncontrarPorLoguinESenha_Falha() {
        when(usuarioRepository.findByLoguinAndSenha("usuario_teste", "senha_errada"))
            .thenReturn(Optional.empty());
        
        Optional<Usuario> resultado = usuarioService.encontrarPorLoguinESenha("usuario_teste", "senha_errada");
        
        assertFalse(resultado.isPresent());
    }
    
    @Test
    void testEncontrarPorLoguinESenhaDTO_Sucesso() {
        when(usuarioRepository.findByLoguinAndSenha("usuario_teste", "senha_teste"))
            .thenReturn(Optional.of(usuario));
        
        UsuarioDTO resultado = usuarioService.encontrarPorLoguinESenhaDTO(usuarioDTO);
        
        assertNotNull(resultado);
        assertEquals("usuario_teste", resultado.getLoguin());
    }
    
    @Test
    void testEncontrarPorLoguinESenhaDTO_Falha() {
        when(usuarioRepository.findByLoguinAndSenha("usuario_teste", "senha_errada"))
            .thenReturn(Optional.empty());
        
        usuarioDTO.setSenha("senha_errada");
        UsuarioDTO resultado = usuarioService.encontrarPorLoguinESenhaDTO(usuarioDTO);
        
        assertNotNull(resultado);
        assertEquals("usuario_teste", resultado.getLoguin());
        assertEquals("senha_errada", resultado.getSenha());
    }
}