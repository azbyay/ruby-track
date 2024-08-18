'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/lib/data"
import type { FormData } from "@/lib/data"
import { useMutation } from "@tanstack/react-query"
import { createComplaint } from "../actions/complaint"
import { useRef } from "react"


export default function Page() {
    const complaintRef = useRef<HTMLTextAreaElement>(null)

    const { mutate: handleCreateComplaint, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            if (!complaintRef || !complaintRef.current || !complaintRef.current.value) return;
            // Extract the complaint text directly from the ref's current value
            const complaintText = complaintRef.current.value;
            console.log('complaintRef.current.value', complaintText);
            // Pass the complaint text directly to createComplaint
            await createComplaint(complaintText);
            complaintRef.current.value = "";
        },
        onError: (error) => console.error(error),
        onSuccess: () => {
            alert("Complaint submitted successfully")
        }
    })

    return (
        <section className="w-full max-w-3xl mx-auto h-full pt-36">
            <Card className="w-full max-w-2xl mx-auto bg-gray-50 border-none shadow-md h-auto">
                <CardHeader>
                    <CardTitle>Submit a Complaint</CardTitle>
                    <CardDescription>Please fill out the form below to submit your complaint.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">

                        <div className="grid gap-2">
                            <Label htmlFor="complaint" className="mb-1">Complaint Details</Label>
                            <Textarea ref={complaintRef} placeholder="Describe your complaint" className="border-none h-48" />
                            {isError && <p className="text-red-500 text-sm">{error.message}</p>}
                        </div>

                        <Button type="submit" disabled={isPending} onClick={() => handleCreateComplaint()}>Submit Complaint</Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}