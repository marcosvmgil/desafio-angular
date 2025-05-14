import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterProvider } from '../../services/providers/character.provider';
import { PersistenceService } from './../../services/persistence/persistence.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  showDeleteModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private characterProvider: CharacterProvider,
    private router: Router,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterProvider.get(undefined, id).subscribe({
        next: (res) => {
          this.character = res;
        },
        error: (err) => {
          const persistedData =
            this.persistenceService.getTracebilityInfoData();
          if (persistedData && Array.isArray(persistedData)) {
            const foundCharacter = persistedData.find(
              (item: any) => item.value?.id === Number(id)
            );
            if (foundCharacter) {
              this.character = foundCharacter.value;
            } else {
              console.error(err);
            }
          } else {
            console.error(err);
          }
        },
      });
    }
  }

  navigateToUpdate() {
    this.router.navigate(['/update', this.character.id]);
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.persistenceService.savetracebilityInfoData('REMOVE', this.character);
    this.router.navigate(['/']);
  }
}
