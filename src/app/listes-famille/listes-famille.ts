import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FragranceService } from '../services/fragrance.service';
import { FamilleOlfactive } from '../model/famille-olfactive.model';
import { UpdateFamilleComponent } from '../update-famille/update-famille';

@Component({
  selector: 'app-listes-famille',
  standalone: true,
  imports: [CommonModule, UpdateFamilleComponent],
  templateUrl: './listes-famille.html',
})
export class ListesFamilleComponent implements OnInit {

  familles!: FamilleOlfactive[];

  updatedFamille: FamilleOlfactive = {
    idFam: 0,
    nomFam: ''
  };

  ajout: boolean = true;

  constructor(private fragranceService: FragranceService) { }

  ngOnInit(): void {
    this.chargerFamilles();
  }

  chargerFamilles(): void {

    this.fragranceService.listeFamilles().subscribe({
      next: (familles) => {
        this.familles = familles;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  familleUpdated(famille: FamilleOlfactive) {

    if (this.ajout) {

      this.fragranceService
        .ajouterFamille(famille)
        .subscribe(() => this.chargerFamilles());

    } else {

      this.fragranceService
        .updateFamille(famille)
        .subscribe(() => this.chargerFamilles());

    }

    this.updatedFamille = {
      idFam: 0,
      nomFam: ''
    };

    this.ajout = true;
  }

  updateFamille(famille: FamilleOlfactive) {

    this.updatedFamille = { ...famille };
    this.ajout = false;

  }

}