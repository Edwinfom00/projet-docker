import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Récupérer toutes les données nécessaires
        const users = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true
            }
        })

        const companies = await prisma.company.findMany({
            select: {
                name: true,
                sector: true,
                city: true,
                createdAt: true
            }
        })

        const events = await prisma.event.findMany({
            select: {
                title: true,
                date: true,
                location: true,
                company: {
                    select: {
                        name: true
                    }
                }
            }
        })

        // Créer le contenu CSV
        const csvContent = [
            // En-tête
            ['Statistiques Générales'],
            ['Utilisateurs totaux', users.length],
            ['Entreprises totales', companies.length],
            ['Événements totaux', events.length],
            [],
            // Utilisateurs
            ['Utilisateurs'],
            ['Nom', 'Email', 'Rôle', 'Statut', 'Date de création'],
            ...users.map(user => [
                user.name,
                user.email,
                user.role,
                user.status,
                new Date(user.createdAt).toLocaleDateString('fr-FR')
            ]),
            [],
            // Entreprises
            ['Entreprises'],
            ['Nom', 'Secteur', 'Ville', 'Date de création'],
            ...companies.map(company => [
                company.name,
                company.sector,
                company.city,
                new Date(company.createdAt).toLocaleDateString('fr-FR')
            ]),
            [],
            // Événements
            ['Événements'],
            ['Titre', 'Date', 'Lieu', 'Entreprise'],
            ...events.map(event => [
                event.title,
                new Date(event.date).toLocaleDateString('fr-FR'),
                event.location,
                event.company.name
            ])
        ].map(row => row.join(',')).join('\n')

        // Créer la réponse avec le fichier CSV
        const response = new NextResponse(csvContent)
        response.headers.set('Content-Type', 'text/csv')
        response.headers.set('Content-Disposition', 'attachment; filename=statistiques.csv')
        return response
    } catch (error) {
        console.error('Erreur lors de l\'exportation des statistiques:', error)
        return NextResponse.json(
            { error: 'Erreur lors de l\'exportation des statistiques' },
            { status: 500 }
        )
    }
} 