import { Hono } from 'hono'
import {
    getConnectObject,
    getConnectObjectById,
    createConnectObjectHandler,
    updateConnectObjectHandler,
    deleteConnectObjectHandler,
} from '../controller/connectObjectController'

import { cors } from 'hono/cors'
import { jwtAuthMiddleware } from '../middleware/middlewareAuth'

const userRoutes = new Hono()

userRoutes.use(
    '*',
    cors({
      origin: 'http://localhost:4000', 
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'] 
    })
)


userRoutes.get('/connectobject',jwtAuthMiddleware, getConnectObject)
userRoutes.get('/connectobject/:id',jwtAuthMiddleware, getConnectObjectById)
userRoutes.post('/createconnectobject',jwtAuthMiddleware,createConnectObjectHandler)
userRoutes.put('/connectobject/:id',jwtAuthMiddleware,  updateConnectObjectHandler)
userRoutes.delete('/connectobject/:id',jwtAuthMiddleware, deleteConnectObjectHandler)

export default userRoutes
