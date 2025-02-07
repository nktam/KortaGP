import {Injectable} from '@angular/core';
import {collection, addDoc, setDoc, doc, updateDoc, where, query, getDocs} from 'firebase/firestore';
import {Apuesta} from '../interfaces/apuesta';
import {Firestore} from "@angular/fire/firestore";
import {Clasificación} from '../interfaces/clasificacion';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  public async addApuesta(apuesta: Apuesta) {
    const nombre=apuesta.race?.round+'_'+apuesta.usuario.id;
    const docRef=doc(this.firestore, "apuestas", nombre);
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
        puntosUsuarios: clasificacion.puntosUsuarios,
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

  public async updatePuntosAntesApuesta(clasificacion: Clasificación) {
    clasificacion.puntosUsuarios.forEach(async e => {
      const round=clasificacion.round-1;
      const nombre=round+'_'+e.usuario.id;
      const docRef=doc(this.firestore, "apuestas", nombre);
      try {
        await updateDoc(docRef, {
          puntosUsuarios: clasificacion.puntosUsuarios,
        })
        console.log("...FIREBASE UPDATE DOC OK");
        return true
      } catch(e) {
        console.log("...FIREBASE ERROR", e);
        return false
      }
    });
  }

  public async getApuestas(round: number): Promise<any[]> {
    const q=query(collection(this.firestore, "apuestas"), where("race.round", "==", round.toString()));
    const querySnapshot=await getDocs(q);
    const apuestas=querySnapshot.docs.map(doc => doc.data());
    return apuestas;
  }

}
