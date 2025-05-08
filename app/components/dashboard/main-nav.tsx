"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Users, Building2, Calendar, BarChart2, Settings } from "lucide-react"

const items = [
    {
        title: "Tableau de Bord",
        href: "/dashboard",
        icon: Home,
    },
    {
        title: "Utilisateurs",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Entreprises",
        href: "/dashboard/companies",
        icon: Building2,
    },
    {
        title: "Événements",
        href: "/dashboard/events",
        icon: Calendar,
    },
    {
        title: "Analytique",
        href: "/dashboard/analytics",
        icon: BarChart2,
    },
    {
        title: "Paramètres",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

type MainNavProps = React.HTMLAttributes<HTMLElement>

export function MainNav({ className, ...props }: MainNavProps) {
    const pathname = usePathname()

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {items.map((item) => {
                const Icon = item.icon
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center text-sm font-medium transition-colors hover:text-blue-600 cursor-pointer px-3 py-2 rounded-md",
                            pathname === item.href
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )
} 