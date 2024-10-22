import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewUserInterface } from 'src/app/interfaces/new-user.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { RolInterface } from 'src/app/interfaces/rol.interface';
import { UserInterface as UsuarioInterface } from 'src/app/interfaces/user.interface';
import { UserReportService } from 'src/app/reports/user.report';
import { ApiService } from 'src/app/services/api.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WidgetService } from 'src/app/services/widget.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [
    WidgetService,
    UsuarioService,
    RolService,
    UserReportService,
  ]
})
export class NewUserComponent implements OnInit {

  isLoading: boolean = false;

  nombres: string = "";
  apellidos: string = "";
  roles: RolInterface[] = [];
  rol?: RolInterface;
  user?: UsuarioInterface;


  /**
   *
   */
  constructor(
    private _location: Location,
    private _widgetService: WidgetService,
    private _userService: UsuarioService,
    private _rolService: RolService,
    private _reportService: UserReportService,
  ) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  backPage() {
    this._location.back();
  }


  async loadData() {
    this.isLoading = true;
    await this.loadRoles();
    this.isLoading = false;
  }



  async loadRoles(): Promise<boolean> {
    const api = () => this._rolService.getRol();

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.roles = res.data;

    return true;
  }


  async confirmForm() {
    if (
      !this.nombres ||
      !this.apellidos ||
      !this.rol
    ) {
      this._widgetService.openSnackbar("Por favor, completa todos los campos");
      return;
    }

    this.isLoading = true;

    let resUser = await this.createUser();

    this.isLoading = false;


    this._widgetService.openSnackbar("Usuario creado corectamnete");


    const docDefinition = await this._reportService.getReport(this.user!);
    pdfMake.createPdf(docDefinition, undefined, undefined, pdfFonts.pdfMake.vfs).open();



    //Limpiar formulario
    this.emptyForm();
  }


  async createUser(): Promise<boolean> {

    const user: NewUserInterface = {
      apellido: this.nombres,
      nombre: this.apellidos,
      rol: this.rol!.id,
    }

    const api = () => this._userService.postUser(user);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.user = res.data;

    return true;
  }


  emptyForm() {
    this.rol = undefined;
    this.nombres = "";
    this.apellidos = "";
    this.user = undefined;
  }



}
