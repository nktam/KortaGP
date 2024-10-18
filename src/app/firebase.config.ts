import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {enviroment} from "./environments/environment";
import {provideAuth, getAuth} from "@angular/fire/auth";
import {provideFirestore, getFirestore} from "@angular/fire/firestore";

const firebaseProviders: EnvironmentProviders[]=[
    provideFirebaseApp(() => initializeApp(enviroment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
];

export {firebaseProviders};