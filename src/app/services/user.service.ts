import { Injectable } from '@angular/core';
		import {Observable} from 'rxjs'; 
		import firebase from 'firebase/compat/app';
		import { AngularFirestore } from '@angular/fire/compat/firestore';
		import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore,	public afAuth: AngularFireAuth) { }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function(user){
      if (user) {
        resolve(user);
      } else {				 
        reject('No user logged in');
      }
      })
  })
}

}
