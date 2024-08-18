/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Y4hUmaNeZ0F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Submit a Complaint</CardTitle>
                <CardDescription>
                    We take all complaints seriously. Please provide the details below so we can address your issue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="complaint">Complaint Details</Label>
                        <Textarea id="complaint" placeholder="Describe your complaint in detail" className="min-h-[150px]" />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit Complaint
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}