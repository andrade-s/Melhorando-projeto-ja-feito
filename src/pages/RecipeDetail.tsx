import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "@/context/RecipeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, deleteRecipe } = useRecipes();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const recipe = id ? getRecipeById(id) : undefined;

  const handleDelete = () => {
    if (recipe && recipe.isUserRecipe) {
      deleteRecipe(recipe.id);
      toast.success("Receita excluída com sucesso!");
      navigate("/receitas");
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Receita não encontrada</h1>
          <Button onClick={() => navigate("/receitas")}>
            Voltar às receitas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/receitas")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-recipe-text">{recipe.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recipe Image and Info */}
          <div className="space-y-6">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {recipe.category}
              </Badge>
              {recipe.prepTime && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{recipe.prepTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{recipe.servings}</span>
                </div>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl text-recipe-text">Ingredientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-recipe-text">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preparation */}
        <div className="mt-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-recipe-text">Modo de Preparo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-recipe-text leading-relaxed">
                  {recipe.preparation}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Button 
            variant="outline"
            onClick={() => navigate("/receitas")}
          >
            Voltar às Receitas
          </Button>
          <Button 
            className="bg-gradient-warm"
            onClick={() => navigate("/nova-receita")}
          >
            Adicionar Nova Receita
          </Button>
          {recipe.isUserRecipe && (
            <>
              <Button 
                variant="secondary"
                onClick={() => navigate(`/receita/${recipe.id}/editar`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Receita
              </Button>
              <Button 
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Receita
              </Button>
            </>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir receita</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a receita "{recipe.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}