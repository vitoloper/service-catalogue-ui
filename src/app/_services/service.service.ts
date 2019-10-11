import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiceService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/services`);
    }

    get(id) {
        return this.http.get<any[]>(`${environment.apiUrl}/services/${id}`);
    }
}