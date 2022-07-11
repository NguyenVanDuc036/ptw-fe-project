import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-product',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {

  eamilPattern:string;
  insertFrm: FormGroup;
  param:number;
  productDetail:any;
  constructor(private fb: FormBuilder,private service: ProductService,private route: ActivatedRoute,private router:Router) { 
    this.productDetail = []
  }

  
  ngOnInit(): void {
    //Lay gia trị của tham số route----------------
    this.route.paramMap.subscribe( paramMap => {// quan tam den su thay doi param
      this.param = Number(paramMap.get('id'));
      

      this.service.getProductsDetail(Number(this.param)).subscribe((result:Product[])=>{

        this.productDetail = result;
        
        
    }, (errors)=> {
        console.log(errors.error)
    })



    })

    

  }

}
