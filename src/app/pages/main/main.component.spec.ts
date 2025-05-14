import { MainComponent } from './main.component';
import { FormBuilder } from '@angular/forms';
import { CharacterProvider } from '../../services/providers/character.provider';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('MainComponent', () => {
  let component: MainComponent;
  let mockCharacterProvider: any;
  let mockPersistenceService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockCharacterProvider = {
      getPaginated: jest
        .fn()
        .mockReturnValue(of({ results: [], info: { pages: 1 } })),
    };

    mockPersistenceService = {
      getTracebilityInfoData: jest.fn().mockReturnValue([]),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    component = new MainComponent(
      mockCharacterProvider,
      new FormBuilder(),
      mockPersistenceService,
      mockRouter
    );

    component.ngOnInit();
  });

  it('should initialize form and fetch characters on init', () => {
    expect(component.searchForm).toBeTruthy();
    expect(mockCharacterProvider.getPaginated).toHaveBeenCalled();
  });

  it('should fetch characters and handle CREATE traceability', () => {
    const mockResponse = {
      results: [{ id: 1, name: 'Rick' }],
      info: { pages: 2 },
    };

    const newCharacter = { id: 999, name: 'New Character' };

    mockCharacterProvider.getPaginated.mockReturnValue(of(mockResponse));
    mockPersistenceService.getTracebilityInfoData.mockReturnValue([
      { key: 'CREATE', value: newCharacter },
    ]);

    component.getCharacters();

    expect(component.characters()).toContainEqual(newCharacter);
    expect(component.totalPages()).toBe(2);
    expect(component.currentPage()).toBe(1);
  });

  it('should remove character if REMOVE traceability is found', () => {
    const mockResponse = {
      results: [{ id: 1, name: 'Rick' }],
      info: { pages: 1 },
    };

    mockCharacterProvider.getPaginated.mockReturnValue(of(mockResponse));
    mockPersistenceService.getTracebilityInfoData.mockReturnValue([
      { key: 'REMOVE', value: { id: 1 } },
    ]);

    component.getCharacters();

    expect(component.characters()).not.toContainEqual({ id: 1, name: 'Rick' });
  });

  it('should update character if UPDATE traceability is found', () => {
    const mockResponse = {
      results: [{ id: 1, name: 'Rick' }],
      info: { pages: 1 },
    };

    const updatedCharacter = { id: 1, name: 'Updated Rick' };

    mockCharacterProvider.getPaginated.mockReturnValue(of(mockResponse));
    mockPersistenceService.getTracebilityInfoData.mockReturnValue([
      { key: 'UPDATE', value: updatedCharacter },
    ]);

    component.getCharacters();

    expect(component.characters()).toContainEqual(updatedCharacter);
  });

  it('should handle error in getCharacters', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockCharacterProvider.getPaginated.mockReturnValue(
      throwError(() => new Error('API Error'))
    );

    component.getCharacters();

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should go to next page if not on last page', () => {
    component.totalPages.set(3);
    component.currentPage.set(1);
    mockCharacterProvider.getPaginated.mockReturnValue(
      of({ results: [], info: { pages: 3 } })
    );
    mockPersistenceService.getTracebilityInfoData.mockReturnValue([]);

    component.nextPage();

    expect(component.currentPage()).toBe(2);
  });

  it('should not go to next page if already on last page', () => {
    component.totalPages.set(1);
    component.currentPage.set(1);

    component.nextPage();

    expect(component.currentPage()).toBe(1);
  });

  it('should go to previous page if not on first page', () => {
    component.currentPage.set(2);
    component.totalPages.set(3);
    mockCharacterProvider.getPaginated.mockReturnValue(
      of({ results: [], info: { pages: 3 } })
    );
    mockPersistenceService.getTracebilityInfoData.mockReturnValue([]);

    component.previousPage();

    expect(component.currentPage()).toBe(1);
  });

  it('should not go to previous page if already on first page', () => {
    component.currentPage.set(1);
    component.previousPage();

    expect(component.currentPage()).toBe(1);
  });

  it('should navigate to given path', () => {
    component.navigateTo('character-create');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/character-create']);
  });

  it('should call getCharacters on search input change', fakeAsync(() => {
    const spy = jest.spyOn(component, 'onSearch');
    component.searchForm.get('searchTerm')?.setValue('Morty');
    tick(300);
    expect(spy).toHaveBeenCalledWith('Morty');
  }));
});
