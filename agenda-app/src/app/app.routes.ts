import { Routes } from '@angular/router';
import { ContatoListComponent } from './contato/contato-list/contato-list.component';
import { ContatoFormComponent } from './contato/contato-form/contato-form.component';

export const routes: Routes = [
  { path: 'contatos', component: ContatoListComponent },
  { path: 'contatos/novo', component: ContatoFormComponent },
  { path: 'contatos/editar/:id', component: ContatoFormComponent },
  { path: '', redirectTo: '/contatos', pathMatch: 'full' }, // Redireciona para contatos
  { path: '**', redirectTo: '/contatos' } // Rota coringa para evitar erro 404
];
