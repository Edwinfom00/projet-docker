import { NextResponse } from 'next/server'
import { companyController } from '@/app/controllers/companyController'

export async function GET() {
    try {
        const companies = await companyController.getCompanies()
        return NextResponse.json(companies)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const company = await companyController.createCompany(data)
        return NextResponse.json(company)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
    }
} 