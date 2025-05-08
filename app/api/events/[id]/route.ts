import { NextResponse } from 'next/server'
import { eventController } from '@/app/controllers/eventController'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await request.json()
        const event = await eventController.updateEvent(params.id, data)
        return NextResponse.json(event)
    } catch {
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await eventController.deleteEvent(params.id)
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }
} 