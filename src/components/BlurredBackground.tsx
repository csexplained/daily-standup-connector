
import React from "react";

interface BlurredBackgroundProps {
  children: React.ReactNode;
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-background/90">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BlurredBackground;
