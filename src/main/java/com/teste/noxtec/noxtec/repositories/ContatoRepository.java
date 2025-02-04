/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.teste.noxtec.noxtec.repositories;

import com.teste.noxtec.noxtec.entities.Contato;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Usuario
 */
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    Optional<Contato> findByCelular(String celular);
    List<Contato> findAllByOrderByIdDesc();
    List<Contato> findAllByOrderByDhCadDesc();
}
