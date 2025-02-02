import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContatoModule } from './contato/contato.module';
import { routes } from './app.routes';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; // Tabela Angular Material
import { MatIconModule } from '@angular/material/icon'; // Ícones Material
import { MatButtonModule } from '@angular/material/button'; // Botões
import { MatPaginatorModule } from '@angular/material/paginator'; // Paginação
import { MatSortModule } from '@angular/material/sort'; // Ordenação

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ContatoModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient()] 
})
export class AppModule {}
