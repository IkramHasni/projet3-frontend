import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fragrance } from '../model/fragrance.model';
import { FamilleOlfactive } from '../model/famille-olfactive.model';
import { FamilleOlfactiveWrapper } from '../model/famille-olfactive-wrapped';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class FragranceService {
  apiURL: string = 'http://localhost:9090/fragrances/api';
  apiURLFam: string = 'http://localhost:9090/fragrances/fam';
  constructor(private http: HttpClient) { }

/*   familles: FamilleOlfactive[] = [
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
  ]; */

 /*  listeFragrances(): Observable<Fragrance[]> {
    return of([...this.fragrances]);
  }

  ajouterFragrance(f: Fragrance): Observable<Fragrance> {
    if (!f.idFragrance) {
      f.idFragrance = Math.max(0, ...this.fragrances.map(x => x.idFragrance!)) + 1;
    }
    this.fragrances.push(f);
    return of(f);
  } */
 listeFragrances(): Observable<Fragrance[]> {
    return this.http.get<Fragrance[]>(this.apiURL);
  }

 ajouterFragrance(f: Fragrance): Observable<Fragrance> {
  return this.http.post<Fragrance>(this.apiURL,f,httpOptions);
}

  supprimerFragrance(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterFragrance(id: number): Observable<Fragrance> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Fragrance>(url);
  }

  updateFragrance(f: Fragrance): Observable<Fragrance> {
    return this.http.put<Fragrance>(this.apiURL, f, httpOptions);
  }
  

  listeFamilles(): Observable<FamilleOlfactiveWrapper> {
    return this.http.get<FamilleOlfactiveWrapper>(this.apiURLFam);
  }




  ajouterFamille(famille: FamilleOlfactive): Observable<FamilleOlfactive> {
  return this.http.post<FamilleOlfactive>(
    this.apiURLFam,
    famille,
    httpOptions
  );
}

updateFamille(famille: FamilleOlfactive): Observable<FamilleOlfactive> {
  const url = `${this.apiURLFam}/${famille.idFam}`;
  return this.http.put<FamilleOlfactive>(url, famille, httpOptions);
}
rechercherParFamille(idFam: number): Observable<Fragrance[]> {
  const url = `http://localhost:9090/fragrances/rest/search/findByFamilleIdFam?id=${idFam}`;
  return this.http.get<Fragrance[]>(url);
}
}

