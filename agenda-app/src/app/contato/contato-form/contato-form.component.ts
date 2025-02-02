import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, ReactiveFormsModule],
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
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      telefone: [''],
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