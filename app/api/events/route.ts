import { NextResponse } from 'next/server'
import { eventController } from '@/app/controllers/eventController'

export async function GET() {
    try {
        const events = await eventController.getEvents()
        return NextResponse.json(events)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const event = await eventController.createEvent(data)
        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }
} 