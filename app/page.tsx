"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, LineChart, PieChart, ArrowRight, Upload, Settings, Download, CheckCircle, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "Beautiful Visualizations",
      description: "Create professional-looking bar, line, and pie charts with just a few clicks",
      icon: <BarChart3 className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Easy Data Import",
      description: "Upload CSV files or paste data directly - no technical skills required",
      icon: <Upload className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Customizable Options",
      description: "Personalize your graphs with custom colors, titles, and display options",
      icon: <Settings className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Export & Share",
      description: "Download your visualizations as images to use in presentations or reports",
      icon: <Download className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Import Your Data",
      description: "Upload a CSV file or paste your data directly into the tool",
    },
    {
      number: "02",
      title: "Customize Your Graph",
      description: "Choose your graph type and adjust settings to match your needs",
    },
    {
      number: "03",
      title: "Export & Share",
      description: "Download your visualization or share it directly with your team",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-400" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-emerald-400" />
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-teal-400" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create <span className="text-primary">Beautiful Graphs</span> in Seconds
                </h1>
                <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                  Transform your data into stunning visualizations without any technical skills. Upload, customize, and
                  share professional charts in just a few clicks.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    View Examples
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-white p-2 rounded-lg shadow-xl">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Data visualization dashboard"
                    className="rounded w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">3+</p>
              <p className="text-gray-600">Chart Types</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">10s</p>
              <p className="text-gray-600">Setup Time</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">0</p>
              <p className="text-gray-600">Coding Required</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">∞</p>
              <p className="text-gray-600">Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need for Quick Data Visualization
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform provides all the tools you need to transform raw data into compelling visual stories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all cursor-pointer ${
                    activeFeature === index ? "bg-primary/5 border border-primary/10 shadow-sm" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        activeFeature === index ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur-lg opacity-20" />
              <div className="relative bg-white p-2 rounded-lg shadow-lg">
                <img
                  src={features[activeFeature].image || "/placeholder.svg"}
                  alt={features[activeFeature].title}
                  className="rounded w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Create professional visualizations in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-primary/20 -translate-x-1/2 z-0">
                    <ChevronRight className="absolute top-1/2 right-0 h-6 w-6 text-primary/30 -translate-y-1/2" />
                  </div>
                )}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>

                  <div className="mt-6 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt={`Step ${step.number} illustration`}
                      className="max-h-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Visualizations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Stunning Visualizations</h2>
            <p className="mt-4 text-xl text-gray-600">See what you can create with our easy-to-use platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="p-4 bg-primary/5">
                <img src="/placeholder.svg?height=200&width=300" alt="Bar chart example" className="w-full rounded" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Sales Performance</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Monthly sales data visualization with customizable colors and labels
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="p-4 bg-primary/5">
                <img src="/placeholder.svg?height=200&width=300" alt="Line chart example" className="w-full rounded" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Growth Trends</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Track performance over time with interactive line charts and tooltips
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="p-4 bg-primary/5">
                <img src="/placeholder.svg?height=200&width=300" alt="Pie chart example" className="w-full rounded" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Market Segments</h3>
                </div>
                <p className="text-sm text-gray-600">Visualize proportions and percentages with beautiful pie charts</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-300 text-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800">Data Viz for Hustlers</h2>
              <p className="mt-2">Beautiful data visualization made simple</p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Examples
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Data Viz for Hustlers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
