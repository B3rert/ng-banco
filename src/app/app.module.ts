import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AllComponent } from './components/all/all.component';
import { CardComponent } from './components/card/card.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ServicesComponent } from './components/services/services.component';
import { HistoryComponent } from './components/history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { ProgressComponent } from './components/progress/progress.component';
import { DialogActionsComponent } from './components/dialog-actions/dialog-actions.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MonthsFilterComponent } from './components/months-filter/months-filter.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { OptionsCardComponent } from './components/options-card/options-card.component';
import { PasswordComponent } from './components/password/password.component';
import {MatSelectModule} from '@angular/material/select';
import { InfoAccountComponent } from './components/info-account/info-account.component';
import { SuccesTraComponent } from './components/succes-tra/succes-tra.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FavoritesComponent,
    AllComponent,
    CardComponent,
    TransferComponent,
    SettingsComponent,
    AccountsComponent,
    ServicesComponent,
    HistoryComponent,
    DialogActionsComponent,
    ProgressComponent,
    NewAccountComponent,
    NewUserComponent,
    MonthsFilterComponent,
    OptionsCardComponent,
    PasswordComponent,
    InfoAccountComponent,
    SuccesTraComponent
  ],
  imports: [
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
