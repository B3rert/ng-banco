import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { TransferComponent } from './components/transfer/transfer.component';
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
import { OptionsCardComponent } from './components/options-card/options-card.component';
import { PasswordComponent } from './components/password/password.component';
import { InfoAccountComponent } from './components/info-account/info-account.component';
import { SuccesTraComponent } from './components/succes-tra/succes-tra.component';
import { StatusAccountComponent } from './components/status-account/status-account.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';  



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    TransferComponent,
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
    SuccesTraComponent,
    StatusAccountComponent,
    SelectAccountComponent,
    ActivateUserComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
