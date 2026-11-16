import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FamilleOlfactive } from '../model/famille-olfactive.model';

@Component({
  selector: 'app-updatefamille',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-famille.html'
})
export class UpdateFamilleComponent {

  @Input()
  famille!: FamilleOlfactive;

  @Input()
  ajout!: boolean;

  @Output()
  familleUpdated = new EventEmitter<FamilleOlfactive>();

  saveFamille() {
    this.familleUpdated.emit(this.famille);
  }
}