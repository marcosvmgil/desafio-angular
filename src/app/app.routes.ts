import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'character/:id',
    loadChildren: () =>
      import('./pages/character-detail/character.module').then(
        (m) => m.CharacterModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/character-create/character-create.module').then(
        (m) => m.CharacterCreateModule
      ),
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./pages/character-update/character-update.module').then(
        (m) => m.CharacterUpdateModule
      ),
  },
];
