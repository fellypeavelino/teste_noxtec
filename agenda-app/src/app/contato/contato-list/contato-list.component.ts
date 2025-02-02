import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  imports: [MatTableModule],
})
export class ContatoListComponent implements OnInit, AfterViewInit {
  contatos: Contato[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'celular', 'snFavorito', 'snAtivo', 'dhCad', 'acoes'];

  constructor(
    private contatoService: ContatoService
  ) {}

  ngOnInit(): void {
    this.loadContatos();
  }

  ngAfterViewInit(): void {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadContatos(): void {
    this.contatoService.getAll().then(data => this.contatos = data);
  }

  deleteContato(id: number): void {
    this.contatoService.delete(id).then(() => this.loadContatos());
  }

  formatarData(data?: string): string {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  editarContato(id: number) {
    console.log(`Editar contato ID: ${id}`);
  }

  excluirContato(id: number) {
    console.log(`Excluir contato ID: ${id}`);
  }
}