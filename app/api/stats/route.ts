import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Récupérer les statistiques des utilisateurs
        const totalUsers = await prisma.user.count()
        const activeUsers = await prisma.user.count({
            where: { status: 'ACTIVE' }
        })

        // Récupérer les statistiques des entreprises
        const totalCompanies = await prisma.company.count()

        // Récupérer les statistiques des événements
        const totalEvents = await prisma.event.count()

        // Récupérer la répartition des rôles
        const usersByRole = await prisma.user.groupBy({
            by: ['role'],
            _count: true
        }).then(results => results.map(result => ({
            role: result.role,
            count: result._count
        })))

        // Récupérer les événements par mois
        const eventsByMonth = await prisma.event.groupBy({
            by: ['date'],
            _count: true
        }).then(results => {
            const months = results.reduce((acc, result) => {
                const month = new Date(result.date).toLocaleString('fr-FR', { month: 'long' })
                acc[month] = (acc[month] || 0) + result._count
                return acc
            }, {} as Record<string, number>)

            return Object.entries(months).map(([month, count]) => ({
                month,
                count
            }))
        })

        return NextResponse.json({
            totalUsers,
            activeUsers,
            totalCompanies,
            totalEvents,
            usersByRole,
            eventsByMonth
        })
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des statistiques' },
            { status: 500 }
        )
    }
} 