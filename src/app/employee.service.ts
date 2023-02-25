import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  APIURL = "http://localhost:8095";
  constructor(private httpClient: HttpClient) {}
  private handleError(error: any) {
    return throwError(error);
  }
  getEmployee(): Observable<any> {
    return this.httpClient
      .get(this.APIURL + `/employee`)
      .pipe(catchError(this.handleError));
  }
  updateVacation(payload: any): Observable<any> {
    const { id, value } = payload;
    return this.httpClient
      .get(this.APIURL + `/takeVacation/${id}/${value}`)
      .pipe(catchError(this.handleError));
  }
  updateWork(payload: any): Observable<any> {
    const { id, value } = payload;
    return this.httpClient
      .get(this.APIURL + `/work/${id}/${value}`)
      .pipe(catchError(this.handleError));
  }
}
