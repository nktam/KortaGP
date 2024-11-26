import {Injectable} from '@angular/core';
import {collection, addDoc, setDoc, doc, updateDoc} from 'firebase/firestore';
import {Apuesta} from '../interfaces/apuesta';
import {Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  public async addApuesta(apuesta: Apuesta, userId: string) {
    const docRef=doc(this.firestore, "apuestas", userId);
    try {
      await updateDoc(docRef, {
        fecha: apuesta.fecha,
        carrera: apuesta.carrera,
        clasificacion: apuesta.clasificacion,
        sprint: apuesta.sprint,
        equipo: apuesta.equipo,
        posAlonso: apuesta.posAlonso,
        posSainz: apuesta.posSainz,
      })
      console.log("...FIREBASE UPDATEDOC OK");
    } catch(e) {
      await setDoc(docRef, apuesta);
      console.log("...FIREBASE SETDOC OK");
    }
  }
}
