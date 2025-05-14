import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterUpdateComponent } from './character-update.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CharacterUpdateComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [CharacterUpdateComponent],
})
export class CharacterUpdateModule {}
