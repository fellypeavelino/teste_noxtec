import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { ContatoListComponent } from './contato-list/contato-list.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { ContatoService } from './contato.service'; // ✅ Importando o serviço

@NgModule({
  declarations: [ContatoListComponent, ContatoFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    //HttpClient
  ],
  providers: [provideHttpClient()] // ✅ Adicionando o serviço como provider (opcional, pois já está no root)
})
export class ContatoModule {}
