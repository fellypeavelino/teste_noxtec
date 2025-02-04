import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contato } from '../models/contato.model';
import { firstValueFrom, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ContatoService {
  private apiUrl = '/api/contatos'; 
  public contato: Contato | null = null;
  public token!: string;
  public usuarioLoguin: any;

  constructor(private http: HttpClient) {}

  async getToken(): Promise<any> {
    return await firstValueFrom (this.http.get<any>("/api/token")).then(data => data.sub);
  }

  private async getHeaders(): Promise<any> {
    let token = (this.token) ? this.token : localStorage.getItem("token");
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

  async getPagination(): Promise<any> {
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

  getUsuarioLoguin(): any | null {
    if (this.usuarioLoguin) {
      return this.usuarioLoguin;
    }
    const usuarioLoguin = localStorage.getItem("usuarioLoguin");
    return usuarioLoguin ? JSON.parse(usuarioLoguin) as any : null;
  }
}