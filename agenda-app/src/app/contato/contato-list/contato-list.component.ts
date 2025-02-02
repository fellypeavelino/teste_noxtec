import { Component, ViewChild, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContatoListComponent implements OnInit {
  dataSource  = new MatTableDataSource<Contato>([]);
  displayedColumns: string[] = ['id', 'nome', 'email', 'celular', 'snFavorito', 'snAtivo', 'dhCad', 'acoes'];

  constructor(
    private contatoService: ContatoService
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

  editarContato(id: number) {
    console.log(`Editar contato ID: ${id}`);
  }

  excluirContato(id: number) {
    console.log(`Excluir contato ID: ${id}`);
  }
}