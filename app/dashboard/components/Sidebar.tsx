import {
    Home,
    Users,
    Building2,
    Calendar,
    BarChart2,
    Settings,
    ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Utilisateurs', href: '/dashboard/users', icon: Users },
    { label: 'Entreprises', href: '/dashboard/companies', icon: Building2 },
    { label: 'Événements', href: '/dashboard/events', icon: Calendar },
    { label: 'Statistiques', href: '/dashboard/stats', icon: BarChart2 },
    { label: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-blue-900 text-white flex flex-col shadow-lg">
            <div className="flex items-center gap-2 px-6 py-6 border-b border-blue-800">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-blue-900 font-bold text-lg">B</span>
                </div>
                <span className="font-bold text-xl tracking-wide">BIZDASH</span>
            </div>
            <nav className="flex-1 px-2 py-6 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors cursor-pointer',
                                        'hover:bg-blue-800 hover:text-white focus:bg-blue-700 focus:outline-none',
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium flex-1">{item.label}</span>
                                    <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
} 