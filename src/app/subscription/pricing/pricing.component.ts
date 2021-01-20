import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Permission,
  Subscription,
  SubscriptionService,
} from 'apiaux/subscription-rest-api-lib/src/public-api';

export interface SubscriptionPermissions {
  subscription: Subscription;
  permissions: Permission[];
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {

  public subscriptions: SubscriptionPermissions[];

  public permissionColumns: string[];

  constructor(
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.subscriptions = [];
    this.permissionColumns = ['name'];
  }

  public ngOnInit(): void {
    this.subscriptionService.subscriptionList().subscribe((subscriptions) => {
      subscriptions.forEach((subscription) =>
        this.subscriptionService
          .subscriptionPermissionsList(subscription.id)
          .subscribe((permissions) => {
            this.subscriptions.push({subscription: subscription, permissions: permissions});
          })
      );
    });
  }

  public sendUrl(url: string): void {
    this.router.navigate(['/forms', { id: url }]);
  }
}
