import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html'
})
export class ContatoListComponent implements OnInit {
  contatos: Contato[] = [];

  constructor(
    private contatoService: ContatoService
  ) {}

  ngOnInit(): void {
    this.loadContatos();
  }

  loadContatos(): void {
    this.contatoService.getAll().then(data => this.contatos = data);
  }

  deleteContato(id: number): void {
    this.contatoService.delete(id).then(() => this.loadContatos());
  }
}