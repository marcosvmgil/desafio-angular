import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() character: any = {};

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToCharacter() {
    if (this.character?.id) {
      this.router.navigate(['/character', this.character.id]);
    }
  }
}
