/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.teste.noxtec.noxtec.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author Usuario
 */
public class TokenLoggingFilter extends OncePerRequestFilter {
        @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            // Extrai o cabeçalho Authorization
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Remove o prefixo "Bearer "
            System.out.println("Token recebido: " + token);
        } else {
            // Retorna 401 caso o token não exista ou seja inválido
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não fornecido ou inválido");
            return;
        }

        // Prossegue com o próximo filtro
        filterChain.doFilter(request, response);
    }
}
