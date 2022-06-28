import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html',
  styleUrls: ['./sizer.component.css']
})
export class SizerComponent implements OnInit {

  size:number = 10

  dec(){
    if(this.size > 10){
      this.size -= 5;
    }
  }

  cre(){
    this.size+= 5;
  }



  constructor() { }

  ngOnInit(): void {
  }

}
