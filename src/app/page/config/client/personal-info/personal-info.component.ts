import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { PersonalInfo } from './personal-info';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['../client-page.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  public loadSave: boolean = false;
  public personalForm: FormGroup;
  public username = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public first_name = new FormControl('', [Validators.required]);
  public last_name = new FormControl('', [Validators.required]);

  public releaseDate: Date | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService
  ) {
    this.personalForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
    });
  }

  ngOnInit(): void {
    //FIXME: Receive data to initialize
  }

  saveForm() {
    this.loadSave = true;
    let personalInfo: PersonalInfo = {
      email: this.username.value,
      first_name: this.username.value,
      last_name: this.username.value,
      username: this.username.value,
    };

    //FIXME: save data with service and progress bar
    this.svcNotification.info({
      message: 'Funcionalidad todavía no implementada ' + personalInfo,
    });
    this.loadSave = false;
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'username':
        if (this.username.hasError('required')) {
          return 'PERSONAL_INFO.FORM.VALIDATIONS.USERNAME';
        }
        return '';
      case 'email':
        if (this.email.hasError('required')) {
          return 'PERSONAL_INFO.FORM.VALIDATIONS.EMAIL.REQUIRED';
        }
        if (this.email.hasError('email')) {
          return 'PERSONAL_INFO.FORM.VALIDATIONS.EMAIL.FORMAT_STANDARD';
        }
        return '';
      case 'first_name':
        if (this.first_name.hasError('required')) {
          return 'PERSONAL_INFO.FORM.VALIDATIONS.FIRST_NAME';
        }
        return '';
      case 'last_name':
        if (this.last_name.hasError('required')) {
          return 'PERSONAL_INFO.FORM.VALIDATIONS.LAST_NAME';
        }
        return '';
      default:
        return '';
    }
  }
}
