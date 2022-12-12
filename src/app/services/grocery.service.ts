import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  constructor(private http: HttpClient) { }
  getGroceryList(): any {
    return this.http.get('http://localhost:8080/grocery-shopper/item')
  }
  getItembyId(id: number) {
    return true
  }
  addGroceryItem(itemArray:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(itemArray);
    return this.http.post('http://localhost:8080/grocery-shopper/item', body,{'headers':headers})
  } 
  updateGroceryPurchased(itemArray:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(itemArray);
    return this.http.put('http://localhost:8080/grocery-shopper/item/' + itemArray.id, body,{'headers':headers})
  } 
  updateGrocery(itemArray:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(itemArray);
    return this.http.put('http://localhost:8080/grocery-shopper/item/' + itemArray.id, body,{'headers':headers})
  } 
  deleteItem(id: any) {
    return true
  }
}
