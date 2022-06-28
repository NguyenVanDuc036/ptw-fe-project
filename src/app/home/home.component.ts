import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
export interface Item{id?: string, name?: string, classID?: string}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  //items: Observable<Item[]>;
  items : Item[]=[];
  config: any;
  constructor(private readonly afs: AngularFirestore) {
    
    this.itemsCollection = this.afs.collection<Item>('items');

    this.itemsCollection.valueChanges( { idField: 'idField' }).subscribe(data=>{
      this.items=data;

      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.items.length
      };

    });

  }

  ngOnInit(): void {
    // this.add("55","55","Nguyễn Văn Đức","QL100");
    // this.update("55","66","Nguyễn Văn Cao","QL200");
    // this.delete('55');
  }
  add (docid:string, id:string, name:string, classID: string){
    let item: Item={};
    item.id=id;
    item.name=name;
    item.classID=classID;
    this.itemsCollection.doc(docid).set(Object.assign({}, item));
  }
  update(docid:string,id:string, name:string, classID:string){
    let docId =docid
    let item : Item = {};
    item.id=id
    item.name = name
    item.classID=classID
    this.itemsCollection.doc(docId).update(item);
  }
  delete(docId:any){
    this.itemsCollection.doc(docId).delete();
  }
  pageChanged(event:number){
    this.config.currentPage = event;
  }
}