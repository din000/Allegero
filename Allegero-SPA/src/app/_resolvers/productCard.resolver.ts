import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/Item';
declare let alertify: any;

@Injectable()
export class ProductCardResolver implements Resolve<Item> {

    constructor(private userService: UserService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Item> {
        return this.userService.getAuction(route.params.idAuction).pipe(
            catchError(error => {
                alertify.error('Problem z pobraniem danych');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
