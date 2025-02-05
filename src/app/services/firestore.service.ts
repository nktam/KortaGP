import {Injectable} from '@angular/core';
import {collection, addDoc, setDoc, doc, updateDoc, where, query, getDocs} from 'firebase/firestore';
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
      return true
    } catch(e) {
      await setDoc(docRef, apuesta);
      console.log("...FIREBASE ERROR", e);
      return false
    }
  }

  public async getApuestas(round: number): Promise<any[]> {
    const q=query(collection(this.firestore, "apuestas"), where("race.round", "==", round.toString()));
    const querySnapshot=await getDocs(q);
    const apuestas=querySnapshot.docs.map(doc => doc.data());
    return apuestas;
  }

}
