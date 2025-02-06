import {Injectable} from '@angular/core';
import {collection, addDoc, setDoc, doc, updateDoc, where, query, getDocs} from 'firebase/firestore';
import {Apuesta} from '../interfaces/apuesta';
import {Firestore} from "@angular/fire/firestore";
import {Usuario} from '../interfaces/usuario';
import {Clasificación} from '../interfaces/clasificacion';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  public async addApuesta(apuesta: Apuesta, usuario: Usuario) {
    const docRef=doc(this.firestore, "apuestas", usuario.id);
    try {
      await updateDoc(docRef, {
        fecha: apuesta.fecha,
        carrera: apuesta.carrera,
        parrilla: apuesta.parrilla,
        sprint: apuesta.sprint,
        equipo: apuesta.equipo,
        posAlonso: apuesta.posAlonso,
        posSainz: apuesta.posSainz,
      })
      console.log("...FIREBASE UPDATE DOC OK");
      return true
    } catch(e) {
      try {
        await setDoc(docRef, apuesta);
        console.log("...FIREBASE NEW DOC OK");
        return true
      } catch(error) {
        console.log("...FIREBASE ERROR", error);
        return false
      }
    }
  }

  public async addClasificacion(clasificacion: Clasificación) {
    const docRef=doc(this.firestore, "clasificacion", clasificacion.round.toString());
    try {
      await updateDoc(docRef, {
        round: clasificacion.round,
        carrera: clasificacion.puntos
      })
      console.log("...FIREBASE UPDATE DOC OK");
      return true
    } catch(e) {
      try {
        await setDoc(docRef, clasificacion);
        console.log("...FIREBASE NEW DOC OK");
        return true
      } catch(error) {
        console.log("...FIREBASE ERROR", error);
        return false
      }
    }
  }

  public async getApuestas(round: number): Promise<any[]> {
    const q=query(collection(this.firestore, "apuestas"), where("race.round", "==", round.toString()));
    const querySnapshot=await getDocs(q);
    const apuestas=querySnapshot.docs.map(doc => doc.data());
    return apuestas;
  }

}
