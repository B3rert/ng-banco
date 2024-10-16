import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { HomeComponent } from "./components/home/home.component";

type PathMatch = "full" | "prefix" | undefined;

const appRoutes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' as PathMatch },
  { path: '**', redirectTo: '/login', pathMatch: 'full' as PathMatch }
];
export const routing = RouterModule.forRoot(appRoutes);