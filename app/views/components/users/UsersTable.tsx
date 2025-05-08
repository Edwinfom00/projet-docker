import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

interface User {
    id: string
    name: string
    email: string
    role: string
    status: string
    createdAt: Date
}

interface UsersTableProps {
    users: User[]
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

// ... existing code ...

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
    return (
        <div className="rounded-lg border shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Nom</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Téléphone</TableHead>
                        <TableHead className="font-semibold">Rôle</TableHead>
                        <TableHead className="font-semibold">Statut</TableHead>
                        <TableHead className="font-semibold">Date de création</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {user.role}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
                                    ${user.status === 'ACTIVE'
                                        ? 'bg-green-50 text-green-700 ring-green-600/20'
                                        : user.status === 'INACTIVE'
                                            ? 'bg-gray-50 text-gray-600 ring-gray-500/10'
                                            : 'bg-red-50 text-red-700 ring-red-600/10'}`}>
                                    {user.status.toLowerCase()}
                                </span>
                            </TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEdit(user)}
                                    className="mr-2 hover:bg-gray-100"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDelete(user.id)}
                                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}