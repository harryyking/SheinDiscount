import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheckIcon, TagIcon, TrendingUpIcon } from "lucide-react"

export default function PremiumDealsPage() {
  // Sample premium deals data
  const premiumDeals = [
    {
      id: 1,
      title: "Summer Collection Flash Sale",
      code: "SUMMER25",
      discount: "25% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "2 days",
    },
    {
      id: 2,
      title: "New Arrivals Special",
      code: "NEWSTYLE",
      discount: "15% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "1 day",
    },
    {
      id: 3,
      title: "Weekend Special Offer",
      code: "WEEKEND20",
      discount: "20% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "3 days",
    },
    {
      id: 4,
      title: "Exclusive Member Discount",
      code: "VIPONLY",
      discount: "30% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "5 days",
      hot: true,
    },
    {
      id: 5,
      title: "Seasonal Clearance",
      code: "CLEAR50",
      discount: "50% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "Limited time",
      hot: true,
    },
    {
      id: 6,
      title: "Accessories Bundle",
      code: "BUNDLE20",
      discount: "20% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "4 days",
    },
    {
      id: 7,
      title: "Premium Collection",
      code: "PREMIUM15",
      discount: "15% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "7 days",
    },
    {
      id: 8,
      title: "Flash Sale: Dresses",
      code: "DRESS30",
      discount: "30% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "24 hours",
      hot: true,
    },
    {
      id: 9,
      title: "Footwear Collection",
      code: "SHOES25",
      discount: "25% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "3 days",
    },
    {
      id: 10,
      title: "First Order Special",
      code: "FIRST15",
      discount: "15% OFF",
      image: "/placeholder.svg?height=200&width=300",
      expiresIn: "No expiry",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <section className="bg-black text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#ff007a] px-4 py-2 rounded-full mb-4">
            <BadgeCheckIcon className="h-5 w-5" />
            <span className="font-medium">Premium Member</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Premium Deals</h1>
          <p className="text-lg mb-6">Thank you for your purchase! Enjoy unlimited access to all our premium deals.</p>
          <div className="flex justify-center gap-2">
            <div className="bg-[#ff007a] text-white px-4 py-2 rounded-full flex items-center">
              <TagIcon className="w-4 h-4 mr-2" />
              <span>Verified Deals</span>
            </div>
            <div className="bg-white text-black px-4 py-2 rounded-full flex items-center">
              <TrendingUpIcon className="w-4 h-4 mr-2" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Deals Section */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">All Premium Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumDeals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-[#ff007a] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {deal.discount}
                </div>
                {deal.hot && (
                  <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                    HOT DEAL
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{deal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm font-mono">{deal.code}</div>
                  <div className="text-sm text-gray-500">Expires in {deal.expiresIn}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">Shop Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Ad Banner Placeholder */}
      <section className="py-8 container mx-auto px-4">
        <div className="bg-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-2">Advertisement</p>
          <div className="h-20 flex items-center justify-center border border-dashed border-gray-400">
            <p className="text-gray-400">Fashion Ad Banner Placeholder</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Fashion Deals</h3>
              <p className="text-gray-400 text-sm mt-1">Your source for exclusive fashion savings</p>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Fashion Deals. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

