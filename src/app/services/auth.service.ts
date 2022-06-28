import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { SharingService } from './sharing.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router:Router,
    private sharing : SharingService
  ) { }


  async signinGmail(){
    var provider = new firebase.auth.GoogleAuthProvider();
    return await  this.afAuth.signInWithPopup(provider)
            .then(res=>{
              this.sharing.isUserLoggedIn.next(true)

      //  this.router.navigate(['home']);
              // this.router.navigate(['home']);
      })
  }


  logout(){
    return new Promise<any>((resolve,reject)=>{
      if (this.afAuth.user){
      //if (this.fauth.auth.currentUser){
  
      this.afAuth.signOut();
      this.sharing.isUserLoggedIn.next(false);
      // resolve("log out");
      }else{
      reject();
      }
  
    })
  }

  
}
