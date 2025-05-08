import { prisma } from '@/lib/prisma'
import type { Event } from '@/lib/generated/prisma'

export const eventController = {
    // Get all events
    getEvents: async () => {
        try {
            return await prisma.event.findMany({
                orderBy: {
                    date: 'desc'
                },
                include: {
                    company: true
                }
            })
        } catch (error: unknown) {
            console.error('Error fetching events:', error)
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Failed to fetch events')
        }
    },

    // Get a single event by ID
    getEventById: async (id: string) => {
        try {
            return await prisma.event.findUnique({
                where: { id },
                include: {
                    company: true
                }
            })
        } catch (error: unknown) {
            console.error('Error fetching event:', error)
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Failed to fetch event')
        }
    },

    // Create a new event
    createEvent: async (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            return await prisma.event.create({
                data,
                include: {
                    company: true
                }
            })
        } catch (error: unknown) {
            console.error('Error creating event:', error)
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Failed to create event')
        }
    },

    // Update an event
    updateEvent: async (id: string, data: Partial<Event>) => {
        try {
            return await prisma.event.update({
                where: { id },
                data,
                include: {
                    company: true
                }
            })
        } catch (error: unknown) {
            console.error('Error updating event:', error)
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Failed to update event')
        }
    },

    // Delete an event
    deleteEvent: async (id: string) => {
        try {
            return await prisma.event.delete({
                where: { id }
            })
        } catch (error: unknown) {
            console.error('Error deleting event:', error)
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Failed to delete event')
        }
    }
} 