import { prisma } from '@/lib/prisma'
import { User } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'

export const userController = {
    // Get all users
    getUsers: async () => {
        try {
            return await prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error: unknown) {
            console.error('Error fetching users:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch users')
        }
    },

    // Get a single user by ID
    getUserById: async (id: string) => {
        try {
            return await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error: unknown) {
            console.error('Error fetching user:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch user')
        }
    },

    // Create a new user
    createUser: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            return await prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error: unknown) {
            console.error('Error creating user:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to create user')
        }
    },

    // Update a user
    updateUser: async (id: string, data: Partial<User>) => {
        try {
            const updateData = { ...data }
            if (data.password) {
                updateData.password = await bcrypt.hash(data.password, 10)
            }
            return await prisma.user.update({
                where: { id },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error: unknown) {
            console.error('Error updating user:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to update user')
        }
    },

    // Delete a user
    deleteUser: async (id: string) => {
        try {
            return await prisma.user.delete({
                where: { id }
            })
        } catch (error: unknown) {
            console.error('Error deleting user:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to delete user')
        }
    }
} 