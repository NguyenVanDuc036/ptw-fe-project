import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  eamilPattern:string;
  insertFrm: FormGroup;
  param:number;
  productDetail:any;
  constructor(private fb: FormBuilder,private service: ProductService,private route: ActivatedRoute,private router:Router) { 
    this.productDetail = []
    this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.param = 0;
    this.insertFrm = this.fb.group({
    name:['',[Validators.required]],
    price:['', Validators.required],
    amount:['', Validators.required],
    rating:['', Validators.required],
    status:['', Validators.required],
    description:['', Validators.required],
    // srcImg:['', Validators.required],
 })
  }

  onSubmit(){
    
    let product: Product={};
    product.name =   String(this.insertFrm.controls["name"].value);
    product.id =  Date.now()
    product.price =  this.insertFrm.controls["price"].value;
    product.rating =   this.insertFrm.controls["rating"].value;
    product.status =   this.insertFrm.controls["status"].value;
    product.amount =   this.insertFrm.controls["amount"].value;
    product.description =   String(this.insertFrm.controls["description"].value);


    

    

    this.service.updateProduct(product,this.param).subscribe(data=>{
      // location.href="/admin/products";
    })

    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: `Bạn đã cập nhật thành công sản phẩm`,
    })

    this.router.navigateByUrl("/admin/products")

    

    
  }
  
  ngOnInit(): void {
    //Lay gia trị của tham số route----------------
    this.route.paramMap.subscribe( paramMap => {// quan tam den su thay doi param
      this.param = Number(paramMap.get('id'));
      

      this.service.getProductsDetail(Number(this.param)).subscribe((result:Product[])=>{

        this.productDetail = result;
        console.log({result});
        
        console.log(this.productDetail);
        
        
    }, (errors)=> {
        console.log(errors.error)
    })



    })

    

  }

}
