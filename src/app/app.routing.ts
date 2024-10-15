import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";

type PathMatch = "full" | "prefix" | undefined;

const appRoutes = [
  
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login',pathMatch:'full' as PathMatch},
    { path: '**', redirectTo: '/login',pathMatch:'full' as PathMatch}
  ];
  export const routing = RouterModule.forRoot(appRoutes);