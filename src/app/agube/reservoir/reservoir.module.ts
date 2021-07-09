import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateReservoirModule } from './create-reservoir/create-reservoir.module';
import { ChangeReservoirModule } from './reservoir-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.module';
import { ReservoirUtilsModule } from './reservoir-detail-card/management-detail-card/management-components/reservoir-utils/reservoir-utils.module';
import { ReservoirDetailCardComponent } from './reservoir-detail-card/reservoir-detail-card.component';
import { ReservoirDetailListComponent } from './reservoir-detail-list/reservoir-detail-list.component';
import { ReservoirComponent } from './reservoir.component';
import { ComponentsModule } from '../../components/components.module';
import { TableModule } from '@availa/table';
import { ReservoirDataComponent } from './reservoir-detail-card/management-detail-card/reservoir-data-detail-card.component';
import { WaterMeterDetailCardComponent } from './reservoir-detail-card/management-detail-card/water-meter-enable-detail-card/water-meter-detail-card.component';
import { ReservoirWaterMeterReadingsDetailCardComponent } from './reservoir-detail-card/management-detail-card/reservoir-water-meter-readings-detail-card/reservoir-water-meter-readings-detail-card.component';
@NgModule({
  declarations: [
    ReservoirComponent,
    ReservoirDetailListComponent,
    ReservoirDetailCardComponent,
    ReservoirDataComponent,
    WaterMeterDetailCardComponent,
    ReservoirWaterMeterReadingsDetailCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChangeReservoirModule,
    ReservoirUtilsModule,
    CreateReservoirModule,
    ComponentsModule,
    TableModule
  ],
  exports: [ReservoirComponent],
})
export class ReservoirModule {}
