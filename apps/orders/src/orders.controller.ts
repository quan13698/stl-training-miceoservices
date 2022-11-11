import { Body, Controller, Get, Post } from '@nestjs/common';
import { createOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: createOrderDto) {
    return this.ordersService.createOrder(createOrderDto)
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders()
  }
}
