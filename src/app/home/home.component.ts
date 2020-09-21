import { Component, OnInit, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService, ServiceService } from '@app/_services';

import { environment } from '@environments/environment';
import { Router } from '@angular/router';

declare var $: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, AfterViewInit {
    loading = false;
    services = [];
    apiUrl = environment.apiUrl;

    cardTitle = "Custom Title";

    constructor(private userService: UserService, private serviceService: ServiceService,
        private router: Router) { }

    ngAfterViewInit() {}

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

                // Description field processing (set to the desired length)
                let desiredLength = 50;
                for (let i = 0; i < this.services.length; i++) {
                    let len = this.services[i].description.length;

                    /* // Add spaces
                    if (len < desiredLength) {
                        let strToAppend = 'a'.repeat(desiredLength - len);
                        this.services[i].description = this.services[i].description + strToAppend;
                    } */

                    // Truncate
                    if (len > desiredLength) {

                    }
                }

                setTimeout(function () {
                    $(".owl-easytv").owlCarousel(
                        {
                            loop: !1,
                            margin: 0,
                            nav: !0,
                            dots: !0,
                            lazyLoad: !1,
                            responsive: { 0: { items: 1 }, 768: { items: 2 }, 990: { items: 3 }, 1024: { items: 3 }, 1280: { items: 4 } }
                        });
                }, 0);
                

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