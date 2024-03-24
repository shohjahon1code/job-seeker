import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OTPDocument = HydratedDocument<OTP>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class OTP {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now, expires: 300 })
  createdAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
