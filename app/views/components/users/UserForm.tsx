import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2, UserPlus, UserCog } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const userFormSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
    role: z.enum(["USER", "ADMIN", "MANAGER"]),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
    phone: z.string().optional(),
    address: z.string().optional(),
})

type UserFormData = z.infer<typeof userFormSchema>

interface UserFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: UserFormData) => Promise<void>
    initialData?: UserFormData
}

export function UserForm({ open, onClose, onSubmit, initialData }: UserFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: initialData || {
            name: "",
            email: "",
            password: "",
            role: "USER",
            status: "ACTIVE",
            phone: "",
            address: "",
        },
    })

    const handleSubmit = async (data: UserFormData) => {
        try {
            setIsSubmitting(true)
            await onSubmit(data)
            toast.success(initialData ? "Utilisateur mis à jour avec succès" : "Utilisateur créé avec succès")
            onClose()
        } catch (error) {
            console.error('Erreur lors de la soumission:', error)
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (initialData) {
            form.reset(initialData)
        } else {
            form.reset({
                name: "",
                email: "",
                password: "",
                role: "USER",
                status: "ACTIVE",
                phone: "",
                address: "",
            })
        }
    }, [initialData, form, open])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[525px] bg-white dark:bg-gray-900">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {initialData ? (
                            <>
                                <UserCog className="w-6 h-6" />
                                Modifier l'utilisateur
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-6 h-6" />
                                Créer un nouvel utilisateur
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-400">
                        {initialData
                            ? "Modifiez les informations de l'utilisateur ci-dessous."
                            : "Remplissez le formulaire pour créer un nouvel utilisateur."
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">Nom</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors"
                                                placeholder="Entrez le nom"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors"
                                                placeholder="Entrez l'email"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </motion.div>

                        <AnimatePresence>
                            {!initialData && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-300">Mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors"
                                                        type="password"
                                                        placeholder="Entrez le mot de passe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">Téléphone</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors"
                                                placeholder="Entrez le numéro"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">Adresse</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors"
                                                placeholder="Entrez l'adresse"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">Rôle</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors">
                                                    <SelectValue placeholder="Sélectionnez un rôle" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="USER">Utilisateur</SelectItem>
                                                <SelectItem value="ADMIN">Administrateur</SelectItem>
                                                <SelectItem value="MANAGER">Manager</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">Statut</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="shadow-sm border-gray-300 dark:border-gray-700 focus:ring-blue-500 transition-colors">
                                                    <SelectValue placeholder="Sélectionnez un statut" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ACTIVE">Actif</SelectItem>
                                                <SelectItem value="INACTIVE">Inactif</SelectItem>
                                                <SelectItem value="SUSPENDED">Suspendu</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="flex justify-end space-x-3"
                        >
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {initialData ? "Mise à jour..." : "Création..."}
                                    </>
                                ) : (
                                    initialData ? "Mettre à jour" : "Créer"
                                )}
                            </Button>
                        </motion.div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}