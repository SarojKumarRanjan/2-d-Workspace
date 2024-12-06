import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Map, Video, Globe, Gamepad, Share2, Sparkles, MessageSquare, Zap, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <Gamepad className="h-6 w-6" />
              <span className="font-bold">MetaSpace</span>
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
              <a href="#spaces" className="text-sm font-medium hover:text-primary">Spaces</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate("/signin")}>Sign In</Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-24 md:pb-12 md:pt-32 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Now in Public Beta
            </div>
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Virtual Spaces for
              <span className="text-primary"> Real Connections</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Create and customize your own virtual spaces. Connect with others in real-time through
              interactive environments designed for collaboration and fun.
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={() => navigate("/spaces")}>
                Explore Spaces
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/create")}>
                Create Space
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Features</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to create and manage virtual spaces for your team or community.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Users className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time Interaction</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with others through video, voice, and chat in customizable spaces.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Map className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Custom Spaces</h3>
                  <p className="text-sm text-muted-foreground">
                    Create and customize your own virtual spaces with interactive elements.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Video className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Video Meetings</h3>
                  <p className="text-sm text-muted-foreground">
                    Seamlessly integrate video calls within your virtual space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spaces Preview Section */}
        <section id="spaces" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Popular Spaces</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Discover amazing virtual spaces created by our community.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3 mt-8">
            {/* Space Preview Cards */}
            <div className="group relative rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
              <div className="h-48 rounded-md bg-primary/10 mb-4"></div>
              <h3 className="font-semibold mb-2">Virtual Office Space</h3>
              <p className="text-sm text-muted-foreground mb-4">A professional environment for remote teams.</p>
              <Button variant="outline" className="w-full">Join Space</Button>
            </div>
            <div className="group relative rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
              <div className="h-48 rounded-md bg-primary/10 mb-4"></div>
              <h3 className="font-semibold mb-2">Game Room</h3>
              <p className="text-sm text-muted-foreground mb-4">Play and chat with friends in a casual setting.</p>
              <Button variant="outline" className="w-full">Join Space</Button>
            </div>
            <div className="group relative rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
              <div className="h-48 rounded-md bg-primary/10 mb-4"></div>
              <h3 className="font-semibold mb-2">Learning Hub</h3>
              <p className="text-sm text-muted-foreground mb-4">Interactive space for education and workshops.</p>
              <Button variant="outline" className="w-full">Join Space</Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">What Users Say</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Don't just take our word for it. Here's what our community has to say.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3 mt-8">
            <div className="rounded-lg border bg-background p-6">
              <p className="text-sm text-muted-foreground mb-4">
                "MetaSpace has transformed how our remote team collaborates. It feels like we're actually working together in the same room!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                <div className="ml-4">
                  <p className="text-sm font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <p className="text-sm text-muted-foreground mb-4">
                "The customization options are incredible. We've created the perfect virtual space for our team's needs."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                <div className="ml-4">
                  <p className="text-sm font-semibold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Tech Lead</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <p className="text-sm text-muted-foreground mb-4">
                "The real-time interaction features make virtual meetings actually enjoyable. It's a game-changer!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                <div className="ml-4">
                  <p className="text-sm font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Community Manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="relative rounded-lg border bg-background p-8 md:p-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl md:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg">
                Join thousands of users already creating and exploring virtual spaces.
              </p>
              <Button size="lg" onClick={() => navigate("/signup")}>
                Create Your Space
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Gamepad className="h-6 w-6" />
              <span className="font-bold">MetaSpace</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Building the future of virtual interactions.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features">Features</a></li>
                <li><a href="#spaces">Spaces</a></li>
                <li><a href="/pricing">Pricing</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/careers">Careers</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Social</h4>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container flex flex-col items-center gap-2 py-4 md:flex-row md:justify-between md:gap-0">
            <p className="text-sm text-muted-foreground">
              © 2024 MetaSpace. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}