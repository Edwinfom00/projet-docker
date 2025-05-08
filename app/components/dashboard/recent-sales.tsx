"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Amadou Moussa</p>
                    <p className="text-sm text-muted-foreground">
                        amadou.moussa@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+150,000 FCFA</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>ND</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Nadia Douala</p>
                    <p className="text-sm text-muted-foreground">nadia.douala@example.com</p>
                </div>
                <div className="ml-auto font-medium">+75,000 FCFA</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>KB</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Kouamé Bamba</p>
                    <p className="text-sm text-muted-foreground">
                        kouame.bamba@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+200,000 FCFA</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>SY</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Sarah Yaoundé</p>
                    <p className="text-sm text-muted-foreground">sarah.y@example.com</p>
                </div>
                <div className="ml-auto font-medium">+125,000 FCFA</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Moussa Doumbia</p>
                    <p className="text-sm text-muted-foreground">moussa.d@example.com</p>
                </div>
                <div className="ml-auto font-medium">+85,000 FCFA</div>
            </div>
        </div>
    )
} 