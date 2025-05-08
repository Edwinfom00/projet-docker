"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Globe, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { CompanyForm } from "@/app/views/components/companies/CompanyForm"
import { Company } from "@/app/models/Company"

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingCompany, setEditingCompany] = useState<Company | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCompanies()
    }, [])

    const loadCompanies = async () => {
        try {
            const response = await fetch('/api/companies')
            if (!response.ok) throw new Error('Failed to fetch companies')
            const data = await response.json()
            setCompanies(data)
        } catch (error) {
            console.error('Failed to load companies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateCompany = async (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await fetch('/api/companies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create company')
            await loadCompanies()
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to create company:', error)
        }
    }

    const handleEditCompany = async (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingCompany) return
        try {
            const response = await fetch(`/api/companies/${editingCompany.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update company')
            await loadCompanies()
            setEditingCompany(null)
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to update company:', error)
        }
    }

    const handleDeleteCompany = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) return
        try {
            const response = await fetch(`/api/companies/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete company')
            await loadCompanies()
        } catch (error) {
            console.error('Failed to delete company:', error)
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Entreprises</h1>
                <Button
                    onClick={() => {
                        setEditingCompany(null)
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Building2 className="w-4 h-4 mr-2" />
                    Nouvelle Entreprise
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
                    {companies.map((company) => (
                        <Card key={company.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{company.name}</CardTitle>
                                        <CardDescription className="text-sm text-gray-500">
                                            {company.sector} • {company.city}
                                        </CardDescription>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setEditingCompany(company)
                                                setIsFormOpen(true)
                                            }}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteCompany(company.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {company.website && (
                                        <div className="flex items-center text-sm">
                                            <Globe className="w-4 h-4 mr-2 text-gray-500" />
                                            <a
                                                href={company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline flex items-center"
                                            >
                                                {company.website}
                                                <ExternalLink className="w-3 h-3 ml-1" />
                                            </a>
                                        </div>
                                    )}
                                    {company.email && (
                                        <div className="flex items-center text-sm">
                                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{company.email}</span>
                                        </div>
                                    )}
                                    {company.phone && (
                                        <div className="flex items-center text-sm">
                                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{company.phone}</span>
                                        </div>
                                    )}
                                    {company.address && (
                                        <div className="flex items-center text-sm">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{company.address}</span>
                                        </div>
                                    )}
                                    {company.description && (
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {company.description}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <CompanyForm
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false)
                    setEditingCompany(null)
                }}
                onSubmit={editingCompany ? handleEditCompany : handleCreateCompany}
                initialData={editingCompany}
            />
        </div>
    )
} 