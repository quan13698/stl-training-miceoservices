import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { string } from "joi";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
    @Prop()
    name: string

    @Prop()
    price: number

    @Prop()
    phoneNumber: string

    @Prop()
    status: string
} 
// export const OrderSchema = SchemaFactory.createForClass(Order)
export const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['created', 'confirm', 'deliveried', 'canceled'],
        default: 'created'
    }
})