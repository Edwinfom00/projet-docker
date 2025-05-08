import { NextResponse } from 'next/server'
import { userController } from '@/app/controllers/userController'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await request.json()
        const user = await userController.updateUser(params.id, data)
        return NextResponse.json(user)
    } catch {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await userController.deleteUser(params.id)
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
} 