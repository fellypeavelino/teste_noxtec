import { Routes } from '@angular/router';
import { ContatoListComponent } from './contato/contato-list/contato-list.component';
import { ContatoFormComponent } from './contato/contato-form/contato-form.component';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './auth.guard'

export const routes: Routes = [
  { path: 'contatos', component: ContatoListComponent, canActivate: [authGuard]  },
  { path: 'contatos/novo', component: ContatoFormComponent, canActivate: [authGuard]  },
  { path: 'contatos/editar/:id', component: ContatoFormComponent, canActivate: [authGuard]  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/contatos', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/contatos' } 
];
