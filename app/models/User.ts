export interface User {
    id: string
    name: string
    email: string
    password: string
    role: 'ADMIN' | 'USER'
    status: 'ACTIVE' | 'INACTIVE'
    phone?: string
    address?: string
    createdAt: Date
    updatedAt: Date
} 