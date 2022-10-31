import { SidebarComponent } from '../sidebar.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-page-home-client',
    templateUrl: '../sidebar.component.html',
    styleUrls: ['../sidebar.component.scss'],
})
export class ClientComponent extends SidebarComponent {
    public override home: string = 'client/dwellings';
    public override profile: string = 'client/config';
    ngOnInit(): void {
        this.pages = [
            {
                navigationRoute: this.profile,
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_PROFILE',
                icon: 'person',
            },
            {
                navigationRoute: this.home,
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_MY_DWELLING',
                icon: 'store',
            },
        ];
    }
}
