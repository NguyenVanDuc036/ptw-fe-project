import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InsertEmployeeComponent } from 'src/app/insert-employee/insert-employee.component';




@Injectable({providedIn: 'root'})
export class isSubmitGuard implements CanDeactivate<InsertEmployeeComponent> {
    canDeactivate(
        component: InsertEmployeeComponent, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {

        if(component.isSubmit) {
            return true;
        }


        if(confirm('Bạn có chắc muốn rời khỏi trang này?')) {
            return true;
        }

        return false;
    }
}