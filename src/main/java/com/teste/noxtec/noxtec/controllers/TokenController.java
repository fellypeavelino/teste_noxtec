/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.controllers;

import com.teste.noxtec.noxtec.dtos.TokenDTO;
import com.teste.noxtec.noxtec.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
@RequestMapping("/token")
public class TokenController {
    @Autowired
    private JwtUtil jwtUtil;
    
    @GetMapping
    public ResponseEntity<TokenDTO> gerarToken() {
        TokenDTO t = new TokenDTO();
        t.setSub(jwtUtil.generateToken("noxtec"));
        return ResponseEntity.ok(t);
    }
}
