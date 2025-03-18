import { Context } from 'hono'
import { UserModel } from '../models/userModel'
import bcrypt from 'bcrypt'

export const getUsers = async (c: Context) => {
  try {
    const users = await UserModel.find()
    return c.json(users)
  } catch (error) {
    return c.json({ message: 'Error fetching users', error }, 500)
  }
}

export const getUserById = async (c: Context) => {
  try {
    const id = c.req.param('id')
    const user = await UserModel.findById(id)
    if (user) {
      return c.json(user)
    } else {
      return c.json({ message: 'User not found' }, 404)
    }
  } catch (error) {
    return c.json({ message: 'Error fetching user', error }, 500)
  }
}

export const createUserHandler = async (c: Context) => {
  try {
    const { firstName, lastName, email, password } = await c.req.json()
    const existingUser = await UserModel.findOne({ email });
    const user = await UserModel.findOne({ email });

    if (existingUser) {
      return c.json({ message: "Un compte avec cet email existe déjà." }, 409);
    }

    if (user) {
      return c.json({ message: "email deja pris" }, 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    return c.json(newUser, 201)
  } catch (error) {
    return c.json({ message: 'Error creating user', error }, 500)
  }
}


export const updateUserHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const { firstName, lastName, email, password } = await c.req.json();

    const updateData: any = { firstName, lastName, email };

    if (password) {
      updateData.password = password;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedUser) {
      return c.json(updatedUser);
    } else {
      return c.json({ message: 'User not found' }, 404);
    }
  } catch (error) {
    return c.json({ message: 'Error updating user', error }, 500);
  }
};

export const deleteUserHandler = async (c: Context) => {
  try {
    const id = c.req.param('id')
    const deletedUser = await UserModel.findByIdAndDelete(id)
    if (deletedUser) {
      return c.json({ message: 'User deleted successfully' })
    } else {
      return c.json({ message: 'User not found' }, 404)
    }
  } catch (error) {
    return c.json({ message: 'Error deleting user', error }, 500)
  }
}
