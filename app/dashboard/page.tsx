"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, Calendar, Activity, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface DashboardData {
    stats: {
        totalUsers: number
        activeUsers: number
        totalCompanies: number
        totalEvents: number
    }
    recentUsers: {
        id: string
        name: string
        email: string
        role: string
        createdAt: string
    }[]
    recentEvents: {
        id: string
        title: string
        date: string
        company: {
            name: string
        }
    }[]
    recentCompanies: {
        id: string
        name: string
        sector: string
        city: string
    }[]
}

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<DashboardData | null>(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('/api/dashboard')
                if (!response.ok) throw new Error('Erreur lors du chargement des données')
                const dashboardData = await response.json()
                setData(dashboardData)
            } catch (error) {
                toast.error("Erreur lors du chargement du tableau de bord")
                console.error("Erreur:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Activity className="w-8 h-8 text-blue-600" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
                    <p className="text-gray-500 mt-1">Vue d&apos;ensemble de votre application</p>
                </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data?.stats.totalUsers}</div>
                            <p className="text-xs text-gray-500">
                                {data?.stats.activeUsers} utilisateurs actifs
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Entreprises</CardTitle>
                            <Building className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data?.stats.totalCompanies}</div>
                            <p className="text-xs text-gray-500">
                                Entreprises enregistrées
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Événements</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data?.stats.totalEvents}</div>
                            <p className="text-xs text-gray-500">
                                Événements planifiés
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Activités récentes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Derniers utilisateurs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Derniers utilisateurs</CardTitle>
                            <CardDescription>Utilisateurs récemment inscrits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data?.recentUsers.map(user => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Prochains événements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Prochains événements</CardTitle>
                            <CardDescription>Événements à venir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data?.recentEvents.map(event => (
                                    <div key={event.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{event.title}</p>
                                            <p className="text-sm text-gray-500">{event.company.name}</p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(event.date).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Dernières entreprises */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Dernières entreprises</CardTitle>
                            <CardDescription>Entreprises récemment ajoutées</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data?.recentCompanies.map(company => (
                                    <div key={company.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{company.name}</p>
                                            <p className="text-sm text-gray-500">{company.sector} - {company.city}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
} 