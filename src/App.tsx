import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos";
import Protocolos from "./pages/Protocolos";
import Agendamento from "./pages/Agendamento";
import Conhecimento from "./pages/Conhecimento";
import AreaUsuario from "./pages/AreaUsuario";
import ResetPassword from "./pages/ResetPassword";
import Eventos from "./pages/Eventos";
import Ebooks from "./pages/Ebooks";
import Carrinho from "./pages/Carrinho";
import Treinos from "./pages/Treinos";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/protocolos" element={<Protocolos />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/conhecimento" element={<Conhecimento />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/treinos" element={<Treinos />} />
            <Route path="/area-usuario" element={<AreaUsuario />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
