import { Component, ViewChild, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrl: './contato-list.component.css',
  imports: [
    MatTableModule, MatPaginatorModule, MatIconModule, 
    MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContatoListComponent implements OnInit {
  dataSource  = new MatTableDataSource<Contato>([]);
  displayedColumns: string[] = ['id', 'nome', 'email', 'celular', 'telefone', 'snFavorito', 'snAtivo', 'dhCad', 'acoes'];

  constructor(
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContatos();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadContatos(): void {
    this.contatoService.getAll().then(contatos => {
      this.dataSource = new MatTableDataSource<Contato>(contatos);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteContato(id: number): void {
    this.contatoService.delete(id).then(() => this.loadContatos());
  }

  formatarData(data?: string): string {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  editarContato(contato: Contato) {
    this.contatoService.contato = contato;
    this.router.navigate([`contatos/editar/${contato.id}`]);
  }

  async excluirContato(id: number) {
    await this.contatoService.delete(id);
    this.loadContatos();
    console.log(`Excluir contato ID: ${id}`);
  }

  criarContato(){
    this.contatoService.contato = null;
    this.router.navigate([`contatos/novo`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}