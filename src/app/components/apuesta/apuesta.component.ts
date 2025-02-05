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
  durationInSeconds=4;

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
    const id='RACE'+this.race.round+'ID_'+user.idUsuario;
    this.apuestaService.updateId(id);
    this.apuestaService.updateUsuario(user.idUsuario, user.nombre);
    this.apuestaService.updateFecha();
    if(await this.firestore.addApuesta(this.apuesta, id))
      this.aviso();
    else
      this.error();
  }

  private aviso() {
    this._snackBar.open('Apuesta guardada', '', {duration: 2000});
  }

  private error() {
    this._snackBar.open('Error al guardar apuesta', '', {duration: 2000});
  }

}

