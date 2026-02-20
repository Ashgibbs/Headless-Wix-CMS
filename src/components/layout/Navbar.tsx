import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Pilgrimage", path: "/pilgrimage" },
  { name: "Temples", path: "/temples" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-golden rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <img 
                src={logo} 
                alt="Temple Gateway Logo" 
                className="w-12 h-12 object-contain rounded-full ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
                Temple Gateway
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Athithi Devo Bhava
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-body text-sm transition-all duration-300 rounded-full ${
                  isActive(link.path)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute inset-0 bg-primary/10 rounded-full -z-10" />
                )}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-4 bg-gradient-hero text-primary-foreground hover:opacity-90 transition-all duration-300 rounded-full px-5 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105"
            >
              <Link to="/temples" className="flex items-center gap-2">
                <Sparkles size={14} />
                Explore
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 text-foreground rounded-full hover:bg-accent/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-border/50">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`block px-4 py-3 rounded-xl font-body text-base transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-primary font-medium bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                } ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-3 bg-gradient-hero text-primary-foreground rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/temples" className="flex items-center justify-center gap-2">
                <Sparkles size={16} />
                Explore Temples
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
