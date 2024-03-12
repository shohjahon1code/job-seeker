import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop()
  full_name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  user_type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
