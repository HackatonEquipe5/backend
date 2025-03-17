import { Hono } from 'hono'
import {
  getConnectObject,
  getConnectObjectById,
  createConnectObjectHandler,
  updateConnectObjectHandler,
  deleteConnectObjectHandler,
} from '../controller/connectObjectController'

import { cors } from 'hono/cors'

const userRoutes = new Hono()

userRoutes.use(
    '*',
    cors({
      origin: 'http://localhost:4000', 
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'] 
    })
)

userRoutes.get('/connectobject', getConnectObject)
userRoutes.get('/connectobject/:id', getConnectObjectById)
userRoutes.post('/createconnectobject', createConnectObjectHandler)
userRoutes.put('/connectobject/:id',  updateConnectObjectHandler)
userRoutes.delete('/connectobject/:id', deleteConnectObjectHandler)

export default userRoutes
