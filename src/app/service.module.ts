import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from './pages/slide-show/services/queue/queue-service';
import { QueueServiceServiceImpl } from './pages/slide-show/services/queue/queue-service-impl.service';

@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
      {
        provide: QueueService,
        useClass: QueueServiceServiceImpl
      }
    ],
  })
  export class ServiceModule { }
