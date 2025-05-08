import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const usersCount = await prisma.user.count()
    const companiesCount = await prisma.company.count()
    const eventsCount = await prisma.event.count()
    // Ajoute d'autres stats si besoin

    return NextResponse.json({
        usersCount,
        companiesCount,
        eventsCount,
    })
} 