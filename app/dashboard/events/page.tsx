"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Tag } from "lucide-react"
import { EventForm } from "@/app/views/components/events/EventForm"
import { Event } from "@/app/models/Event"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = async () => {
        try {
            const response = await fetch('/api/events')
            if (!response.ok) throw new Error('Failed to fetch events')
            const data = await response.json()
            setEvents(data)
        } catch (error) {
            console.error('Failed to load events:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateEvent = async (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create event')
            await loadEvents()
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to create event:', error)
        }
    }

    const handleEditEvent = async (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingEvent) return
        try {
            const response = await fetch(`/api/events/${editingEvent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update event')
            await loadEvents()
            setEditingEvent(null)
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to update event:', error)
        }
    }

    const handleDeleteEvent = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete event')
            await loadEvents()
        } catch (error) {
            console.error('Failed to delete event:', error)
        }
    }
    const isValidDate = (date: any) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
    };

    const getStatusColor = (status: Event['status']) => {
        switch (status) {
            case 'UPCOMING':
                return 'text-blue-600 bg-blue-50'
            case 'ONGOING':
                return 'text-green-600 bg-green-50'
            case 'COMPLETED':
                return 'text-gray-600 bg-gray-50'
            case 'CANCELLED':
                return 'text-red-600 bg-red-50'
            default:
                return 'text-gray-600 bg-gray-50'
        }
    }

    const getTypeLabel = (type: Event['type']) => {
        switch (type) {
            case 'CONFERENCE':
                return 'Conférence'
            case 'WORKSHOP':
                return 'Atelier'
            case 'NETWORKING':
                return 'Networking'
            case 'OTHER':
                return 'Autre'
            default:
                return type
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Événements</h1>
                <Button
                    onClick={() => {
                        setEditingEvent(null)
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Calendar className="w-4 h-4 mr-2" />
                    Nouvel Événement
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="h-24 bg-gray-100" />
                            <CardContent className="h-32 bg-gray-50" />
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{event.title}</CardTitle>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                                                {event.status}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {getTypeLabel(event.type)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setEditingEvent(event)
                                                setIsFormOpen(true)
                                            }}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                        <span>
                                            {isValidDate(event.startDate) && isValidDate(event.endDate)
                                                ? `${format(new Date(event.startDate), "d MMMM yyyy  HH:mm", { locale: fr })} - ${format(new Date(event.endDate), "d MMMM yyyy  HH:mm", { locale: fr })}`
                                                : "Date invalide"}

                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                        <span>{event.location}</span>
                                    </div>
                                    {event.capacity && (
                                        <div className="flex items-center text-sm">
                                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>Capacité: {event.capacity} personnes</span>
                                        </div>
                                    )}
                                    {event.price && (
                                        <div className="flex items-center text-sm">
                                            <Tag className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{event.price} FCFA</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {event.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <EventForm
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false)
                    setEditingEvent(null)
                }}
                onSubmit={editingEvent ? handleEditEvent : handleCreateEvent}
                initialData={editingEvent}
            />
        </div>
    )
} 