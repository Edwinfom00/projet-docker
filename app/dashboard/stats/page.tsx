"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Users, Building, Calendar, Activity, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { prisma } from "@/lib/prisma"

// Types pour les données
interface Stats {
    totalUsers: number
    activeUsers: number
    totalCompanies: number
    totalEvents: number
    usersByRole: { role: string; count: number }[]
    eventsByMonth: { month: string; count: number }[]
}

export default function ReportsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<Stats | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('/api/stats')
                if (!response.ok) throw new Error('Erreur lors du chargement des statistiques')
                const data = await response.json()
                setStats(data)
            } catch (error) {
                toast.error("Erreur lors du chargement des statistiques")
                console.error("Erreur:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [])

    const handleExport = async () => {
        try {
            const response = await fetch('/api/stats/export')
            if (!response.ok) throw new Error('Erreur lors de l\'exportation')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'rapport-statistiques.csv'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            toast.success("Rapport exporté avec succès")
        } catch (error) {
            toast.error("Erreur lors de l'exportation du rapport")
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
            <div className="flex items-center gap-3 mb-8">
                <Activity className="w-8 h-8 text-blue-600" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rapports</h1>
                    <p className="text-gray-500 mt-1">Statistiques de votre application</p>
                </div>
            </div>

            <div className="flex justify-end mb-6">
                <Button
                    onClick={handleExport}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter le rapport
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalUsers}</div>
                            <p className="text-xs text-gray-500">
                                {stats?.activeUsers} utilisateurs actifs
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
                            <div className="text-2xl font-bold">{stats?.totalCompanies}</div>
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
                            <div className="text-2xl font-bold">{stats?.totalEvents}</div>
                            <p className="text-xs text-gray-500">
                                Événements planifiés
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Répartition des rôles</CardTitle>
                            <CardDescription>Nombre d&apos;utilisateurs par rôle</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats?.usersByRole}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="role" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#0088FE" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Événements par mois</CardTitle>
                            <CardDescription>Nombre d&apos;événements planifiés</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats?.eventsByMonth}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#00C49F" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
} 