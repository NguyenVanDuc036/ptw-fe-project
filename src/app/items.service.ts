import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { NodeItem } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) {
   }

  getItems():Observable <NodeItem[]>{
    return this.http.get<NodeItem[]>('http://localhost:3500/api/items');
  }

  getStudents():Observable <NodeItem[]>{
    return this.http.get<NodeItem[]>('http://localhost:3500/api/students');
  }

  deleteStudent(id:any):Observable <NodeItem[]>{
    return this.http.delete<NodeItem[]>(`http://localhost:3500/api/students/${id}`);
  }



  insertItem(item:NodeItem): Observable<NodeItem> {
    	const headers = { 'content-type': 'application/json'} 
    	console.log(JSON.stringify(item))						
      return this.http.post<NodeItem>('http://localhost:3500/api/students/', item, {'headers':headers});
  }

  updateStudent(item:NodeItem , id:any): Observable<NodeItem> {
    const headers = { 'content-type': 'application/json'} 
    console.log(JSON.stringify(item))						
    return this.http.put<NodeItem>(`http://localhost:3500/api/students/${id}`, item, {'headers':headers});
}

}


// export class NodeItem { id?: string; name?: string; }