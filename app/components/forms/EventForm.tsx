"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

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

interface EventFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: Omit<Event, 'id' | 'createdAt' | 'company'> & { companyId: string }) => void
    initialData?: Event
    companies: Company[]
}

export function EventForm({ open, onClose, onSubmit, initialData, companies }: EventFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Omit<Event, 'id' | 'createdAt' | 'company'> & { companyId: string }>({
        title: "",
        description: "",
        date: "",
        location: "",
        companyId: "",
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                date: new Date(initialData.date).toISOString().split('T')[0],
                location: initialData.location,
                companyId: initialData.company.id,
            })
        } else {
            setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                companyId: "",
            })
        }
    }, [initialData, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Convertir la date en format ISO
            const formattedData = {
                ...formData,
                date: new Date(formData.date).toISOString()
            }
            await onSubmit(formattedData)
            toast.success(initialData ? "Événement mis à jour avec succès" : "Événement créé avec succès")
            onClose()
        } catch (error) {
            toast.error("Une erreur est survenue")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Modifier l&apos;événement" : "Ajouter un événement"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de l&apos;événement</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyId">Entreprise</Label>
                        <Select
                            value={formData.companyId}
                            onValueChange={(value) => setFormData({ ...formData, companyId: value })}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une entreprise" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company) => (
                                    <SelectItem key={company.id} value={company.id}>
                                        {company.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Lieu</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Chargement..." : initialData ? "Mettre à jour" : "Créer"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
} 