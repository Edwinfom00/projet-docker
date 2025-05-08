"use client"

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Toaster } from "sonner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
                <Toaster />
            </div>
        </div>
    )
} 