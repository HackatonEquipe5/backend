import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password:string
  id_device : string
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password:{ type: String, required: true },
  id_device: { type: String, required: true },
 })

export const UserModel = mongoose.model<IUser>('User', userSchema)
