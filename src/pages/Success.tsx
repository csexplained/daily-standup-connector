
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurredBackground from "@/components/BlurredBackground";
import NavBar from "@/components/NavBar";

const Success = () => {
  const navigate = useNavigate();
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById("success-content");
      if (element) {
        element.classList.add("opacity-100", "translate-y-0");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <BlurredBackground>
      <NavBar />
      
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-20">
        <div 
          id="success-content"
          className="glass-card max-w-lg mx-auto p-8 text-center opacity-0 translate-y-4 transition-all duration-500 ease-out"
        >
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Update Successfully Submitted!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for submitting your daily standup update. Your team leader has been notified and will review your submission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/standup")}
            >
              <ArrowLeft className="h-4 w-4" />
              Submit Another Update
            </Button>
            
            <Button 
              className="gap-2"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </div>
        </div>
      </main>
    </BlurredBackground>
  );
};

export default Success;
