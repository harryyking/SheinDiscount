import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, DollarSign } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Learn Anything, Anytime with WhatsLearn
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                  Daily AI-powered micro-lessons delivered via WhatsApp for $10/month
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="bg-[#00D95F] text-black hover:bg-[#00D95F]/90">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 border-[#00D95F]">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-[#00D95F]" />
                  <CardTitle className="mt-4">Personalized Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    AI-tailored micro-lessons designed specifically for your learning goals and preferences.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#00D95F]">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-[#00D95F]" />
                  <CardTitle className="mt-4">WhatsApp Convenience</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Learn directly in WhatsApp - no new apps to download or platforms to navigate.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#00D95F]">
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-[#00D95F]" />
                  <CardTitle className="mt-4">Affordable Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Quality education at just $10/month - less than the cost of a streaming service.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-black">
        <div className="container px-4 md:px-6">
          <p className="text-center text-[#00D95F]">© {new Date().getFullYear()} WhatsLearn</p>
        </div>
      </footer>
    </div>
  )
}

