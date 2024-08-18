'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type FormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    complaint: z.string().min(10).max(500),
})

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            complaint: "",
        },
    })
    const onSubmit = (data: FormValues) => console.log(data)
    return (
        <section className="w-full max-w-3xl mx-auto h-full pt-36">
            <Card className="w-full max-w-2xl mx-auto bg-gray-50 border-none shadow-md h-auto">
                <CardHeader>
                    <CardTitle>Submit a Complaint</CardTitle>
                    <CardDescription>Please fill out the form below to submit your complaint.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

                        <div className="grid gap-2">
                            <Label htmlFor="complaint" className="mb-1">Complaint Details</Label>
                            <Textarea id="complaint" {...register("complaint")} placeholder="Describe your complaint" className="border-none h-48" />
                            {errors.complaint && <p className="text-red-500 text-sm">{errors.complaint.message}</p>}
                        </div>

                        <Button type="submit">Submit Complaint</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}