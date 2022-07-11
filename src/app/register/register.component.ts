
import { Account } from './../models/account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  eamilPattern:string;
  insertFrm: FormGroup;
  constructor(private fb: FormBuilder, private afAuth: AuthService ,private router: Router) {
    this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.insertFrm = this.fb.group({
      email:['',[Validators.required,Validators.minLength(6), Validators.maxLength(20)],Validators.pattern(this.eamilPattern)],
      password:['', Validators.required,Validators.minLength(4), Validators.maxLength(12)],
   }
  )
  }

  onSubmit(){			
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
      
    this.afAuth.signUp(this.insertFrm.controls["email"].value,this.insertFrm.controls["password"].value)
    .then(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Bạn đã đăng ký thành công'
      })
      this.router.navigateByUrl("/login")
      }).catch(err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err}`,
        })
      })
    }

    
  }

  isSignedIn = false;
  ngOnInit(): void {
      if(localStorage.getItem('user')!==null){
        this.isSignedIn = true;
      }else{
        this.isSignedIn = false;
      }
  }
  

}
