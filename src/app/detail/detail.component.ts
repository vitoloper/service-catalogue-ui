import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef} from '@angular/core';
import { UserService, AuthenticationService, ServiceService } from '@app/_services';

import { environment } from '@environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit, AfterViewInit {
  loading = false;
  serviceId;
  service;
  apiUrl = environment.apiUrl;
  ui;

  constructor(private userService: UserService, private serviceService: ServiceService,
    private router: Router, private route: ActivatedRoute, private el: ElementRef) { }

  DisableTryItOutPlugin = function() {
    return {
      statePlugins: {
        spec: {
          wrapSelectors: {
            allowTryItOutFor: () => () => false
          }
        }
      }
    }
  }

  DisableAuthorizePlugin = function() {
    return {
      wrapComponents: {
        authorizeBtn: () => () => null
      }
    };
  };

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.loading = true;

      this.serviceService.get(this.serviceId).subscribe(
          result => {
              console.log(result);
              this.loading = false;
              this.service = result;

              if (this.service.swagger_json_file) {
                // Initialize swagger UI
                this.ui = SwaggerUI({
                url: this.apiUrl+this.service.swagger_json_file.url,
                domNode: this.el.nativeElement.querySelector('.swagger-container'),
                deepLinking: true,
                presets: [
                  SwaggerUI.presets.apis
                ],
                plugins: [
                  this.DisableTryItOutPlugin,
                  this.DisableAuthorizePlugin
                ]
              });
              }
          },
          err => {
              this.loading = false;
              console.log(err);
          }
      );
  }

}
