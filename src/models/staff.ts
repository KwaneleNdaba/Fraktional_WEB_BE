import mongoose from 'mongoose'
import { IUser, IUserRegisterModel } from './user';
import { IPersonnel, IPersonnelViewModel } from './personnel';


export interface IStaff {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation?:string;
  _user:string;
  _shortlist:string;
}

export interface IStaffViewModel {
  staff:IStaff,
  shortlisted: IPersonnelViewModel[]
  user?:IUser
}

export interface ICreateStaffModel extends IUserRegisterModel{
  position:string;
  profilePicture?: string;
  _organisation?:string;
}


interface staffInterface extends mongoose.Model<IStaffDoc> {
  build(attr: IStaff): IStaffDoc
}

export interface IStaffDoc extends mongoose.Document {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation?:string;
  _user:string;
  _shortlist:string;
}


const staffSchema = new mongoose.Schema({

  profilePicture:{
    type: String,
    required: false
  },
  position:{
    type: String,
    required: true
  },
  _organisation:{
    type: String,
    // required: true
  },
  _user:{
    type: String,
    required: true
  },
  _shortlist:{
    type: String,
  //  required: true
  },
})

staffSchema.statics.build = (attr: IStaff) => {
  return new Staff(attr)
}

const Staff = mongoose.model<IStaffDoc, staffInterface>('staff', staffSchema, "staff")


export { Staff }




