import { Routes } from '@angular/router';
import { Fragrances } from './fragrances/fragrances';
import { AddFragrance } from './add-fragrance/add-fragrance';
import { UpdateFragrance } from './update-fragrance/update-fragrance';
import { RechercheParFamille } from './recherche-par-famille/recherche-par-famille';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { fragranceGuard } from './fragrance-guard';
import { ListesFamilleComponent } from './listes-famille/listes-famille';


export const routes: Routes = [
    { path: "fragrances", component: Fragrances },
    { path: "add-fragrance", component: AddFragrance, canActivate: [fragranceGuard] },
    { path: "updateFragrance/:id", component: UpdateFragrance },
    { path: "rechercheParFamille", component: RechercheParFamille },
    { path: "rechercheParNom", component: RechercheParNom },
    { path: "", redirectTo: "fragrances", pathMatch: "full" },
    { path: 'login', component: Login },
    { path: 'app-forbidden', component: Forbidden },
   { path: 'listes-famille',component: ListesFamilleComponent}

];
