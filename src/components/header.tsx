import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Accessibility, MessageCircle, Home, Info } from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/chat", label: "AI Assistant", icon: MessageCircle },
    { href: "/about", label: "About", icon: Info }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Accessibility className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gradient">AccessiNavi</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                asChild
                className="relative"
              >
                <Link to={item.href} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-md bg-primary -z-10"
                    />
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" asChild className="hidden md:flex">
            <Link to="/chat">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};