
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RPSGame from "./pages/RPSGame";
import DiceGame from "./pages/DiceGame";
import GuessingGame from "./pages/GuessingGame";
import SplashScreen from "./components/SplashScreen";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Show splash screen only on the root path
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [location.pathname]);
  
  // If we're at root path and splash is active, show splash screen
  if (location.pathname === "/" && showSplash) {
    return <SplashScreen />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/rps" element={<RPSGame />} />
      <Route path="/dice" element={<DiceGame />} />
      <Route path="/guess" element={<GuessingGame />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
