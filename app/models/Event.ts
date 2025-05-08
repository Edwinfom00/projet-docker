export interface Event {
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    location: string
    type: 'CONFERENCE' | 'WORKSHOP' | 'NETWORKING' | 'OTHER'
    status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
    capacity?: number
    price?: number
    organizerId: string
    companyId?: string
    createdAt: Date
    updatedAt: Date
} 