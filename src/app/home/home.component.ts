import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService, ServiceService } from '@app/_services';

import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    services = [];
    apiUrl = environment.apiUrl;

    constructor(private userService: UserService, private serviceService: ServiceService,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        /* this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });*/

        this.serviceService.getAll().subscribe(
            results => {
                console.log(results);
                this.loading = false;
                this.services = results;
            },
            err => {
                this.loading = false;
                console.log(err);
            }
        );
    }

    goToDetail(id) {
        this.router.navigate(['/detail', id]);
    }
}