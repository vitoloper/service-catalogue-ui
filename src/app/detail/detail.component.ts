import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService, ServiceService } from '@app/_services';

import { environment } from '@environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  loading = false;
  serviceId;
  service;
  apiUrl = environment.apiUrl;

  constructor(private userService: UserService, private serviceService: ServiceService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.loading = true;

        this.serviceService.get(this.serviceId).subscribe(
            result => {
                console.log(result);
                this.loading = false;
                this.service = result;
            },
            err => {
                this.loading = false;
                console.log(err);
            }
        );
  }

}
