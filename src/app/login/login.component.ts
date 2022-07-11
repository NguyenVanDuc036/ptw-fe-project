import { Account } from './../models/account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  eamilPattern:string;
  insertFrm: FormGroup;
  constructor(private fb: FormBuilder, private afAuth: AuthService,public authService: AuthService,
		private router: Router) {
    this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.insertFrm = this.fb.group({
      email:['',[Validators.required,Validators.minLength(6), Validators.maxLength(20)],Validators.pattern(this.eamilPattern)],
      password:['', Validators.required,Validators.minLength(4), Validators.maxLength(12)],
   }
  )
  }

  tryGoogleLogin(){
    this.authService.signinGmail()
     .then(res=>{
       this.router.navigateByUrl("/admin/employees")
       }).catch(err=>{
         console.log(err); 
       })
   }

  async onSubmit(){			
    if (this.insertFrm.controls["email"].value =='')
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email không được bỏ trống!',
      })
    }else if(this.insertFrm.controls["password"].value ==''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mật khẩu không được bỏ trống!',
      })
    }else{
      this.afAuth.signIn(this.insertFrm.controls["email"].value,this.insertFrm.controls["password"].value)
    .then(res=>{
      this.router.navigateByUrl("/admin")
      }).catch(err=>{
      })
    }


    

    
  }

  ngOnInit(): void {

  }
  

}
