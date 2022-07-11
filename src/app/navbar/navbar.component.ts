import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { SharingService } from '../services/sharing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayName:string="";
  constructor(private userService:UserService,
    public authService: AuthService,
    private sharingService : SharingService,
		   private router:Router) { 
        this.userService.getCurrentUser()
        .then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);	
      // console.log(this.displayName);	
        this.sharingService.isUserLoggedIn
				.subscribe(value => {
						if(value){
              this.userService.getCurrentUser()
              .then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);	
            // console.log(this.displayName);	
            }else{
              this.displayName =""
            }
          
           })

    	
  }

  logout(){
    Swal.fire({
      title: 'Bạn có chắc là đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        if(localStorage.getItem('user')){
          this.authService.Logout()
          this.router.navigateByUrl("login")
        }else{
          this.authService.logout();
          this.router.navigateByUrl("login")
        }
      }
    })

    
   
    // location.href="/login";
  }

  ngOnInit(): void {
    alert(this.displayName)
  }

}
