import { PersistenceService } from './../../services/persistence/persistence.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss'],
})
export class CharacterCreateComponent implements OnInit {
  characterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
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
  }

  onSubmit() {
    if (this.characterForm.valid) {
      let validForm = this.characterForm.value;
      validForm.id = Math.floor(Math.random() * 10000000000000);
      this.persistenceService.savetracebilityInfoData(
        'CREATE',
        this.characterForm.value
      );
      this.router.navigate(['/']);
    } else {
      console.error('Form is invalid');
    }
  }
}
