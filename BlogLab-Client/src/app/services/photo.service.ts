import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../models/photo/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

    create = (model: FormData):Observable<Photo>  => 
      this.http.post<Photo>(`${environment.webApi}/Photo`,model)

    get = (photoId: number): Observable<Photo> => 
      this.http.get<Photo>(`${environment.webApi}/Photo/${photoId}`)

    GetByApllicationUserId = (): Observable<Photo[]> => 
      this.http.get<Photo[]>(`${environment.webApi}/Photo`)

    delete = (photoId: number): Observable<number> =>  
      this.http.delete<number>(`${environment.webApi}/Photo/${photoId}`)
}
