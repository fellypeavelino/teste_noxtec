import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contato } from '../models/contato.model';
import { firstValueFrom, Observable  } from 'rxjs';
import { ObjRequest } from '../../models/objRequest.model';

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
    return await firstValueFrom (this.http.get<Contato[]>(this.apiUrl));
  }

  async getPagination(param:ObjRequest): Promise<any> {
    return await firstValueFrom (this.http.post<any>(this.apiUrl+"/paginacao", param));
  }

  async getById(id: number): Promise<Contato> {
    return await firstValueFrom (this.http.get<Contato>(`${this.apiUrl}/${id}`));
  }

  async create(contato: Contato): Promise<Contato> {
    return await firstValueFrom (this.http.post<Contato>(this.apiUrl, contato));
  }

  async update(id: number, contato: Contato): Promise<Contato> {
    return await firstValueFrom (this.http.put<Contato>(`${this.apiUrl}/${id}`, contato));
  }

  async delete(id: number): Promise<void> {
    return await firstValueFrom (this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  getUsuarioLoguin(): any | null {
    if (this.usuarioLoguin) {
      return this.usuarioLoguin;
    }
    const usuarioLoguin = localStorage.getItem("usuarioLoguin");
    return usuarioLoguin ? JSON.parse(usuarioLoguin) as any : null;
  }
}