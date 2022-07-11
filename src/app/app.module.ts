import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SizerComponent } from './sizer/sizer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NodeItemComponent } from './node-item/node-item.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertNodeItemComponent } from './insert-node-item/insert-node-item.component';
import {Routes , RouterModule} from '@angular/router'
import { StudentComponent } from './Student/StudentList/student.component';
import { AddStudentComponent } from './Student/AddStudent/AddStudent.component';
import { UpdateStudentComponent } from './Student/UpdateStudent/UpdateStudent.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { RegisterComponent } from './register/register.component';
import { InsertEmployeeComponent } from './insert-employee/insert-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { InsertProductComponent } from './Product/insert-product/insert-product.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { isSubmitGuard } from 'src/guards/isSubmit.guard';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';


const appRouters : Routes = [
  {
    path:"" , component:LoginComponent
  },{
    path:"table" , component:DataTableComponent
  },
  {
    path:"user" , component:HomeComponent
  },{
    path:"register" , component:RegisterComponent
  },
  {
    path:"employees" , component:HomeComponent,
  },{
    path:"addstudent" , component:StudentComponent,
  },{
    path:"editstudent/:id" , component:UpdateStudentComponent,
  },
  {
    path:"login" , component:LoginComponent,
  },
  {
    path:"admin" , component:MainLayoutComponent,
    canActivate:[AuthGuard],//khai báo guard dùng để ràng buộc phải đăng nhập mới được vào
    children:[
      { path:"students" , component:NodeItemComponent,},          
      { path:"addstudent" , component:StudentComponent},
      {
        path:"employees" , component:HomeComponent,
      },
      {
        path:"addemployee" , component:InsertEmployeeComponent,canDeactivate:[isSubmitGuard],
      }  ,
      {
        path:"employees/:id" , component:UpdateEmployeeComponent,
      } ,
      {
        path:"employees/detail/:id" , component:EmployeeDetailComponent,
      } ,
      {
        path:"products" , component:ProductListComponent,
      }  
      ,
      {
        path:"addproduct" , component:InsertProductComponent,
      }  
      ,
      {
        path:"product/:id" , component:UpdateProductComponent,
      }  ,
      {
        path:"product/detail/:id" , component:ProductDetailComponent,
      }  
      ],
  },
  {path:'**', component:LoginComponent},// '**' có ý nghĩa nếu không có path nào khớp với các path đã khai báo trong routes 
]
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SizerComponent,
    NodeItemComponent,
    InsertNodeItemComponent,
    StudentComponent,
    LoginComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    RegisterComponent,
    InsertEmployeeComponent,
    UpdateEmployeeComponent,
    ProductListComponent,
    InsertProductComponent,
    UpdateProductComponent,
    DataTableComponent,
    EmployeeDetailComponent,
    ProductDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRouters),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features=> dùng cho chức năng update
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
