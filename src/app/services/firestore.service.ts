import {Injectable} from '@angular/core';
import {collection, addDoc} from 'firebase/firestore';
import {getFirestore} from "firebase/firestore";
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../environments/environment';
import {Apuesta} from '../interfaces/apuesta';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  app=initializeApp(firebaseConfig);
  db=getFirestore(this.app);

  constructor() { }

  public async addApuesta(apuesta: Apuesta) {
    try {
      const docRef=await addDoc(collection(this.db, "apuestas"), apuesta);
      console.log("Document written with ID: ", docRef.id);
    } catch(e) {
      console.error("Error adding document: ", e);
    }
  }
}
