/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec;

import com.teste.noxtec.noxtec.dtos.ContatoDTO;
import com.teste.noxtec.noxtec.entities.Contato;
import com.teste.noxtec.noxtec.entities.Usuario;
import com.teste.noxtec.noxtec.repositories.ContatoRepository;
import com.teste.noxtec.noxtec.repositories.UsuarioRepository;
import com.teste.noxtec.noxtec.services.ContatoService;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 *
 * @author Usuario
 */
@ExtendWith(MockitoExtension.class)
public class ContatoServiceTest {
    @Mock
    private ContatoRepository repository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private ContatoService contatoService;

    private Contato contato;
    private ContatoDTO contatoDTO;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1L);

        contato = new Contato();
        contato.setId(1L);
        contato.setCelular("999999999");
        contato.setUsuario(usuario);

        contatoDTO = new ContatoDTO();
        contatoDTO.setId(1L);
        contatoDTO.setCelular("999999999");
        contatoDTO.setUsuario_id(1L);
    }

    @Test
    void testListarContatos() {
        when(repository.findAll()).thenReturn(List.of(contato));
        List<Contato> resultado = contatoService.listarContatos();
        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.size());
    }

    @Test
    void testListarContatosDto() {
        when(repository.findAll()).thenReturn(List.of(contato));
        List<ContatoDTO> resultado = contatoService.listarContatosDto();
        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.size());
    }

    @Test
    void testBuscarPorCelular_Sucesso() {
        when(repository.findByCelular("999999999")).thenReturn(Optional.of(contato));
        Optional<Contato> resultado = contatoService.buscarPorCelular("999999999");
        assertTrue(resultado.isPresent());
    }

    @Test
    void testBuscarPorCelular_Falha() {
        when(repository.findByCelular("888888888")).thenReturn(Optional.empty());
        Optional<Contato> resultado = contatoService.buscarPorCelular("888888888");
        assertFalse(resultado.isPresent());
    }

    @Test
    void testSalvarContato_Sucesso() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(repository.save(any(Contato.class))).thenReturn(contato);
        Contato resultado = contatoService.salvarContato(contato, 1L);
        assertNotNull(resultado);
        assertEquals("999999999", resultado.getCelular());
    }

    @Test
    void testSalvarContato_Falha_UsuarioNaoEncontrado() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.empty());
        Exception exception = assertThrows(RuntimeException.class, () -> 
            contatoService.salvarContato(contato, 1L));
        assertEquals("Usuário não encontrado", exception.getMessage());
    }

    @Test
    void testExcluir() {
        doNothing().when(repository).deleteById(1L);
        contatoService.excluir(1L);
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testPesquisar_Sucesso() {
        when(repository.findById(1L)).thenReturn(Optional.of(contato));
        ContatoDTO resultado = contatoService.pesquisar(1L);
        assertNotNull(resultado);
        assertEquals("999999999", resultado.getCelular());
    }

    @Test
    void testPesquisar_Falha() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        Exception exception = assertThrows(RuntimeException.class, () -> 
            contatoService.pesquisar(1L));
        assertEquals("Contato não encontrado", exception.getMessage());
    }
}
