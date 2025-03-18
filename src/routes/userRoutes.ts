import { Hono } from 'hono'
import {
  getUsers,
  getUserById,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controller/userController'
import { login } from '../controller/authController'
import { jwtAuthMiddleware } from '../middleware/middlewareAuth'
import { cors } from 'hono/cors'

const userRoutes = new Hono()

userRoutes.use(
    '*',
    cors({
      origin: 'http://localhost:3001', 
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'] 
    })
)

userRoutes.get('/users', jwtAuthMiddleware, getUsers)
userRoutes.get('/users/:id', getUserById)
userRoutes.post('/users', createUserHandler)
userRoutes.put('/users/:id', jwtAuthMiddleware, updateUserHandler)
userRoutes.delete('/users/:id', jwtAuthMiddleware, deleteUserHandler)
userRoutes.post('/login', login)

export default userRoutes
