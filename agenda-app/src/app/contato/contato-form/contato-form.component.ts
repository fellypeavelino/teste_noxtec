import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato.model';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder,FormGroup,FormArray,Validators,ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContatoFormComponent implements OnInit {
  contato: Contato = { nome: '', email: '', celular: '', snFavorito: 'N', snAtivo: 'S' };
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.contatoService.getById(+id).then(data => this.contato = data);
    }
  }

  salvar(): void {
    if (this.isEdit) {
      this.contatoService.update(this.contato.id!, this.contato)//.then(() => this.router.navigate(['/contatos']));
    } else {
      this.contatoService.create(this.contato)//.then(() => this.router.navigate(['/contatos']));
    }
  }

  cancelar(){
    this.router.navigate(['/contatos']);
  }
}