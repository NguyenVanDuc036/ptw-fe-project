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


const appRouters : Routes = [
  {
    path:"home" , component:HomeComponent
  },
  {
    path:"students" , component:NodeItemComponent,
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
      { path:"addstudent" , component:StudentComponent,}           
      ],
  },
  {path:'**', component:LoginLayoutComponent},// '**' có ý nghĩa nếu không có path nào khớp với các path đã khai báo trong routes 
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
    LoginLayoutComponent
  ],
  imports: [
    RouterModule.forRoot(appRouters),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features=> dùng cho chức năng update
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
