"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, Mail, Phone, MapPin, Users, Loader2 } from "lucide-react"
import { UserForm } from "@/app/views/components/users/UserForm"
import { User } from "@/app/models/User"
import { motion } from "framer-motion"

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (!response.ok) throw new Error('Failed to fetch users')
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error('Failed to load users:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateUser = async (data: any) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create user')
            await loadUsers()
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to create user:', error)
        }
    }

    const handleEditUser = async (data: any) => {
        if (!editingUser) return
        try {
            const response = await fetch(`/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update user')
            await loadUsers()
            setEditingUser(null)
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to update user:', error)
        }
    }

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete user')
            await loadUsers()
        } catch (error) {
            console.error('Failed to delete user:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-gray-500">Chargement des utilisateurs...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Utilisateurs</h1>
                    <p className="text-gray-500 mt-1">Gérez vos utilisateurs et leurs permissions</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingUser(null)
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Nouvel Utilisateur
                </Button>
            </div>

            {users.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                >
                    <Users className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucun utilisateur</h3>
                    <p className="text-gray-500 text-center mb-6">
                        Commencez par ajouter votre premier utilisateur pour gérer votre équipe.
                    </p>
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Ajouter un utilisateur
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {users.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {user.name}
                                            </CardTitle>
                                            <CardDescription className="text-sm text-gray-500">
                                                {user.role}
                                            </CardDescription>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setEditingUser(user)
                                                    setIsFormOpen(true)
                                                }}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                                            >
                                                Supprimer
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm">
                                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                            <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                                        </div>
                                        {user.phone && (
                                            <div className="flex items-center text-sm">
                                                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                                <span className="text-gray-700 dark:text-gray-300">{user.phone}</span>
                                            </div>
                                        )}
                                        {user.address && (
                                            <div className="flex items-center text-sm">
                                                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                                <span className="text-gray-700 dark:text-gray-300">{user.address}</span>
                                            </div>
                                        )}
                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'ACTIVE'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                    : user.status === 'INACTIVE'
                                                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                }`}>
                                                {user.status === 'ACTIVE' ? 'Actif' : user.status === 'INACTIVE' ? 'Inactif' : 'Suspendu'}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <UserForm
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false)
                    setEditingUser(null)
                }}
                onSubmit={editingUser ? handleEditUser : handleCreateUser}
                initialData={editingUser}
            />
        </div>
    )
} 