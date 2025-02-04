/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.dtos;

import java.util.List;
import lombok.Data;

/**
 *
 * @author Usuario
 */
@Data
public class ContatosPaginadosDTO {
    private List<ContatoDTO> contatosDto;
    private RequestPageDTO param;
    private Long total;
}
