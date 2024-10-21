import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { HomeComponent } from "./components/home/home.component";
import { NewAccountComponent } from "./components/new-account/new-account.component";
import { NewUserComponent } from "./components/new-user/new-user.component";
import { HistoryComponent } from "./components/history/history.component";
import { CardComponent } from "./components/card/card.component";
import { TransferComponent } from "./components/transfer/transfer.component";
import { ServicesComponent } from "./components/services/services.component";
import { StatusAccountComponent } from "./components/status-account/status-account.component";
import { AuthGuard } from "./guards/auth/auth.guard";
import { LoginGuard } from "./guards/login/login.guard";

type PathMatch = "full" | "prefix" | undefined;

const appRoutes = [

  { path: 'login', component: LoginComponent , canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'new-account', component: NewAccountComponent , canActivate: [AuthGuard] },
  { path: 'new-user', component: NewUserComponent , canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]  },
  { path: 'cards', component: CardComponent, canActivate: [AuthGuard]  },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard]  },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard]  },
  { path: 'status', component: StatusAccountComponent, canActivate: [AuthGuard]  },
  { path: 'transactions/:idCuenta', component: HistoryComponent , canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' as PathMatch  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' as PathMatch  }
];
export const routing = RouterModule.forRoot(appRoutes);