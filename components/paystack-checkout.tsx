"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftIcon, CreditCardIcon, LoaderIcon } from "lucide-react"

interface PaystackCheckoutProps {
  onCancel: () => void
}

export default function PaystackCheckout({ onCancel }: PaystackCheckoutProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // In a real implementation, you would:
      // 1. Call your backend to initialize a Paystack transaction
      // 2. Redirect to Paystack checkout or use Paystack inline

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, redirect to the premium deals page
      window.location.href = "/premium-deals"
    } catch (err) {
      setError("Payment processing failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Button variant="ghost" className="mb-4" onClick={onCancel}>
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button type="submit" className="w-full bg-[#ff007a] hover:bg-[#d6006a] text-white py-6" disabled={loading}>
          {loading ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Pay $5.99
            </>
          )}
        </Button>

        <div className="text-xs text-center text-gray-500">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </div>
      </form>
    </div>
  )
}

