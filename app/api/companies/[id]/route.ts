import { NextResponse } from 'next/server'
import { companyController } from '@/app/controllers/companyController'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await request.json()
        const company = await companyController.updateCompany(params.id, data)
        return NextResponse.json(company)
    } catch {
        return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await companyController.deleteCompany(params.id)
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 })
    }
} 