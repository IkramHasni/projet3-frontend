import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fragrance } from '../model/fragrance.model';
import { FragranceService } from '../services/fragrance.service';
import { FamilleOlfactive } from '../model/famille-olfactive.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-fragrance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-fragrance.html'
})
export class AddFragrance implements OnInit {

  newFragrance = new Fragrance();

  familles!: FamilleOlfactive[];

  newIdFam!: number;

  newFamille!: FamilleOlfactive;

  constructor(
    private fragranceService: FragranceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.fragranceService.listeFamilles()
      .subscribe(fams => {

        console.log(fams);

        this.familles =
        fams._embedded.familleOlfactives;

      });

  }

  addFragrance() {

    this.newFragrance.famille =
      this.familles.find(
        fam => fam.idFam == this.newIdFam
      )!;

    this.fragranceService
      .ajouterFragrance(this.newFragrance)
      .subscribe(fr => {

        console.log(fr);

        this.router.navigate(['fragrances']);

      });

  }

}