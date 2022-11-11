import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { date } from 'joi';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getHello(): string {
    return this.paymentsService.getHello();
  }

  @EventPattern('created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.paymentsService.order(data)
  }

}
