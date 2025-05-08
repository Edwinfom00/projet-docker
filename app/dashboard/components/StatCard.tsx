import { ReactNode } from 'react'

interface StatCardProps {
    title: string
    value: string | number
    icon: ReactNode
    variation?: 'up' | 'down' | 'neutral'
    variationValue?: string
}

export default function StatCard({ title, value, icon, variation = 'neutral', variationValue }: StatCardProps) {
    let variationColor = 'text-gray-500'
    if (variation === 'up') variationColor = 'text-green-600'
    if (variation === 'down') variationColor = 'text-red-600'

    return (
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border p-5 min-w-[220px]">
            <div className="bg-blue-100 text-blue-700 rounded-full p-3">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">{title}</div>
                <div className="text-2xl font-bold text-blue-900">{value}</div>
                {variationValue && (
                    <div className={`text-xs font-semibold mt-1 ${variationColor}`}>
                        {variation === 'up' && '+'}{variation === 'down' && '-'}{variationValue}
                    </div>
                )}
            </div>
        </div>
    )
} 