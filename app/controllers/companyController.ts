import { prisma } from '@/lib/prisma'
import type { Company } from '@/lib/generated/prisma'

export const companyController = {
    // Get all companies
    getCompanies: async () => {
        try {
            return await prisma.company.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    events: true
                }
            })
        } catch (error: unknown) {
            console.error('Error fetching companies:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch companies')
        }
    },

    // Get a single company by ID
    getCompanyById: async (id: string) => {
        try {
            return await prisma.company.findUnique({
                where: { id },
                include: {
                    events: true
                }
            })
        } catch (error: unknown) {
            console.error('Error fetching company:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch company')
        }
    },

    // Create a new company
    createCompany: async (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            return await prisma.company.create({
                data
            })
        } catch (error: unknown) {
            console.error('Error creating company:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to create company')
        }
    },

    // Update a company
    updateCompany: async (id: string, data: Partial<Company>) => {
        try {
            return await prisma.company.update({
                where: { id },
                data
            })
        } catch (error: unknown) {
            console.error('Error updating company:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to update company')
        }
    },

    // Delete a company
    deleteCompany: async (id: string) => {
        try {
            return await prisma.company.delete({
                where: { id }
            })
        } catch (error: unknown) {
            console.error('Error deleting company:', error)
            throw new Error(error instanceof Error ? error.message : 'Failed to delete company')
        }
    }
} 