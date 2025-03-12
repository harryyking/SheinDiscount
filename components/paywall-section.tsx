"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, UnlockIcon } from "lucide-react"
import PaystackCheckout from "@/components/paystack-checkout"

export default function PaywallSection() {
  const [showPayment, setShowPayment] = useState(false)

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-[#ff007a]">
            <CardHeader className="text-center bg-gradient-to-r from-black to-[#ff007a] text-white">
              <CardTitle className="text-2xl md:text-3xl">Unlock All Premium Deals</CardTitle>
              <CardDescription className="text-gray-200">One-time payment for lifetime access</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#ff007a] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Access 10+ Exclusive Deals</h3>
                    <p className="text-sm text-gray-500">Get access to all our premium deals and promo codes</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#ff007a] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Daily Updates</h3>
                    <p className="text-sm text-gray-500">New deals added regularly to maximize your savings</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#ff007a] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Early Access</h3>
                    <p className="text-sm text-gray-500">Be the first to know about flash sales before they sell out</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#ff007a] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Lifetime Access</h3>
                    <p className="text-sm text-gray-500">Pay once and enjoy all premium features forever</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-block bg-gray-100 px-6 py-3 rounded-full">
                  <span className="text-gray-500 line-through text-lg">$19.99</span>
                  <span className="text-3xl font-bold ml-2">$5.99</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {showPayment ? (
                <PaystackCheckout onCancel={() => setShowPayment(false)} />
              ) : (
                <Button
                  className="w-full bg-[#ff007a] hover:bg-[#d6006a] text-white py-6 text-lg"
                  onClick={() => setShowPayment(true)}
                >
                  <UnlockIcon className="mr-2 h-5 w-5" />
                  Unlock All Deals Now
                </Button>
              )}
              <p className="text-xs text-center text-gray-500">
                Secure payment powered by Paystack. No recurring charges.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

