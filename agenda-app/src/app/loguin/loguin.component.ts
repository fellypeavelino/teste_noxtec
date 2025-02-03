import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContatoService } from '../contato/contato.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { GuardService } from '../guard.service';
@Component({
  selector: 'app-loguin',
  imports: [MatIconModule],
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoguinComponent {
  constructor(
    private contatoService: ContatoService,
    private guardService: GuardService,
    private router: Router
  ) {}

  async logar(){
    const token = await this.contatoService.getToken();
    this.contatoService.token = token;
    this.guardService.login();
    this.router.navigate([`contatos`]);
  }
}
