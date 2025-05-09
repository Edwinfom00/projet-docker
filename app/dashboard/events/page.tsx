"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Loader2, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { EventForm } from "@/app/components/forms/EventForm"

interface Event {
    id: string
    title: string
    description: string
    date: string
    location: string
    company: {
        id: string
        name: string
    }
    createdAt: string
}

interface Company {
    id: string
    name: string
}

export default function EventsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [events, setEvents] = useState<Event[]>([])
    const [companies, setCompanies] = useState<Company[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/events')
            if (!response.ok) throw new Error('Erreur lors du chargement des événements')
            const data = await response.json()
            setEvents(data)
        } catch (error) {
            toast.error("Erreur lors du chargement des événements")
            console.error("Erreur:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCompanies = async () => {
        try {
            const response = await fetch('/api/companies')
            if (!response.ok) throw new Error('Erreur lors du chargement des entreprises')
            const data = await response.json()
            setCompanies(data)
        } catch (error) {
            toast.error("Erreur lors du chargement des entreprises")
            console.error("Erreur:", error)
        }
    }

    useEffect(() => {
        fetchEvents()
        fetchCompanies()
    }, [])

    const handleSubmit = async (data: Omit<Event, 'id' | 'createdAt' | 'company'> & { companyId: string }) => {
        try {
            const response = await fetch('/api/events' + (editingEvent ? `/${editingEvent.id}` : ''), {
                method: editingEvent ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error('Erreur lors de l\'opération')
            await fetchEvents()
            setIsFormOpen(false)
            setEditingEvent(null)
        } catch (error) {
            toast.error("Une erreur est survenue")
            console.error(error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return

        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Erreur lors de la suppression')
            await fetchEvents()
            toast.success("Événement supprimé avec succès")
        } catch (error) {
            toast.error("Erreur lors de la suppression")
            console.error(error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Événements</h1>
                        <p className="text-gray-500 mt-1">Gérez vos événements</p>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        setEditingEvent(null)
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un événement
                </Button>
            </div>

            {events.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Calendar className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Aucun événement
                            </h3>
                            <p className="text-gray-500 text-center mb-4">
                                Commencez par ajouter votre premier événement
                            </p>
                            <Button
                                onClick={() => {
                                    setEditingEvent(null)
                                    setIsFormOpen(true)
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter un événement
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{event.title}</CardTitle>
                                            <CardDescription>{event.company.name}</CardDescription>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setEditingEvent(event)
                                                    setIsFormOpen(true)
                                                }}
                                            >
                                                <Pencil className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Date:</span>{" "}
                                            {new Date(event.date).toLocaleDateString("fr-FR")}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Lieu:</span> {event.location}
                                        </p>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {event.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <EventForm
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false)
                    setEditingEvent(null)
                }}
                onSubmit={handleSubmit}
                initialData={editingEvent}
                companies={companies}
            />
        </div>
    )
} 