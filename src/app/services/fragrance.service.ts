import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fragrance } from '../model/fragrance.model';
import { FamilleOlfactive } from '../model/famille-olfactive.model';


@Injectable({
  providedIn: 'root'
})
export class FragranceService {

  familles: FamilleOlfactive[] = [
    { idFam: 1, nomFam: "Boisé" },
    { idFam: 2, nomFam: "Floral" },
    { idFam: 3, nomFam: "Oriental" },
    { idFam: 4, nomFam: "Frais" }
  ];

  fragrances: Fragrance[] = [
    { idFragrance: 1, nomFragrance: "Sauvage", marque: "Dior", volumeMl: 100, prixFragrance: 380, dateCreation: new Date("08/01/2015"), famille: this.familles[3] },
    { idFragrance: 2, nomFragrance: "Bleu de Chanel", marque: "Chanel", volumeMl: 100, prixFragrance: 420, dateCreation: new Date("09/01/2010"), famille: this.familles[0] },
    { idFragrance: 3, nomFragrance: "La Vie Est Belle", marque: "Lancôme", volumeMl: 75, prixFragrance: 310.500, dateCreation: new Date("09/01/2012"), famille: this.familles[1] },
    { idFragrance: 4, nomFragrance: "Aventus", marque: "Creed", volumeMl: 100, prixFragrance: 1100, dateCreation: new Date("01/01/2010"), famille: this.familles[3] },
    { idFragrance: 5, nomFragrance: "Black Opium", marque: "Yves Saint Laurent", volumeMl: 90, prixFragrance: 340, dateCreation: new Date("09/01/2014"), famille: this.familles[2] },
    { idFragrance: 6, nomFragrance: "Acqua di Giò", marque: "Giorgio Armani", volumeMl: 100, prixFragrance: 290.750, dateCreation: new Date("01/01/1996"), famille: this.familles[3] }
  ];

  listeFragrances(): Observable<Fragrance[]> {
    return of([...this.fragrances]);
  }

  ajouterFragrance(f: Fragrance): Observable<Fragrance> {
    if (!f.idFragrance) {
      f.idFragrance = Math.max(0, ...this.fragrances.map(x => x.idFragrance!)) + 1;
    }
    this.fragrances.push(f);
    return of(f);
  }

  supprimerFragrance(id: number): Observable<any> {
    this.fragrances = this.fragrances.filter(f => f.idFragrance != id);
    return of(null);
  }

  consulterFragrance(id: number): Observable<Fragrance> {
    const f = this.fragrances.find(x => x.idFragrance == id)!;
    return of({ ...f });
  }

  updateFragrance(f: Fragrance): Observable<Fragrance> {
    const index = this.fragrances.findIndex(x => x.idFragrance == f.idFragrance);
    if (index > -1) this.fragrances[index] = f;
    return of(f);
  }

  listeFamilles(): Observable<FamilleOlfactive[]> {
    return of(this.familles);
  }

  rechercherParFamille(idFam: number): Observable<Fragrance[]> {
    return of(this.fragrances.filter(f => f.famille?.idFam == idFam));
  }

  rechercherParNom(nom: string): Observable<Fragrance[]> {
    return of(this.fragrances.filter(f =>
      f.nomFragrance!.toLowerCase().includes(nom.toLowerCase())));
  }
  ajouterFamille(famille: FamilleOlfactive): Observable<FamilleOlfactive> {

  if (!famille.idFam) {
    famille.idFam =
      Math.max(...this.familles.map(f => f.idFam), 0) + 1;
  }

  this.familles.push(famille);

  return of(famille);
}

updateFamille(famille: FamilleOlfactive): Observable<FamilleOlfactive> {

  const index =
    this.familles.findIndex(f => f.idFam === famille.idFam);

  if (index > -1) {
    this.familles[index] = famille;
  }

  return of(famille);
}

}
