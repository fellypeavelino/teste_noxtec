/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.teste.noxtec.noxtec.repositories;

import com.teste.noxtec.noxtec.entities.Contato;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    Optional<Contato> findByCelular(String celular);
    List<Contato> findAllByOrderByIdDesc();
    List<Contato> findAllByOrderByDhCadDesc();
    @Query("SELECT c FROM Contato c")
    Page<Contato> findPage(Pageable pageable);
    @Query("SELECT c FROM Contato c WHERE " +
            "LOWER(c.nome) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(c.email) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "c.celular LIKE %:term% OR " +
            "c.telefone LIKE %:term%")
    Page<Contato> findPageByFiltro(@Param("term") String term, Pageable pageable);

}
