"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Plus, Loader2, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { CompanyForm } from "@/app/components/forms/CompanyForm"

interface Company {
    id: string
    name: string
    sector: string
    city: string
    description: string
    createdAt: string
}

export default function CompaniesPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [companies, setCompanies] = useState<Company[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingCompany, setEditingCompany] = useState<Company | null>(null)

    const fetchCompanies = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/companies')
            if (!response.ok) throw new Error('Erreur lors du chargement des entreprises')
            const data = await response.json()
            setCompanies(data)
        } catch (error) {
            toast.error("Erreur lors du chargement des entreprises")
            console.error("Erreur:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const handleSubmit = async (data: Omit<Company, 'id' | 'createdAt'>) => {
        try {
            const response = await fetch('/api/companies' + (editingCompany ? `/${editingCompany.id}` : ''), {
                method: editingCompany ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error('Erreur lors de l\'opération')
            await fetchCompanies()
            setIsFormOpen(false)
            setEditingCompany(null)
        } catch (error) {
            toast.error("Une erreur est survenue")
            console.error(error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) return

        try {
            const response = await fetch(`/api/companies/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Erreur lors de la suppression')
            await fetchCompanies()
            toast.success("Entreprise supprimée avec succès")
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
                    <Building className="w-8 h-8 text-blue-600" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Entreprises</h1>
                        <p className="text-gray-500 mt-1">Gérez vos entreprises partenaires</p>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        setEditingCompany(null)
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une entreprise
                </Button>
            </div>

            {companies.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Building className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Aucune entreprise
                            </h3>
                            <p className="text-gray-500 text-center mb-4">
                                Commencez par ajouter votre première entreprise
                            </p>
                            <Button
                                onClick={() => {
                                    setEditingCompany(null)
                                    setIsFormOpen(true)
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter une entreprise
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{company.name}</CardTitle>
                                            <CardDescription>{company.sector}</CardDescription>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setEditingCompany(company)
                                                    setIsFormOpen(true)
                                                }}
                                            >
                                                <Pencil className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(company.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Ville:</span> {company.city}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Ajoutée le:</span>{" "}
                                            {new Date(company.createdAt).toLocaleDateString("fr-FR")}
                                        </p>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {company.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <CompanyForm
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false)
                    setEditingCompany(null)
                }}
                onSubmit={handleSubmit}
                initialData={editingCompany}
            />
        </div>
    )
} 