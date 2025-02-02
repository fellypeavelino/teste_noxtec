import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { ContatoListComponent } from './contato-list/contato-list.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; // Tabela Angular Material
import { MatIconModule } from '@angular/material/icon'; // Ícones Material
import { MatButtonModule } from '@angular/material/button'; // Botões
import { MatPaginatorModule } from '@angular/material/paginator'; // Paginação
import { MatSortModule } from '@angular/material/sort'; // Ordenação

@NgModule({
  declarations: [ContatoListComponent, ContatoFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [provideHttpClient()] // ✅ Adicionando o serviço como provider (opcional, pois já está no root)
})
export class ContatoModule {}
