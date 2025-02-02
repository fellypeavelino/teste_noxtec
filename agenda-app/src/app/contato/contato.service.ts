import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from './contato.model';
import { firstValueFrom  } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Isso garante que o serviço é registrado globalmente
})
export class ContatoService {
  private apiUrl = '/api/contatos'; // Ajuste conforme necessário
  
  constructor(private http: HttpClient) {}

  async getToken(): Promise<any> {
    return await firstValueFrom (this.http.get<any>("/api/token")).then(data => data.sub);
  }

  private async getHeaders(): Promise<any> {
    const token = await this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async getAll(): Promise<Contato[]> {
    const headers = await this.getHeaders();
    return await firstValueFrom (this.http.get<Contato[]>(this.apiUrl,{
      headers
    }));
  }

  async getById(id: number): Promise<Contato> {
    const headers = await this.getHeaders();
    return await firstValueFrom (this.http.get<Contato>(`${this.apiUrl}/${id}`,{
      headers
    }));
  }

  async create(contato: Contato): Promise<Contato> {
    const headers = await this.getHeaders();
    return await firstValueFrom (this.http.post<Contato>(this.apiUrl, contato,{
      headers
    }));
  }

  async update(id: number, contato: Contato): Promise<Contato> {
    const headers = await this.getHeaders();
    return await firstValueFrom (this.http.put<Contato>(`${this.apiUrl}/${id}`, contato,{
      headers
    }));
  }

  async delete(id: number): Promise<void> {
    const headers = await this.getHeaders();
    return await firstValueFrom (this.http.delete<void>(`${this.apiUrl}/${id}`,{
      headers
    }));
  }
}