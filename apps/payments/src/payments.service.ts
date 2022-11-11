import { Injectable, Logger } from '@nestjs/common';
// import { OrdersService } from 'apps/orders/src/orders.service';

@Injectable()
export class PaymentsService {
  // private readonly logger = new Logger(OrdersService.name);

  getHello(): string {
    return 'Hello World!';
  }

  order(data: any) {
    let results = ['confirmed', 'declined'];
    let randomResult = results[Math.floor(Math.random() * results.length)];
    // this.logger.log(randomResult, data);
    return randomResult
  }
}
