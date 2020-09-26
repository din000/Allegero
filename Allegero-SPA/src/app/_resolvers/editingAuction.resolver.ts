import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';
import { Item } from '../_models/Item';
import { User } from '../_models/User';
declare let alertify: any;

@Injectable()
export class EditingAuctionResolver implements Resolve<Item> {

    constructor(private userService: UserService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Item> {
        return this.userService.takeEditingAuction(route.params.idUser)
        .pipe(
            catchError(error => {
                alertify.error('Problem z pobraniem uzytkownika');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
