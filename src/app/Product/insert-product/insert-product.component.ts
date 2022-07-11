import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent implements OnInit {


  eamilPattern:string;
  insertFrm: FormGroup;

  // name , price , rating ,status,description ,srcImg
  
  constructor(private fb: FormBuilder,private service: ProductService,private router:Router) {

    this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

    this.insertFrm = this.fb.group({
      name:['',[Validators.required]],
      price:['', Validators.required],
      rating:['', Validators.required],
      status:['', Validators.required],
      amount:['', Validators.required],
      description:['', Validators.required],
   })
   }

  ngOnInit(): void {
  }

  insertProduct(){
    

   

  }

  onSubmit(){
    let product: Product={};
    product.name =   String(this.insertFrm.controls["name"].value);
    product.id =  Date.now()
    product.price =  this.insertFrm.controls["price"].value;
    product.amount =  this.insertFrm.controls["amount"].value;
    product.rating =   this.insertFrm.controls["rating"].value;
    product.status =   this.insertFrm.controls["status"].value;
    product.description =   String(this.insertFrm.controls["description"].value);
    product.srcImg =  'https://picsum.photos/200/300?random=1'

    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: `Thêm sản phẩm thành công`,
    })
    this.service.insertProduct(product).subscribe(data=>{
      location.href="/admin/products";
    })
    this.router.navigateByUrl("/admin/products")

    
     

    
  }

}