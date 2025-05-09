import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Récupérer les statistiques générales
        const totalUsers = await prisma.user.count()
        const activeUsers = await prisma.user.count({
            where: { status: 'ACTIVE' }
        })
        const totalCompanies = await prisma.company.count()
        const totalEvents = await prisma.event.count()

        // Récupérer les derniers utilisateurs
        const recentUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        })

        // Récupérer les prochains événements
        const recentEvents = await prisma.event.findMany({
            select: {
                id: true,
                title: true,
                date: true,
                company: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                date: {
                    gte: new Date()
                }
            },
            orderBy: {
                date: 'asc'
            },
            take: 5
        })

        // Récupérer les dernières entreprises
        const recentCompanies = await prisma.company.findMany({
            select: {
                id: true,
                name: true,
                sector: true,
                city: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        })

        return NextResponse.json({
            stats: {
                totalUsers,
                activeUsers,
                totalCompanies,
                totalEvents
            },
            recentUsers,
            recentEvents,
            recentCompanies
        })
    } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des données du tableau de bord' },
            { status: 500 }
        )
    }
} 