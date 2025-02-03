import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ContatoListComponent } from './contato-list.component';

describe('ContatoListComponent', () => {
  let component: ContatoListComponent;
  let fixture: ComponentFixture<ContatoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoListComponent],
      providers: [
        provideHttpClient(), provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
