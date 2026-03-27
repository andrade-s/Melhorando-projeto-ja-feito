import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "@/context/RecipeContext";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Italiana",
  "Brasileira",
  "Sobremesa",
  "Massa",
  "Carne",
  "Peixe",
  "Vegetariana",
  "Salada",
  "Sopa"
];

export default function NovaReceita() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [category, setCategory] = useState("");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [image, setImage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert ingredients string to array
    const ingredientsArray = ingredients
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);

    // Add the recipe
    addRecipe({
      title: name,
      ingredients: ingredientsArray,
      preparation,
      category,
      servings,
      prepTime,
      image: image || "/pizza-recipe.jpg" // Use uploaded image or default
    });

    toast.success("Receita adicionada com sucesso!");
    navigate("/receitas");
  };

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
            <h1 className="text-2xl font-bold text-recipe-text">Nova Receita</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-recipe-text">Criar Nova Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipe Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Pizza Margherita"
                  required
                />
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredientes</Label>
                <Textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Digite os ingredientes separados por vírgula..."
                  rows={4}
                  required
                />
              </div>

              {/* Preparation Mode */}
              <div className="space-y-2">
                <Label htmlFor="preparation">Modo de preparo</Label>
                <Textarea
                  id="preparation"
                  value={preparation}
                  onChange={(e) => setPreparation(e.target.value)}
                  placeholder="Descreva o passo a passo do preparo..."
                  rows={6}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Servings and Prep Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servings">Porções</Label>
                  <Input
                    id="servings"
                    type="text"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    placeholder="Ex: 4 porções"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Tempo de preparo</Label>
                  <Input
                    id="prepTime"
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="Ex: 30-45 min"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Foto da receita</Label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="image-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer block"
                >
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-gray-500">
                        Clique para alterar a imagem
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Clique para fazer upload da foto da receita
                      </p>
                    </>
                  )}
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-warm hover:opacity-90 transition-opacity"
                size="lg"
              >
                Salvar Receita
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}