import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Repos } from "../models/repos";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private url = "https://api.github.com/search/users";
  constructor(private http: HttpClient) {}

  search(name: string) {
    name = name.trim() || "a";
    const options = { params: new HttpParams().set("q", name) };

    return this.http.get(this.url, options);
  }

  getRepos(url: string): Observable<Repos[]> {
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
  }

  extractData(res: any) {
    const repos: Repos[] = res.map(rep => {
      return new Repos(rep);
    });
    return repos;
  }
  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
