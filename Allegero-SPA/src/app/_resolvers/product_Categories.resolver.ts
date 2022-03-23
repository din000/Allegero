import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';
import { Item } from '../_models/Item';
declare let alertify: any;

@Injectable()
export class product_CategoriesResolver implements Resolve<Item> {

    constructor(private userService: UserService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Item> {
        return this.userService.getProduct_Categories()
        .pipe(
            catchError(error => {
                alertify.error('SPA: Problem z pobraniem kategorii');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
