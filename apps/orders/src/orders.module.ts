import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from 'apps/payments/src/payments.module';
import * as  Joi from 'joi';
import { ORDER_SERVICE } from './constant/service';
import { OrderRepository } from './order.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: './apps/orders/.env'
    }), 
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RmqModule.register({
      name: ORDER_SERVICE,
    }),
    PaymentsModule
  ],
  controllers: [OrdersController],
  providers: [ OrdersService, OrderRepository],
})
export class OrdersModule {}
