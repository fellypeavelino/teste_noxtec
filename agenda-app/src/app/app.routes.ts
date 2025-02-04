import { Routes } from '@angular/router';
import { ContatoListComponent } from './contato/components/contato-list/contato-list.component';
import { ContatoFormComponent } from './contato/components/contato-form/contato-form.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guards/auth.guard'
import { LoguinComponent } from './components/loguin/loguin.component'

export const routes: Routes = [
  { path: 'loguin', component: LoguinComponent },
  { path: 'contatos', component: ContatoListComponent, canActivate: [authGuard]  },
  { path: 'contatos/novo', component: ContatoFormComponent, canActivate: [authGuard]  },
  { path: 'contatos/editar/:id', component: ContatoFormComponent, canActivate: [authGuard]  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/loguin', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/loguin' } 
];
