
import { NgModule } from '@angular/core';
import { AgubeApiModule } from '@availa/agube-rest-api';
import { TaskModule } from '@availa/task-fe';
import { environment } from '../../environments/environment';
import { AgubeRoutingModule } from './agube-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AgubeApiModule.forRoot({ basePath: environment.agubeBackendUrl }),
    TaskModule.forRoot({
      contactBookRestconfig: {
        basePath: environment.contactBookBackendUrl,
      },
      taskRestconfig: {
        basePath: environment.taskBackendUrl,
      },
    }),

    AgubeRoutingModule,
  ],
})
export class AgubeModule {}
