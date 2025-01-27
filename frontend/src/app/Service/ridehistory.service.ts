import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RidehistoryService {
  // private url = 'http://localhost:4000'
  private serverUrl = 'https://carpooling-ten.vercel.app';


  constructor(private http: HttpClient) {}

  

  //----------------------DOWNLAOD RIDE-HISTORY DATA---------------------//
  downlaodallData(alldataatonce: any): Observable<any>{
    // console.log(alldataatonce);
    
    return this.http.post(`${this.serverUrl}/downloadridehistory`,{alldataatonce});
  }

}
