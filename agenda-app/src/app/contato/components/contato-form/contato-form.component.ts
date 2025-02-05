import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.model';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrl: './contato-form.component.css',
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatCardModule, ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContatoFormComponent implements OnInit {
  contato!: Contato;
  isEdit = false;
  contatoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      telefone: ['', [Validators.maxLength(15)]],
      snFavorito: ['', Validators.required],
      snAtivo: ['', Validators.required]
  });
    this.carregarDados();
  }

  async carregarDados(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      await this.contatoService.getById(+id).then(data => this.contato = data);
      this.contatoForm.patchValue(this.contato);
    }
  }

  salvar(): void {
    const formValues = this.contatoForm.value;
    this.contato = formValues;
    this.contato.usuario_id = (this.contatoService.getUsuarioLoguin()).id;
    if (this.isEdit) {
      this.contato.id = this.contatoService.contato?.id;
      this.contato.dhCad = this.contatoService.contato?.dhCad;
      this.contatoService.update(this.contato.id!, this.contato).then(() => this.router.navigate(['/contatos']));
    } else {
      this.contatoService.create(this.contato).then(() => this.router.navigate(['/contatos']));
    }
  }

  cancelar(){
    this.router.navigate(['/contatos']);
  }
}