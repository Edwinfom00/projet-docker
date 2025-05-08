import { Bell, Settings } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="w-full h-16 bg-white flex items-center justify-between px-8 shadow-sm border-b border-gray-100">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-80 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-gray-50"
                />
            </div>
            <div className="flex items-center gap-6">
                <button className="relative p-2 rounded-full hover:bg-gray-100" title="Notifications">
                    <Bell size={22} className="text-blue-900" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100" title="Paramètres">
                    <Settings size={22} className="text-blue-900" />
                </button>
                <div className="flex items-center gap-2">
                    <Image
                        src="/avatar.png"
                        alt="Avatar"
                        width={36}
                        height={36}
                        className="rounded-full border border-blue-200"
                    />
                    <span className="text-blue-900 font-medium">Admin</span>
                </div>
            </div>
        </header>
    )
} 