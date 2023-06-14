import mongoose from 'mongoose'
import { IPersonnel } from './personnel';
import { IStaff } from './staff';

export interface IUser {
  _id?:string;
  title: string;
  firstName: string;
  surname:string;
  email:string;
  password:string;
  mobileNumber:string;
  type:string;
  status:number;
  otp: string;
}

interface userModelInterface extends mongoose.Model<IUserDoc> {
  build(attr: IUser): IUserDoc
}

export interface IUserDoc extends mongoose.Document {
  title: string;
  firstName: string;
  surname:string;
  email:string;
  password:string;
  mobileNumber:string;
  type:string;
  status:number;
  otp:string;
}

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String, 
    required: true
  },
  surname: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true, 
    dropDups: true 
  },
  password: {
    type: String, 
    required: true
  },
  type: {
    type: Number, 
    required: true
  },
  mobileNumber:{
    type:String,
    required:true
  },
  status:{
    type:Number,
    required:true
  },
  otp:{
    type:String
  }
})

userSchema.statics.build = (attr: IUser) => {
  return new User(attr)
}

const User = mongoose.model<IUserDoc, userModelInterface>('user', userSchema, "users")


export { User }

export interface ICreatePersonnelUser{

    user:IUser;
    personnel:IPersonnel

}

export interface ICreateStaffUser{
  user:IUser;
  staff:IStaff;
}




