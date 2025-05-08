"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/app/components/dashboard/overview"
import { RecentSales } from "@/app/components/dashboard/recent-sales"
import { Search } from "@/app/components/dashboard/search"
import { UserNav } from "@/app/components/dashboard/user-nav"
import { MainNav } from "@/app/components/dashboard/main-nav"
import {
    Users,
    Building2,
    Calendar,
    Activity
} from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b border-gray-200">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord</h2>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                        <TabsTrigger value="analytics">Analytique</TabsTrigger>
                        <TabsTrigger value="reports">Rapports</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Utilisateurs Totaux
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2,350</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500">+20.1%</span> depuis le mois dernier
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Entreprises
                                    </CardTitle>
                                    <Building2 className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">573</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500">+12.5%</span> depuis le mois dernier
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Événements
                                    </CardTitle>
                                    <Calendar className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1,234</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500">+8.2%</span> depuis le mois dernier
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Actifs Maintenant
                                    </CardTitle>
                                    <Activity className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+573</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500">+201</span> cette semaine
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4 border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Vue d'ensemble</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3 border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Activité Récente</CardTitle>
                                    <CardDescription>
                                        Vous avez eu 3 événements cette semaine.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
} 