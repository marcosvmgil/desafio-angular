import { CharacterDetailComponent } from './character-detail.component';
import { of, throwError } from 'rxjs';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let mockRoute: any;
  let mockCharacterProvider: any;
  let mockRouter: any;
  let mockPersistenceService: any;

  const characterMock = { id: 1, name: 'Rick' };

  beforeEach(() => {
    mockRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    };

    mockCharacterProvider = {
      get: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    mockPersistenceService = {
      getTracebilityInfoData: jest.fn(),
      savetracebilityInfoData: jest.fn(),
    };

    component = new CharacterDetailComponent(
      mockRoute,
      mockCharacterProvider,
      mockRouter,
      mockPersistenceService
    );
  });

  it('should fetch character from API on init if id is present', () => {
    mockCharacterProvider.get.mockReturnValue(of(characterMock));

    component.ngOnInit();

    expect(mockCharacterProvider.get).toHaveBeenCalledWith(undefined, '1');
    expect(component.character).toEqual(characterMock);
  });

  it('should fallback to persisted character if API fails', () => {
    mockCharacterProvider.get.mockReturnValue(
      throwError(() => new Error('API failed'))
    );

    mockPersistenceService.getTracebilityInfoData.mockReturnValue([
      { key: 'CREATE', value: { id: 1, name: 'Rick Persisted' } },
    ]);

    component.ngOnInit();

    expect(component.character).toEqual({ id: 1, name: 'Rick Persisted' });
  });

  it('should log error if character not found in API or persistence', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    mockCharacterProvider.get.mockReturnValue(
      throwError(() => new Error('API failed'))
    );
    mockPersistenceService.getTracebilityInfoData.mockReturnValue([]);

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(component.character).toBeUndefined();

    consoleSpy.mockRestore();
  });

  it('should navigate to update page with character id', () => {
    component.character = { id: 123 };

    component.navigateToUpdate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/update', 123]);
  });

  it('should open delete modal', () => {
    component.openDeleteModal();
    expect(component.showDeleteModal).toBe(true);
  });

  it('should close delete modal', () => {
    component.showDeleteModal = true;
    component.closeDeleteModal();
    expect(component.showDeleteModal).toBe(false);
  });

  it('should confirm delete and navigate home', () => {
    component.character = { id: 999, name: 'Morty' };

    component.confirmDelete();

    expect(mockPersistenceService.savetracebilityInfoData).toHaveBeenCalledWith(
      'REMOVE',
      {
        id: 999,
        name: 'Morty',
      }
    );

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
