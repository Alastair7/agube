import { Component, HostListener, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaterMeterService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { noFutureDate } from './no-future-date';
import { WaterMeterDialogData } from './water-meter-dialog-data';
import { set, format } from 'date-fns';

@Component({
  selector: 'app-measure-dialog',
  templateUrl: './measure-dialog.component.html',
  styleUrls: ['./measure-dialog.component.scss'],
})
export class MeasureDialogComponent {
  public waterMeterId: number = -1;
  public measureForm: FormGroup;
  public measurement = new FormControl('', [Validators.required]);
  public date = new FormControl(new Date(), [
    Validators.required,
    noFutureDate,
  ]);
  public hour = new FormControl('', [Validators.required]);
  public minutes = new FormControl('', [Validators.required]);

  // range for mat-select
  public hoursList = this.range(24);
  public minutesList = this.range(60);

  constructor(
    private formBuilder: FormBuilder,
    private readonly svcWaterMeter: WaterMeterService,
    public dialogRef: MatDialogRef<MeasureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: WaterMeterDialogData,
    private svcNotification: NotificationService
  ) {
    this.waterMeterId = data.waterMeterId;
    this.measureForm = this.formBuilder.group({
      measurement: this.measurement,
      date: this.date,
      hour: this.hour,
      minutes: this.minutes,
    });

    if (data.lastMeasurement) {
      this.measurement.setValue(data.lastMeasurement.measurement);
    }

    this.date.setValue(new Date());
  }

  public save(): void {
    // stop here if form is invalid
    if (this.measureForm.invalid) {
      return;
    }

    let date = set(this.date.value, {
      hours: this.hour.value,
      minutes: this.minutes.value,
    });

    this.svcWaterMeter
      .addWaterMeterMeasure(this.waterMeterId, {
        measurement: this.measurement.value,
        date: date,
      })
      .subscribe({
        next: (response) => this.close(true),
        error: (error) =>
          this.svcNotification.warning({
            message:
              'La Hora ' +
              format(date, 'dd-MM-yyyy HH:mm') +
              ' es posterior a la actual, eso no es posible',
          }),
      });
  }

  public close(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.close(false);
  }

  public saveAndClose() {
    this.save();
    this.close(true);
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'measurement':
        if (this.measurement.hasError('required')) {
          return 'Revisa la lecutra que marca el contador de la vivienda';
        }
        return '';
      case 'date':
        if (this.date.hasError('required')) {
          return 'Es obligatorio introducir una fecha';
        }
        if (this.date.hasError('dateInFuture')) {
          return 'La fecha introducida no puede ser posterior a la fecha actual';
        }
        return '';
      case 'minutes':
      case 'hour':
        if (
          this.hour.hasError('required') ||
          this.minutes.hasError('required')
        ) {
          return 'Necesitamos la hora y los minutos en la que se tomó la Lectura';
        }
        return '';
      default:
        return '';
    }
  }

  private range(end: number) {
    return Array.from(Array(end).keys()).reverse();
  }
}
