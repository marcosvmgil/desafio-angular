import { PersistenceService } from './../../services/persistence/persistence.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterProvider } from '../../services/providers/character.provider';

@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  styleUrls: ['./character-update.component.scss'],
})
export class CharacterUpdateComponent implements OnInit {
  characterForm!: FormGroup;
  characterId!: string;
  characterName!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private characterProvider: CharacterProvider,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      gender: ['Male', Validators.required],
      species: ['', Validators.required],
      status: ['Alive', Validators.required],
    });

    this.characterId = this.route.snapshot.paramMap.get('id') || '';

    if (this.characterId) {
      this.characterProvider.get(undefined, this.characterId).subscribe({
        next: (character) => {
          this.characterName = character.name;
          this.characterForm.patchValue({
            name: character.name,
            image: character.image,
            gender: character.gender,
            species: character.species,
            status: character.status,
          });
        },
        error: (err) => {
          console.error('Erro ao buscar personagem na API:', err);

          // Tentativa de buscar no serviço de persistência
          const persistedData =
            this.persistenceService.getTracebilityInfoData();
          if (persistedData && Array.isArray(persistedData)) {
            const foundCharacter = persistedData.find(
              (item: any) => item.value?.id === Number(this.characterId)
            );
            if (foundCharacter) {
              const character = foundCharacter.value;
              this.characterName = character.name;
              this.characterForm.patchValue({
                name: character.name,
                image: character.image,
                gender: character.gender,
                species: character.species,
                status: character.status,
              });
            } else {
              console.error(
                'Personagem não encontrado no serviço de persistência.'
              );
            }
          } else {
            console.error('Dados persistidos inválidos ou inexistentes.');
          }
        },
      });
    }
  }

  onSubmit() {
    if (this.characterForm.valid) {
      const updatedCharacter = {
        id: this.characterId,
        ...this.characterForm.value,
      };
      this.persistenceService.savetracebilityInfoData(
        'UPDATE',
        updatedCharacter
      );
      this.router.navigate(['/']);
    } else {
      console.error('Form is invalid');
    }
  }
}
