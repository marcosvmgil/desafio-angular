import { CardComponent } from './card.component';
import { Router } from '@angular/router';

describe('CardComponent', () => {
  let component: CardComponent;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    };

    component = new CardComponent(mockRouter);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not navigate if character.id is undefined', () => {
    component.character = {}; // no id
    component.navigateToCharacter();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to character detail page if character.id exists', () => {
    component.character = { id: 42 };

    component.navigateToCharacter();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/character', 42]);
  });

  it('should handle navigateToCharacter gracefully when character is nullish', () => {
    component.character = null as any;

    expect(() => component.navigateToCharacter()).not.toThrow();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
