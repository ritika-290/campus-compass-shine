import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Dashboard from "./pages/Dashboard";
import MoodCheckin from "./pages/MoodCheckin";
import Chatbot from "./pages/Chatbot";
import Community from "./pages/Community";
import ConsentLedger from "./pages/ConsentLedger";
import EmergencySOS from "./pages/EmergencySOS";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-calm">
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/mood" element={<MoodCheckin />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/community" element={<Community />} />
              <Route path="/ledger" element={<ConsentLedger />} />
              <Route path="/sos" element={<EmergencySOS />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
