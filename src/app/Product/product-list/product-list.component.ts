import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
  

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'table-overview-example',
  templateUrl : "./product-list.component.html"
})
export class ProductListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'rating','amount','status','description','Image','Actions'];

  dataSource: MatTableDataSource<Product>;

  product : Product[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ProductService,private route: ActivatedRoute, private router:Router) {


    this.service.getProducts().subscribe(data=>{
      this.product = data;
      // console.log( this.product);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })

  }

  deleteProduct(id:any){
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không có khả năng hoàn nguyên lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.service.deleteProduct(id).subscribe(data=>{
          // location.href="/admin/products"
          this.router.navigateByUrl("/admin/products")
        })
        Swal.fire(
          'Xóa thành công!',
          'Bạn đã xóa thành công',
          'success'
        )
      }
    })
   
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
