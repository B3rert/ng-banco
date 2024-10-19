import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { HomeComponent } from "./components/home/home.component";
import { NewAccountComponent } from "./components/new-account/new-account.component";
import { NewUserComponent } from "./components/new-user/new-user.component";
import { HistoryComponent } from "./components/history/history.component";
import { CardComponent } from "./components/card/card.component";
import { TransferComponent } from "./components/transfer/transfer.component";

type PathMatch = "full" | "prefix" | undefined;

const appRoutes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-account', component: NewAccountComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'cards', component: CardComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transactions/:idCuenta', component: HistoryComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' as PathMatch },
  { path: '**', redirectTo: '/login', pathMatch: 'full' as PathMatch }
];
export const routing = RouterModule.forRoot(appRoutes);