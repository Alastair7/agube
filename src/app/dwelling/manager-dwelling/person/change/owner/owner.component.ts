import { Component  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingCreate, DwellingService, UserDetail } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { ChangeComponent } from '../change.component';

@Component({
  selector: 'app-owner',
  templateUrl: '../change.component.html',
  styleUrls: ['../change.component.scss'],
})
export class OwnerComponent extends ChangeComponent {
  constructor(
    router: Router,
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    svcNotification: NotificationService,
    svcDwelling: DwellingService
  ) {
    super(router, route, formBuilder, svcNotification, svcDwelling);
    this.title = 'Propietario';
  }

  override ngOnInit() {
    super.ngOnInit();
    this.loadCurrentOwner();
  }

  private onSave() {
    this.loadingPost = true;
    let user: UserDetail = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      phones: [{ phone_number: this.phone_number.value }],
      address: [
        this.dwelling!.full_address,
        // {
        //   address: {
        //     town: 'string',
        //     street: 'string',
        //     is_external: false,
        //   },
        //   number: 7,
        //   flat: 'string',
        //   gate: 'string',
        // },
      ],
    };
    return this.svcDwelling.changeCurrentOwner(this.dwellingId,  {user})
  }

  override save() {
    super.save();
    this.onSave().subscribe({
      next: (response) => {
        this.resetForm();
        this.loadCurrentOwner();
        this.loadingPost = false;
      },
      error: (error) => {
        this.svcNotification.warning({ message: error });
        this.loadingPost = false;
      },
    });
  }

  override saveAndExit() {
    super.save();
    this.onSave().subscribe({
      next: (response) => {
        this.resetForm();
        this.loadingPost = false;
        this.exit();
      },
      error: (error) => {
        this.svcNotification.warning({ message: error });
        this.loadingPost = false;
      },
    });
  }

  private loadCurrentOwner(){
    this.svcDwelling.getCurrentOwner(this.dwellingId)
      .subscribe(response => this.currentPerson = response.user);
  }

  private resetForm() {
    this.first_name.setValue('');
    this.last_name.setValue('');
    this.email.setValue('');
    this.phone_number.setValue('');
  }
}
