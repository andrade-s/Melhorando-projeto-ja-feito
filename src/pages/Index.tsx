import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChefHat, Users, Search } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-recipe-neutral to-white flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-16 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-warm p-6 rounded-2xl">
                <ChefHat className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-recipe-text">
              Minha<span className="bg-gradient-warm bg-clip-text text-transparent"> Cozinha</span>
            </h1>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            <div className="text-center space-y-4">
              <Search className="h-10 w-10 mx-auto text-primary" />
              <h3 className="font-semibold text-xl">Descobrir Receitas</h3>
            </div>
            <div className="text-center space-y-4">
              <ChefHat className="h-10 w-10 mx-auto text-primary" />
              <h3 className="font-semibold text-xl">Compartilhar</h3>
            </div>
            <div className="text-center space-y-4">
              <Users className="h-10 w-10 mx-auto text-primary" />
              <h3 className="font-semibold text-xl">Comunidade</h3>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6 mt-20">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-warm hover:opacity-90 transition-opacity text-xl px-12 py-6 h-auto"
                onClick={() => navigate("/cadastro")}
              >
                Começar Agora
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-xl px-12 py-6 h-auto"
                onClick={() => navigate("/login")}
              >
                Já tenho conta
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Grátis para sempre • Sem cartão necessário
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
