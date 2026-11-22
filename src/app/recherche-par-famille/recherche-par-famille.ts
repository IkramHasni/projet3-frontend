import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fragrance } from '../model/fragrance.model';
import { FamilleOlfactive } from '../model/famille-olfactive.model';
import { FragranceService } from '../services/fragrance.service';

@Component({
  selector: 'app-recherche-par-famille',
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-famille.html',
  styles: ``
})
export class RechercheParFamille implements OnInit {

  fragrances: Fragrance[] = [];
  idFam: number | null = null;
  familles: FamilleOlfactive[] = [];

  constructor(private fragranceService: FragranceService) { }

  ngOnInit(): void {
    this.fragranceService.listeFamilles().subscribe({
      next: (fams) => {
        this.familles = fams._embedded.familleOlfactives;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des familles", err);
      }
    });
    this.fragranceService.listeFragrances().subscribe(frags => this.fragrances = frags);
  }

  onChange(id: any) {
    this.idFam = +id;
    this.fragranceService.rechercherParFamille(this.idFam).subscribe(frags => this.fragrances = frags);
  }
}
