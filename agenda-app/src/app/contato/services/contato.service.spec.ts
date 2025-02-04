import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContatoService } from '../services/contato.service';
import { Contato } from '../models/contato.model';
import { provideHttpClient } from '@angular/common/http';

describe('ContatoService', () => {
  let service: ContatoService;
  let httpMock: HttpTestingController;
  let contato: Contato = { id: 1, nome: 'John Doe', email: 'john@example.com', celular:"83621844", snFavorito:"S", snAtivo:"S", usuario_id:1 };
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ContatoService, provideHttpClient()
        ,provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ContatoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar uma lista de contatos', async () => {
    const mockContatos: Contato[] = [contato];

    service.getAll().then(contatos => {
      expect(contatos.length).toBe(1);
      expect(contatos).toEqual(mockContatos);
    });

    // const req = httpMock.expectOne('htt/api/contatos');
    // expect(req.request.method).toBe('GET');
    // req.flush(mockContatos);
  });

  it('deve retornar um contato pelo ID', async () => {
    const mockContato: Contato = contato;

    service.getById(1).then(contato => {
      expect(contato).toEqual(mockContato);
    });

  });

  it('deve criar um novo contato', async () => {
    const newContato: Contato = contato;
    newContato.id = 2;
    service.create(newContato).then(contato => {
      expect(contato).toEqual(newContato);
    });

  });

  it('deve atualizar um contato existente', async () => {
    let updatedContato: Contato = contato;
    updatedContato.nome = 'John Smith';
    updatedContato.email = 'johnsmith@example.com';

    service.update(1, updatedContato).then(contato => {
      expect(contato).toEqual(updatedContato);
    });

  });

  it('deve deletar um contato', async () => {
    service.delete(1).then(() => {
      expect().nothing();
    });

  });

  it('deve retornar o usuário logado', () => {
    localStorage.setItem('usuarioLoguin', JSON.stringify({ nome: 'Usuário Teste' }));
    const usuario = service.getUsuarioLoguin();
    expect(usuario).toEqual({ nome: 'Usuário Teste' });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
