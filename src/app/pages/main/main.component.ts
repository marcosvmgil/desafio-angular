import { PersistenceService } from './../../services/persistence/persistence.service';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterProvider } from '../../services/providers/character.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private characterProvider: CharacterProvider,
    private fb: FormBuilder,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  characters = signal([]);
  currentPage = signal(1);
  totalPages = signal(1);
  searchForm!: FormGroup;

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.searchForm.get('searchTerm')?.valueChanges.subscribe((term) => {
      this.onSearch(term);
    });

    this.getCharacters();
  }

  getCharacters(page: number = 1) {
    const searchTerm = this.searchForm.get('searchTerm')?.value || '';
    this.characterProvider.getPaginated(page, searchTerm).subscribe({
      next: (res: any) => {
        let charactersFromApi = res.results;
        const traceabilityData =
          this.persistenceService.getTracebilityInfoData();

        traceabilityData.forEach((trace) => {
          const { key, value } = trace;

          if (key === 'CREATE') {
            charactersFromApi.push(value);
          } else if (key === 'REMOVE') {
            charactersFromApi = charactersFromApi.filter(
              (character: any) => character.id !== value.id
            );
          } else if (key === 'UPDATE') {
            charactersFromApi = charactersFromApi.map((character: any) =>
              character.id === Number(value.id) ? value : character
            );
          }
        });
        this.characters.set(charactersFromApi);
        this.totalPages.set(res.info.pages);
        this.currentPage.set(page);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  onSearch(term: string) {
    this.getCharacters(1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.getCharacters(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.getCharacters(this.currentPage() - 1);
    }
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
