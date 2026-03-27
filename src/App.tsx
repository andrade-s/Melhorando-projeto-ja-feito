import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "@/context/RecipeContext";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Receitas from "./pages/Receitas";
import NovaReceita from "./pages/NovaReceita";
import EditarReceita from "./pages/EditarReceita";
import RecipeDetail from "./pages/RecipeDetail";
import PerfilUsuario from "./pages/PerfilUsuario";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RecipeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/receitas" element={<Receitas />} />
            <Route path="/receita/:id" element={<RecipeDetail />} />
            <Route path="/receita/:id/editar" element={<EditarReceita />} />
            <Route path="/nova-receita" element={<NovaReceita />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            {/* ADICIONE TODAS AS ROTAS PERSONALIZADAS ACIMA DA ROTA CATCH-ALL "*" */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </RecipeProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
