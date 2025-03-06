
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurredBackground from "@/components/BlurredBackground";
import NavBar from "@/components/NavBar";

const featureItems = [
  {
    title: "Daily Updates",
    description: "Keep your team aligned with structured daily updates",
    icon: <CheckCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "Visual Progress",
    description: "Attach screenshots of your work to showcase progress",
    icon: <CheckCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "Email Notifications",
    description: "Automatic email summaries sent to team leaders",
    icon: <CheckCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "Centralized Storage",
    description: "All submissions securely stored for easy reference",
    icon: <CheckCircle className="h-6 w-6 text-primary" />
  }
];

const Index = () => {
  const navigate = useNavigate();
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    featureRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <BlurredBackground>
      <NavBar />

      <main className="container mx-auto px-4 pt-28 pb-20">
        {/* Hero section */}
        <section className="flex flex-col items-center justify-center text-center py-16 md:py-24 space-y-6 md:space-y-8">
          <div className="inline-block animate-fade-in">
            <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4 inline-block">
              Streamline Your Daily Standups
            </div>
          </div>
          
          <h1 className="hero-text max-w-3xl mx-auto animate-slide-up">
            Keep Your Team Synchronized with Daily Updates
          </h1>
          
          <p className="subtitle max-w-2xl mx-auto animation-delay-200 animate-slide-up">
            A beautiful, minimal form for your team to share progress, plans, and blockers. Collect screenshots and keep everyone in sync.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 animation-delay-300 animate-slide-up">
            <Button 
              size="lg" 
              className="rounded-full font-medium px-8"
              onClick={() => navigate("/standup")}
            >
              Submit Daily Update <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full font-medium"
              onClick={() => navigate("/dashboard")}
            >
              View Submissions
            </Button>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 animate-on-scroll">
              Designed for Clarity and Focus
            </h2>
            <p className="subtitle animate-on-scroll">
              Inspired by minimal design principles, our standup form helps teams share meaningful updates without distractions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featureItems.map((item, i) => (
              <div 
                key={i}
                ref={el => featureRefs.current[i] = el}
                className="glass-card p-6 animate-on-scroll"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24">
          <div className="glass-card max-w-4xl mx-auto p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Get Started?
            </h2>
            <p className="subtitle max-w-2xl mx-auto mb-8">
              Join your team and start sharing your daily updates to keep everyone aligned and moving forward.
            </p>
            <Button 
              size="lg" 
              className="rounded-full font-medium px-8"
              onClick={() => navigate("/standup")}
            >
              Submit Your First Update <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Daily Standup Form. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </BlurredBackground>
  );
};

export default Index;
