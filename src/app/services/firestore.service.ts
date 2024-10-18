import {Injectable} from '@angular/core';
import {collection, addDoc} from 'firebase/firestore';
import {Apuesta} from '../interfaces/apuesta';
import {Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  public async addApuesta(apuesta: Apuesta) {
    try {
      const docRef=await addDoc(collection(this.firestore, "apuestas"), apuesta);
      console.log("Document written with ID: ", docRef.id);
    } catch(e) {
      console.error("Error adding document: ", e);
    }
  }
}
