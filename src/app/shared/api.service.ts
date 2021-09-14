import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {
  }

  postEmployee(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmployee() {
    return this._http.get<any>("http://localhost:3000/posts")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEmployeeData(data:any){
    return this._http.delete<any>("http://localhost:3000/posts/"+data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateEmployeeData(data:any,id:any){
    return this._http.patch<any>("http://localhost:3000/posts/"+id,data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}
