import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import FindLawyers from "./pages/FindLawyers";
import Community from "./pages/Community";
import DocumentReview from "./pages/DocumentReview";
import MapView from "./pages/MapView";
import Payments from "./pages/Payments";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <div className="flex flex-col min-h-screen">
            {/* Global Navbar */}
            <Navbar />

            {/* Main Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/find" element={<FindLawyers />} />
                <Route path="/community" element={<Community />} />
                <Route path="/document-review" element={<DocumentReview />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/payments" element={<Payments />} />
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Floating Chatbot */}
            <Chatbot />
          </div>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
