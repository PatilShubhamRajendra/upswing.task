import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    path = "assets/tabledata.json";

    // Get 
    getProducts(): Observable<any> {
        return this.http.get(this.path);
    }

};