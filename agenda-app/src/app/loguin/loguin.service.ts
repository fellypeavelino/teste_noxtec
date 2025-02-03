import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoguinService {

  private apiUrl = '/api/usuario'; 
  public usuarioLoguin!: any;

  constructor(private http: HttpClient) { }

  async loguin(loguin: any): Promise<any> {
    return await firstValueFrom (this.http.post<any>(this.apiUrl, loguin));
  }
}
