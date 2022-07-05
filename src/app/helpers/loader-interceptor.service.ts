import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  private requests: HttpRequest<any>[] = [];

  constructor(private globalService: GlobalService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.globalService.setMainLoading(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    console.log("No of requests--->" + this.requests.length);

    this.globalService.setMainLoading(true);
    return new Observable((observer) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            console.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}

