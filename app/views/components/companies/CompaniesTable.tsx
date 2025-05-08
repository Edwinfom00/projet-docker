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

interface Company {
    id: string
    name: string
    sector: string
    city: string
    description: string | null
    createdAt: Date
    events: any[]
}

interface CompaniesTableProps {
    companies: Company[]
    onEdit: (company: Company) => void
    onDelete: (companyId: string) => void
}

export function CompaniesTable({ companies, onEdit, onDelete }: CompaniesTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companies.map((company) => (
                        <TableRow key={company.id}>
                            <TableCell className="font-medium">{company.name}</TableCell>
                            <TableCell>{company.sector}</TableCell>
                            <TableCell>{company.city}</TableCell>
                            <TableCell>{company.events?.length || 0} events</TableCell>
                            <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onEdit(company)}
                                    className="mr-2"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(company.id)}
                                    className="text-red-500 hover:text-red-700"
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