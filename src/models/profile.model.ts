import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PROFILE_COLLECTION, PROFILE_STATUS } from '../constant/profile.constant';
import { type Document, Types } from 'mongoose';
import type {
  EducationExperience,
  ProfileExperience,
  Profile_Status,
  Social,
} from '../interfaces/profile.interfaces';

@Schema({ timestamps: true, collection: PROFILE_COLLECTION })
export class Profile {
  @Prop({ required: true, unique: true, type: Types.ObjectId, ref: 'Users' })
  public userId: Types.ObjectId;

  @Prop({ required: false, type: String })
  public company?: string;

  @Prop({ required: false, type: String })
  public website?: string;

  @Prop({ required: false, type: String })
  public location?: string;

  @Prop({ required: true, type: String, enum: PROFILE_STATUS })
  public status: Profile_Status;

  @Prop({ default: [], type: [String] })
  public skills: string[];

  @Prop({ required: false, type: String })
  public bio?: string;

  @Prop({ required: false, type: String })
  public github?: string;

  @Prop([
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ])
  public experience: ProfileExperience[];

  @Prop([
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ])
  public education: EducationExperience[];

  @Prop({
    type: {
      youtube: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
    required: false,
  })
  public social: Social;
}

export type ProfileDocument = Document & Profile;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
