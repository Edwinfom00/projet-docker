"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Moon, Sun, Shield, User } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: false
    })

    const handleSave = async () => {
        try {
            // Simuler une sauvegarde
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.success("Paramètres sauvegardés avec succès")
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde des paramètres")
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <User className="w-8 h-8 text-blue-600" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
                    <p className="text-gray-500 mt-1">Gérez vos préférences</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Apparence */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                Apparence
                            </CardTitle>
                            <CardDescription>
                                Personnalisez l&apos;apparence de l&apos;application
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="theme" className="flex flex-col gap-1">
                                    <span>Thème</span>
                                    <span className="text-sm text-gray-500">Choisissez entre le thème clair et sombre</span>
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={theme === 'light' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setTheme('light')}
                                    >
                                        <Sun className="w-4 h-4 mr-2" />
                                        Clair
                                    </Button>
                                    <Button
                                        variant={theme === 'dark' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setTheme('dark')}
                                    >
                                        <Moon className="w-4 h-4 mr-2" />
                                        Sombre
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Notifications
                            </CardTitle>
                            <CardDescription>
                                Gérez vos préférences de notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                                    <span>Notifications par email</span>
                                    <span className="text-sm text-gray-500">Recevez des notifications par email</span>
                                </Label>
                                <Switch
                                    id="email-notifications"
                                    checked={notifications.email}
                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                                    <span>Notifications push</span>
                                    <span className="text-sm text-gray-500">Recevez des notifications push</span>
                                </Label>
                                <Switch
                                    id="push-notifications"
                                    checked={notifications.push}
                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="marketing-notifications" className="flex flex-col gap-1">
                                    <span>Notifications marketing</span>
                                    <span className="text-sm text-gray-500">Recevez des notifications marketing</span>
                                </Label>
                                <Switch
                                    id="marketing-notifications"
                                    checked={notifications.marketing}
                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Sécurité */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Sécurité
                            </CardTitle>
                            <CardDescription>
                                Gérez vos paramètres de sécurité
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="two-factor" className="flex flex-col gap-1">
                                    <span>Authentification à deux facteurs</span>
                                    <span className="text-sm text-gray-500">Activez l&apos;authentification à deux facteurs</span>
                                </Label>
                                <Switch id="two-factor" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="flex justify-end"
                >
                    <Button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                    >
                        Enregistrer les modifications
                    </Button>
                </motion.div>
            </div>
        </div>
    )
} 