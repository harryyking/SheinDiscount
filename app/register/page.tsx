"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    topic: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to subscribe")
      }

      const data = await response.json()
      // Redirect to Flutterwave checkout URL
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50">
        <Card className="w-full max-w-md border-2 border-[#00D95F]">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-[#00D95F]" />
            </div>
            <CardTitle className="text-center text-2xl">Subscription Successful!</CardTitle>
            <CardDescription className="text-center">
              Thank you for subscribing to WhatsLearn. Your daily lessons will start soon!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      <Card className="w-full max-w-md border-2 border-[#00D95F]">
        <CardHeader>
          <CardTitle className="text-2xl">Register for WhatsLearn</CardTitle>
          <CardDescription>Start your learning journey with daily WhatsApp lessons for just $10/month</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (123) 456-7890"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">What would you like to learn?</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g., JavaScript, Marketing, Spanish..."
                required
                value={formData.topic}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#00D95F] text-black hover:bg-[#00D95F]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Subscribe Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

