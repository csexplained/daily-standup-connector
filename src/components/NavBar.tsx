
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          Daily Standup
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-foreground/80 hover:text-foreground transition-colors", 
              location.pathname === "/" && "text-primary font-medium"
            )}
          >
            Home
          </Link>
          <Link 
            to="/standup" 
            className={cn(
              "text-foreground/80 hover:text-foreground transition-colors", 
              location.pathname === "/standup" && "text-primary font-medium"
            )}
          >
            Submit Standup
          </Link>
          <Link 
            to="/dashboard" 
            className={cn(
              "text-foreground/80 hover:text-foreground transition-colors", 
              location.pathname === "/dashboard" && "text-primary font-medium"
            )}
          >
            Dashboard
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border animate-slide-down">
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={cn(
                "py-2 text-foreground/80 hover:text-foreground transition-colors", 
                location.pathname === "/" && "text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/standup" 
              className={cn(
                "py-2 text-foreground/80 hover:text-foreground transition-colors", 
                location.pathname === "/standup" && "text-primary font-medium"
              )}
            >
              Submit Standup
            </Link>
            <Link 
              to="/dashboard" 
              className={cn(
                "py-2 text-foreground/80 hover:text-foreground transition-colors", 
                location.pathname === "/dashboard" && "text-primary font-medium"
              )}
            >
              Dashboard
            </Link>
            <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
              <span className="text-sm text-muted-foreground">
                Switch theme
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
