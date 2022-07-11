import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return new Promise((resolve,reject)=>{
        this.userService.getCurrentUser() //kiem tra có user đang đăng nhập hay không nếu có trả về true, ngược lại trả về false
          .then(user=>{
            
            resolve(true)
          }, 
          err=>{
            resolve(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Bạn cần đăng nhập để để duy trì!',
              footer: '<a href="/login">Đăng nhập</a>'
            })
            this.router.navigate(["/login"]);
          }
        )

        }) 



    // return true;
  }

  
  
}
