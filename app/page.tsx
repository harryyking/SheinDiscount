"use client"

import React from "react"
import Link from "next/link"
import { Menu, X, Check, Star, ChevronRight } from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="bg-base-100 sticky top-0 z-50 border-b border-base-200">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-2xl text-primary">PricePulse</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-base-content hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="#pricing" className="text-base-content hover:text-primary transition-colors font-medium">
              Pricing
            </Link>
            <Link href="#how-it-works" className="text-base-content hover:text-primary transition-colors font-medium">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-base-content hover:text-primary transition-colors font-medium">
              Testimonials
            </Link>
            <Link href="#contact" className="text-base-content hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="btn btn-circle btn-ghost md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-base-100 border-t border-base-200 shadow-lg">
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              <Link
                href="#"
                className="text-base-content hover:text-primary transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="#pricing"
                className="text-base-content hover:text-primary transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link
                href="#how-it-works"
                className="text-base-content hover:text-primary transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-base-content hover:text-primary transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-base-content hover:text-primary transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary-content/10 to-base-100 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="badge badge-primary mb-4 py-3 px-4 font-medium">Optimize Your Pricing</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-6 leading-tight">
              Price Smarter, <span className="text-primary">Grow Faster</span>
            </h1>
            <p className="text-xl text-base-content/80 mb-8 max-w-xl">
              Unlock the perfect price for every plan with real customer feedback—instantly boost conversions and MRR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="btn btn-primary btn-lg">Start Free Trial</button>
              <Link href="#how-it-works" className="btn btn-outline btn-lg">
                See How It Works
              </Link>
            </div>

            <div className="flex items-center bg-base-200/50 p-4 rounded-lg">
              <div className="avatar-group -space-x-4 mr-4">
                <div className="avatar border-2 border-base-100">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=1" alt="User avatar" />
                  </div>
                </div>
                <div className="avatar border-2 border-base-100">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=2" alt="User avatar" />
                  </div>
                </div>
                <div className="avatar border-2 border-base-100">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
                  </div>
                </div>
                <div className="avatar border-2 border-base-100">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=4" alt="User avatar" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-10 bg-primary text-primary-content font-medium rounded-full">
                    <span>+2k</span>
                  </div>
                </div>
              </div>
              <span className="text-base-content/80 text-sm md:text-base font-medium">
                Join 2,000+ businesses pricing with confidence
              </span>
            </div>
          </div>

          <div className="md:w-1/2 md:pl-8">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Price Optimization Widget</h3>
                    <div className="badge badge-secondary">Live Demo</div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Basic Plan</span>
                        <span className="font-bold text-primary">$29/mo</span>
                      </div>
                      <div className="w-full bg-base-200 rounded-full h-4">
                        <div className="bg-primary h-4 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-base-content/70">
                        <span>Too Low</span>
                        <span className="font-medium">Just Right</span>
                        <span>Too High</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Pro Plan</span>
                        <span className="font-bold text-primary">$59/mo</span>
                      </div>
                      <div className="w-full bg-base-200 rounded-full h-4">
                        <div className="bg-primary h-4 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-base-content/70">
                        <span>Too Low</span>
                        <span className="font-medium">Just Right</span>
                        <span>Too High</span>
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="flex justify-center">
                      <div className="stats shadow">
                        <div className="stat place-items-center">
                          <div className="stat-title">Votes</div>
                          <div className="stat-value text-primary">1,247</div>
                          <div className="stat-desc">↗︎ 14% from last month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="badge badge-secondary mb-4">Pricing Plans</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing, Massive Results</h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Pick a plan that scales with your business—no guesswork, just growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="card bg-base-100 hover:shadow-xl transition-shadow border border-base-300">
              <div className="card-body p-8">
                <h3 className="card-title text-2xl font-bold">Free</h3>
                <div className="text-4xl font-bold mb-6">
                  $0<span className="text-base-content/60 text-lg font-normal">/mo</span>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>1 product</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>50 votes/mo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <p className="text-base-content/60 mb-8 text-sm">Test the waters—prove it works for free.</p>
                <div className="card-actions mt-auto">
                  <button className="btn btn-outline w-full">Get Started</button>
                </div>
              </div>
            </div>

            {/* Starter Tier */}
            <div className="card bg-base-100 shadow-xl border-2 border-primary/20 relative">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <div className="badge badge-primary py-3 px-4">Most Popular</div>
              </div>
              <div className="card-body p-8">
                <h3 className="card-title text-2xl font-bold">Starter</h3>
                <div className="text-4xl font-bold mb-6">
                  $29<span className="text-base-content/60 text-lg font-normal">/mo</span>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>5 products</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>500 votes/mo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <p className="text-base-content/60 mb-8 text-sm">Perfect for growing businesses ready to optimize.</p>
                <div className="card-actions mt-auto">
                  <button className="btn btn-primary w-full">Start Free Trial</button>
                </div>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="card bg-base-100 hover:shadow-xl transition-shadow border border-base-300">
              <div className="card-body p-8">
                <h3 className="card-title text-2xl font-bold">Pro</h3>
                <div className="text-4xl font-bold mb-6">
                  $59<span className="text-base-content/60 text-lg font-normal">/mo</span>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>25 products</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>Unlimited votes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span>Custom branding</span>
                  </li>
                </ul>
                <p className="text-base-content/60 mb-8 text-sm">Go all-in—maximize revenue across all your plans.</p>
                <div className="card-actions mt-auto">
                  <button className="btn btn-primary w-full">Start Free Trial</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="badge badge-secondary mb-4">Simple Process</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Price Optimization in 3 Simple Steps</h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Embed, collect, adjust—it's that easy to find your sweet spot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="card-body items-center text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="badge badge-primary mb-2">Step 1</div>
                <h3 className="text-xl font-bold mb-4">Embed the Widget</h3>
                <p className="text-base-content/70">
                  Drop our sleek widget onto your site in minutes—no coding required.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="card-body items-center text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <div className="badge badge-primary mb-2">Step 2</div>
                <h3 className="text-xl font-bold mb-4">Collect Feedback</h3>
                <p className="text-base-content/70">
                  Let customers vote 'Too High,' 'Just Right,' or 'A Steal'—instant insights roll in.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="card-body items-center text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="badge badge-primary mb-2">Step 3</div>
                <h3 className="text-xl font-bold mb-4">Boost Revenue</h3>
                <p className="text-base-content/70">Tweak prices based on real data—watch conversions and MRR soar.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button className="btn btn-primary btn-lg gap-2">
              Get Started Now
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Wall of Love (Testimonials) */}
      <section id="testimonials" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="badge badge-secondary mb-4">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Businesses Like Yours</h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              See how PricePulse transforms pricing—and profits.
            </p>
          </div>

          <div className="carousel carousel-center max-w-5xl mx-auto p-4 space-x-4 rounded-box">
            {/* Testimonial 1 */}
            <div className="carousel-item w-full md:w-96">
              <div className="card bg-base-200 shadow-md h-full">
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://i.pravatar.cc/150?img=32" alt="Jane D." />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Jane D.</p>
                      <p className="text-sm text-base-content/60">SaaS CEO</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="italic mb-4 text-lg">
                    "Raised my Pro plan $5 after 100 votes—added $1K MRR in a week!"
                  </p>
                  <div className="badge badge-outline">SaaS</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="carousel-item w-full md:w-96">
              <div className="card bg-base-200 shadow-md h-full">
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://i.pravatar.cc/150?img=61" alt="Mark T." />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Mark T.</p>
                      <p className="text-sm text-base-content/60">Shop Owner</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="italic mb-4 text-lg">
                    "Found out my Basic tier was 'Too High'—dropped it $10, sales up 30%."
                  </p>
                  <div className="badge badge-outline">E-commerce</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="carousel-item w-full md:w-96">
              <div className="card bg-base-200 shadow-md h-full">
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://i.pravatar.cc/150?img=43" alt="Alex R." />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Alex R.</p>
                      <p className="text-sm text-base-content/60">Designer</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="italic mb-4 text-lg">
                    "Clients love voting—it's like free market research. Doubled my gigs!"
                  </p>
                  <div className="badge badge-outline">Freelancer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to optimize your pricing?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses that have increased their revenue with PricePulse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-base-100 text-primary hover:bg-base-200">Start Free Trial</button>
              <button className="btn btn-lg btn-outline border-base-100 text-base-100 hover:bg-primary-focus hover:border-base-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content">
        <div className="container mx-auto">
          <div className="footer p-10">
            <div>
              <span className="footer-title text-lg opacity-100">PricePulse</span>
              <p className="max-w-xs mt-2">
                Helping businesses find the perfect price point through real customer feedback since 2023.
              </p>
              <div className="flex gap-4 mt-4">
                <a className="btn btn-circle btn-outline btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a className="btn btn-circle btn-outline btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a className="btn btn-circle btn-outline btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <span className="footer-title">Company</span>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Careers</a>
              <a className="link link-hover">Press kit</a>
            </div>

            <div>
              <span className="footer-title">Product</span>
              <a className="link link-hover">Features</a>
              <a className="link link-hover">Pricing</a>
              <a className="link link-hover">Integrations</a>
              <a className="link link-hover">API</a>
            </div>

            <div>
              <span className="footer-title">Legal</span>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </div>
          </div>

          <div className="footer footer-center p-4 border-t border-base-300">
            <div>
              <p>© 2023 PricePulse - All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

