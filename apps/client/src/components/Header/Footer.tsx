import { Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail } from "lucide-react";

function Footer() {
  return (
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
  )
}

export default Footer