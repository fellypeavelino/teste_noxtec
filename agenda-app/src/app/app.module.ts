import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { ContatoModule } from './contato/contato.module';
import { routes } from './app.routes';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; // Tabela Angular Material
import { MatIconModule } from '@angular/material/icon'; // Ícones Material
import { MatButtonModule } from '@angular/material/button'; // Botões
import { MatPaginatorModule } from '@angular/material/paginator'; // Paginação
import { MatSortModule } from '@angular/material/sort'; // Ordenação
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, LoguinComponent],
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
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient()] 
})
export class AppModule {}
