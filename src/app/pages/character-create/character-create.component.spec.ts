import { CharacterCreateComponent } from './character-create.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PersistenceService } from '../../services/persistence/persistence.service';

describe('CharacterCreateComponent', () => {
  let component: CharacterCreateComponent;
  let mockPersistenceService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockPersistenceService = {
      savetracebilityInfoData: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    component = new CharacterCreateComponent(
      new FormBuilder(),
      mockPersistenceService,
      mockRouter
    );

    component.ngOnInit();
  });

  it('should initialize the form with default values', () => {
    expect(component.characterForm).toBeTruthy();
    expect(component.characterForm.value).toEqual({
      name: '',
      image: '',
      gender: 'Male',
      species: '',
      status: 'Alive',
    });
  });

  it('should call persistenceService and navigate if form is valid', () => {
    component.characterForm.setValue({
      name: 'Rick',
      image: 'rick.png',
      gender: 'Male',
      species: 'Human',
      status: 'Alive',
    });

    component.onSubmit();

    expect(mockPersistenceService.savetracebilityInfoData).toHaveBeenCalledWith(
      'CREATE',
      component.characterForm.value
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should log error if form is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    component.characterForm.patchValue({ name: '' });
    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    expect(
      mockPersistenceService.savetracebilityInfoData
    ).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
