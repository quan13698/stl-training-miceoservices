import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderRepository } from './order.repository';
import { lastValueFrom } from 'rxjs';
import { ORDER_SERVICE } from './constant/service';
import { PaymentsService } from 'apps/payments/src/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(ORDER_SERVICE) private orderClient: ClientProxy,
    private readonly paymentService: PaymentsService,
  ) {}

  async createOrder(createOrderDto: createOrderDto) {
    const session = await this.orderRepository.startTransaction();
    try {
      const order = await this.orderRepository.create(createOrderDto, {
        session,
      });
      await lastValueFrom(this.orderClient.emit('created', { createOrderDto }));
      await session.commitTransaction();
      const orderStatus = await this.paymentService.order(createOrderDto);
      const orderId = order._id.toString();

      if (orderStatus === 'declined') {
        const orderInfo = {
          ...order,
          status: 'canceled',
        };
        const finalResult1 = await this.orderRepository.updateById(
          orderId,
          orderInfo,
        );
        return finalResult1;
      }

      const newOrderInfo = {
        ...order,
        status: orderStatus,
      };
      const finalResult2 = await this.orderRepository.updateById(
        orderId,
        newOrderInfo,
      );
      
      return finalResult2;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
