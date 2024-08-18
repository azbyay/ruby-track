import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


export const navLinks = [
    {
        name: "My Complaints",
        path: "/complaints"
    },
    {
        name: "Add Complaint",
        path: "/complaint-form"
    },
] as const

export type FormData = z.infer<typeof formSchema>

export const formSchema = z.object({
    complaint: z.string().min(10).max(500),
})