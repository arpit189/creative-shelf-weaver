
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import CaseStudies from "@/pages/CaseStudies";
import CreateCaseStudy from "@/pages/CreateCaseStudy";
import EditCaseStudy from "@/pages/EditCaseStudy";
import Portfolio from "@/pages/Portfolio";
import Settings from "@/pages/Settings";
import UserPortfolio from "@/pages/UserPortfolio";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/case-studies" element={<CaseStudies />} />
              <Route path="/dashboard/case-studies/new" element={<CreateCaseStudy />} />
              <Route path="/dashboard/case-studies/edit/:id" element={<EditCaseStudy />} />
              <Route path="/dashboard/portfolio" element={<Portfolio />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              
              {/* Portfolio Routes */}
              <Route path="/:username" element={<UserPortfolio />} />
              <Route path="/:username/case-study/:slug" element={<CaseStudyDetail />} />
              
              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
