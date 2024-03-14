import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Document } from "mongoose";

@Schema({ timestamps: true, collection: "Users" })
export class User {
  @Prop({ required: true, type: String })
  public name: string;

  @Prop({ required: true, type: String, unique: true })
  public email: string;

  @Prop({ required: true, type: String })
  public password: string;

  @Prop({ required: false, default: "" })
  public avatarImg: string;

  @Prop({ required: false, default: "" })
  public avatarImgId: string;
}

export type UserDocument = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
