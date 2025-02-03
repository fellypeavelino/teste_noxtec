import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContatoService } from '../contato/contato.service';
import { LoguinService } from './loguin.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { GuardService } from '../guard.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-loguin',
  imports: [
    MatIconModule, MatDividerModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule,
    MatSelectModule, MatCardModule, ReactiveFormsModule
  ],
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoguinComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private loguinService: LoguinService,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private guardService: GuardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      loguin: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  async logar(){
    const vm = this;
    const loginForm = this.loginForm.value;
    this.loguinService.loguin(loginForm).then(async(data) => {
      if (!data.id) {
        alert("usuario ou senha não existem");
        vm.guardService.logout();
        return;
      }
      this.loguinService.usuarioLoguin = data;
      const token = await vm.contatoService.getToken();
      vm.contatoService.usuarioLoguin = data;
      vm.contatoService.token = token;
      vm.guardService.login();
      vm.router.navigate([`contatos`]);
    });
  }
}
