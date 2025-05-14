import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { CharacterDetailComponent } from './character-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterDetailComponent,
  },
];

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
})
export class CharacterModule {}
