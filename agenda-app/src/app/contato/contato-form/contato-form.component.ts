import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html'
})
export class ContatoFormComponent implements OnInit {
  contato: Contato = { nome: '', email: '', celular: '', snFavorito: 'N', snAtivo: 'S' };
  isEdit = false;

  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.contatoService.getById(+id).then(data => this.contato = data);
    }
  }

  save(): void {
    if (this.isEdit) {
      this.contatoService.update(this.contato.id!, this.contato).then(() => this.router.navigate(['/contatos']));
    } else {
      this.contatoService.create(this.contato).then(() => this.router.navigate(['/contatos']));
    }
  }
}