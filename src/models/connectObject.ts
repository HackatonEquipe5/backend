import mongoose, { Document, Schema } from 'mongoose'

export interface IConnectObject extends Document {
  name: string
  location: string
  isFavorite: boolean 
  avatar: string
}

const ConnectObjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
    image: { type: String, default: "https://static.terresdecafe.com/8642-large_default/specialista-opera-ec9555bm-machine-a-cafe-expresso-automatique-black-metal.jpg"  },
})

export const ConnectObjectModel = mongoose.model<IConnectObject>('ConnectObject', ConnectObjectSchema)
