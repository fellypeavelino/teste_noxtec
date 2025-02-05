import { Component, ViewChild, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ObjRequest } from '../../../models/objRequest.model';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrl: './contato-list.component.css',
  imports: [
    MatTableModule, MatPaginatorModule, MatIconModule, 
    MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatSortModule, MatSlideToggleModule, FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContatoListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'nome', 'email', 'celular', 'telefone', 'snFavorito', 'snAtivo', 'dhCad', 'acoes'];
  sortedData!: Contato[];
  listaContato!: Contato[];
  listaPaginada: boolean = false;
  paramPaginacao!: ObjRequest;
  lengthPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.loadContatos();
    this.carregarParamPaginacao();
    this.loadContatosPaginado();
  }

  loadContatos(): void {
    this.contatoService.getAll().then(contatos => {
      this.listaContato = contatos;
      this.sortedData = contatos;
      this.carregarDataSource(contatos);
    });
  }

  carregarDataSource(contatos: Contato[]){
    this.dataSource.data = contatos;
    this.dataSource.paginator = this.paginator;
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

  sortData(sort: Sort) {
    const vm = this;
    const data = vm.listaContato.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    vm.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return vm.compare(a.id, b.id, isAsc);
        case 'nome':
          return vm.compare(a.nome, b.nome, isAsc);
        case 'email':
          return vm.compare(a.email, b.email, isAsc);
        case 'celular':
          return vm.compare(a.celular, b.celular, isAsc);
        case 'telefone':
          return vm.compare(a.telefone, b.telefone, isAsc);
        case 'snFavorito':
          return vm.compare(a.snFavorito, b.snFavorito, isAsc);
        case 'snAtivo':
          return vm.compare(a.snAtivo, b.snAtivo, isAsc);
        case 'dhCad':
          return vm.compare(a.dhCad, b.dhCad, isAsc);
        default:
          return 0;
      }
    });   
    this.carregarDataSource(vm.sortedData);
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  carregarParamPaginacao(){
    this.paramPaginacao = new ObjRequest();
    this.paramPaginacao.page = 0;
    this.paramPaginacao.size = 5;
    this.paramPaginacao.sortBy = "id";
    this.paramPaginacao.sortDir = "desc";
    this.paramPaginacao.filtro = "";
  }

  carregarDataSourcePaginado(jsonPaginate:any){  
    this.dataSource.data = jsonPaginate.contatosDto;
    this.lengthPage = jsonPaginate.total;
    this.paginator.length = jsonPaginate.total;
    this.paginator.pageIndex = jsonPaginate.param.page;
  }

  loadContatosPaginado(): void {
    const vm = this;
    vm.contatoService.getPagination(vm.paramPaginacao).then(contatos => {
      vm.carregarDataSourcePaginado(contatos);
    });
  }

  ativarDestaivarListaPaginada(){
    if(this.listaPaginada){
      this.loadContatosPaginado();
      return;
    }
    this.loadContatos();
  }

  sortDataPaginado(sort: Sort){
    if (!this.paramPaginacao) {
      this.sortData(sort);
      return;
    }
    const {active, direction} = sort;
    this.paramPaginacao.sortBy = active;
    this.paramPaginacao.sortDir = direction;
    this.loadContatosPaginado();
  }

  eventoPaginacao($event: PageEvent){
    if (!this.paramPaginacao) {
      return;
    }
    this.paramPaginacao.page = $event.pageIndex;
    this.paramPaginacao.size = $event.pageSize;
    this.loadContatosPaginado();
  }

  applyFilterPaginado(event: Event) {
    if (!this.paramPaginacao) {
      this.applyFilter(event);
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.paramPaginacao.filtro = filterValue.trim().toLowerCase();
    this.loadContatosPaginado();
  }

  tabelaRenderizada($event:any){
    console.log($event);
  }
}
