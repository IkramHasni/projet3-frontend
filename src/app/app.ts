import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service'; 


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Mes Fragrances';
  constructor(public authService: AuthService,private router:Router) {
   }

ngOnInit() {
  let isloggedin: string;
  let loggedUser: string;

  isloggedin = localStorage.getItem('isloggedIn')!;
  loggedUser = localStorage.getItem('loggedUser')!;

  if (isloggedin != "true" || !loggedUser)
    this.router.navigate(['/login']);
  else
    this.authService.setLoggedUserFromLocalStorage(loggedUser);

  console.log("Utilisateur :", this.authService.loggedUser);
  console.log("Rôles :", this.authService.roles);
  console.log("Admin :", this.authService.isAdmin());
}

  onLogout() {
    this.authService.logout();
  }
  
}
