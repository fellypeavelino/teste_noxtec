import { Routes } from '@angular/router';
import { ContatoListComponent } from './contato/contato-list/contato-list.component';
import { ContatoFormComponent } from './contato/contato-form/contato-form.component';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './auth.guard'
import { LoguinComponent } from './loguin/loguin.component'

export const routes: Routes = [
  { path: 'loguin', component: LoguinComponent },
  { path: 'contatos', component: ContatoListComponent, canActivate: [authGuard]  },
  { path: 'contatos/novo', component: ContatoFormComponent, canActivate: [authGuard]  },
  { path: 'contatos/editar/:id', component: ContatoFormComponent, canActivate: [authGuard]  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/loguin', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/loguin' } 
];
