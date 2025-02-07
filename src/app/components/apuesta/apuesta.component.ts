import {Component, inject} from '@angular/core';
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ConsultasService} from "../../services/consultas.service";
import {FirestoreService} from "../../services/firestore.service";
import {TitleCasePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Race} from '../../interfaces/race';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-apuesta',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, TitleCasePipe],
  templateUrl: './apuesta.component.html',
  styleUrl: './apuesta.component.css'
})

export class ApuestaComponent {
  apuesta: any;
  apuestaEnPantalla: string="";
  race: Race={} as Race;
  apuestasAbiertas: boolean=false;
  private apuestaSubscription: Subscription|undefined;
  private _snackBar=inject(MatSnackBar);

  constructor(
    private apuestaService: ApuestaService,
    private clipboard: Clipboard,
    private cs: ConsultasService,
    private firestore: FirestoreService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.race=this.cs.race;
    const fecha=new Date();

    if(this.race.finApuesta>fecha.getTime())
      this.apuestasAbiertas=true;
    else
      this.apuestasAbiertas=false;

    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
    this.apuestaService.updateRace(this.race);
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

  async guardar() {
    this.cs.guardaArchivo('apuesta.json', this.apuesta);
  }

  async apostar() {
    const user=await this.auth.getCurrentUser();
    const id='RACE'+this.race.round+'ID_'+user.id;
    this.apuestaService.updateId(id);
    this.apuestaService.updateUsuario(user);
    this.apuestaService.updateFecha();
    if(await this.firestore.addApuesta(this.apuesta))
      this.aviso();
    else
      this.error();
  }

  private aviso() {
    this._snackBar.open('Apuesta realizada', '', {duration: 2000});
  }

  private error() {
    this._snackBar.open('Error al realizar la apuesta', '', {duration: 2000});
  }

}


