
import { Hono } from 'hono'
import {
  postAudioFile,
} from '../controller/iotCommuniqueController'

import { cors } from 'hono/cors'
import { jwtAuthMiddleware } from '../middleware/middlewareAuth'

const iotCommuniqueRoutes = new Hono()

iotCommuniqueRoutes.use(
    '*',
    cors({
      origin: 'http://localhost:4000', 
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'] 
    })
)

iotCommuniqueRoutes.post('/postAudioFile',jwtAuthMiddleware, postAudioFile)


export default iotCommuniqueRoutes
