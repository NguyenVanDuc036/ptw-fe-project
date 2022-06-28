import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
		private router: Router,
  ) { }
  tryGoogleLogin(){
    this.authService.signinGmail()
     .then(res=>{
       this.router.navigateByUrl("/home")
      //  location.href="/home"
       }).catch(err=>{
         console.log(err); 
       })
   }		

  ngOnInit(): void {
  }

}
