import { Coordinates } from './../../../components/map/map/configure-map';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DwellingCreate, DwellingService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
    selector: 'app-page-dwelling-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends CreateAddress implements OnInit {
    public dwellingForm: FormGroup | undefined;
    public code = new FormControl('', [Validators.required]);

    public loadingPost = false;

    constructor(
        private router: Router,
        private svcNotification: NotificationService,
        private svcDwelling: DwellingService,
        private svcDwellingCache: DwellingCacheService,
        private formBuilder: FormBuilder,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        super();

        this.googleAnalyticsService.pageView('/create_dwelling', 'create_dwelling');
    }

    ngOnInit(): void {
        this.svcDwellingCache.get().then((response) => {
            if (response && response.length > 0) {
                this.configureMap.otherPoints = response.map((dwelling) => build(dwelling));
            }
        });
    }

    public override addressFormReceive(addressEmitter: AddressEmitter) {
        super.addressFormReceive(addressEmitter);
        this.dwellingForm = this.formBuilder.group({
            address: addressEmitter.addressFormGroup,
            water_meter: this.formBuilder.group({
                code: this.code,
            }),
        });
    }

    public exit() {
        this.router.navigate(['manager/dwellings']);
    }

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.svcDwellingCache.clean();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_dwelling', {
                    manager_id: response.id,
                    water_meter: response.water_meter,
                    geolocation: {
                        address: response.geolocation.address,
                        latitude: response.geolocation.latitude,
                        longitude: response.geolocation.longitude,
                        zoom: response.geolocation.zoom,
                        horizontal_degree: response.geolocation.horizontal_degree,
                        vertical_degree: response.geolocation.vertical_degree,
                        number: response.geolocation.number,
                        flat: response.geolocation.flat,
                        gate: response.geolocation.gate,
                    },
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_dwelling_create', true);
            },
        });
    }

    public saveAndExit() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.svcDwellingCache.clean();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_dwelling_exit', {
                    manager_id: response?.id,
                    water_meter: response.water_meter,
                    geolocation: {
                        address: response.geolocation.address,
                        latitude: response.geolocation.latitude,
                        longitude: response.geolocation.longitude,
                        zoom: response.geolocation.zoom,
                        horizontal_degree: response.geolocation?.horizontal_degree,
                        vertical_degree: response.geolocation?.vertical_degree,
                        number: response.geolocation?.number,
                        flat: response.geolocation?.flat,
                        gate: response.geolocation?.gate,
                    },
                });
                this.exit();
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_dwelling_create', true);
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'code':
                if (this.code.hasError('required')) {
                    return 'PAGE.DWELLING.CREATE.CODE_COUNTER.VALIDATION';
                }

                return '';
            default:
                return '';
        }
    }

    private resetForm() {
        this.resetChildForm = !this.resetChildForm;
        this.code.setValue('');
    }

    private onSave() {
        let dwelling: DwellingCreate = {
            geolocation: this.getGeolocation(),
            water_meter: {
                code: this.code.value,
            },
        };

        return this.svcDwelling.createDwelling(dwelling);
    }
}
