"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, Mail, Phone, MapPin } from "lucide-react"
import { UserForm } from "@/app/views/components/users/UserForm"
import { User } from "@/app/models/User"

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

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Utilisateurs</h1>
                <Button
                    onClick={() => {
                        setEditingUser(null)
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Nouvel Utilisateur
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
                    {users.map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{user.name}</CardTitle>
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
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                        <span>{user.email}</span>
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center text-sm">
                                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                    {user.address && (
                                        <div className="flex items-center text-sm">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{user.address}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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