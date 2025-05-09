"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Company {
    id: string
    name: string
    sector: string
    city: string
    description: string
    createdAt: string
}

interface CompanyFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: Omit<Company, 'id' | 'createdAt'>) => void
    initialData?: Company
}

export function CompanyForm({ open, onClose, onSubmit, initialData }: CompanyFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Omit<Company, 'id' | 'createdAt'>>({
        name: "",
        sector: "",
        city: "",
        description: "",
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                sector: initialData.sector,
                city: initialData.city,
                description: initialData.description,
            })
        } else {
            setFormData({
                name: "",
                sector: "",
                city: "",
                description: "",
            })
        }
    }, [initialData, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await onSubmit(formData)
            toast.success(initialData ? "Entreprise mise à jour avec succès" : "Entreprise créée avec succès")
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
                        {initialData ? "Modifier l&apos;entreprise" : "Ajouter une entreprise"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom de l&apos;entreprise</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sector">Secteur d&apos;activité</Label>
                        <Input
                            id="sector"
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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