import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterCreateComponent } from './character-create.component';
import { PersistenceService } from './../../services/persistence/persistence.service';

describe('CharacterCreateComponent', () => {
  let component: CharacterCreateComponent;
  let fixture: ComponentFixture<CharacterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: PersistenceService,
          useValue: { savetracebilityInfoData: jest.fn() },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
