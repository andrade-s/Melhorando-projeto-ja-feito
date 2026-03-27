import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  preparation: string;
  category: string;
  createdAt: string;
  isUserRecipe: boolean;
  servings?: string;
  prepTime?: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id" | "createdAt" | "isUserRecipe">) => void;
  updateRecipe: (id: string, recipe: Omit<Recipe, "id" | "createdAt" | "isUserRecipe">) => void;
  deleteRecipe: (id: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
}

interface RecipeProviderProps {
  children: ReactNode;
}

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load recipes from localStorage on mount
  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes);
      // Migrate old recipes without isUserRecipe property
      const migratedRecipes = parsedRecipes.map((recipe: Recipe) => {
        // If recipe doesn't have isUserRecipe property, determine it
        if (recipe.isUserRecipe === undefined) {
          // Pre-made recipes have IDs "1", "2", or "3"
          const isPremadeRecipe = ["1", "2", "3"].includes(recipe.id);
          return { ...recipe, isUserRecipe: !isPremadeRecipe };
        }
        return recipe;
      });
      setRecipes(migratedRecipes);
    } else {
      // Initialize with sample recipes if no saved recipes
      const sampleRecipes: Recipe[] = [
        {
          id: "1",
          title: "Pizza Margherita",
          image: "/pizza-recipe.jpg",
          ingredients: ["500g de massa de pizza", "200ml de molho de tomate", "200g de mozzarella", "Folhas de manjericão fresco", "2 colheres de azeite extravirgem", "Sal a gosto"],
          preparation: "1. Pré-aqueça o forno a 250°C.\n2. Abra a massa de pizza em uma superfície enfarinhada.\n3. Espalhe o molho de tomate uniformemente sobre a massa.\n4. Distribua a mozzarella em pedaços sobre o molho.\n5. Tempere com sal e regue com azeite.\n6. Leve ao forno por 10-12 minutos até a borda ficar dourada.\n7. Retire do forno e adicione as folhas de manjericão fresco.\n8. Sirva imediatamente.",
          category: "Italiana",
          createdAt: new Date().toISOString(),
          isUserRecipe: false,
          servings: "4 porções",
          prepTime: "30-45 min"
        },
        {
          id: "2",
          title: "Torta de Maçã",
          image: "/torta-recipe.jpg",
          ingredients: ["6 maçãs médias", "300g de massa podre", "100g de açúcar", "1 colher de chá de canela", "50g de manteiga", "1 ovo para pincelar"],
          preparation: "1. Pré-aqueça o forno a 180°C.\n2. Descasque e corte as maçãs em fatias finas.\n3. Misture as maçãs com açúcar e canela.\n4. Forre uma forma com metade da massa.\n5. Adicione o recheio de maçã e pequenos pedaços de manteiga.\n6. Cubra com o restante da massa, fazendo um desenho em treliça.\n7. Pincele com ovo batido.\n8. Asse por 40-45 minutos até dourar.\n9. Deixe esfriar antes de servir.",
          category: "Sobremesa",
          createdAt: new Date().toISOString(),
          isUserRecipe: false,
          servings: "6 porções",
          prepTime: "60 min"
        },
        {
          id: "3",
          title: "Pasta Carbonara",
          image: "/pasta-recipe.jpg",
          ingredients: ["400g de espaguete", "200g de bacon em cubos", "3 ovos inteiros", "100g de parmesão ralado", "Pimenta preta moída na hora", "Sal a gosto"],
          preparation: "1. Cozinhe o espaguete em água salgada conforme instruções da embalagem.\n2. Em uma frigideira, doure o bacon até ficar crocante.\n3. Em uma tigela, bata os ovos com o parmesão e pimenta.\n4. Escorra a massa reservando um pouco da água do cozimento.\n5. Adicione a massa quente à frigideira com o bacon.\n6. Retire do fogo e adicione a mistura de ovos mexendo rapidamente.\n7. Se necessário, adicione água da massa para obter cremosidade.\n8. Sirva imediatamente com mais parmesão e pimenta.",
          category: "Italiana",
          createdAt: new Date().toISOString(),
          isUserRecipe: false,
          servings: "4 porções",
          prepTime: "20-30 min"
        }
      ];
      setRecipes(sampleRecipes);
      localStorage.setItem("recipes", JSON.stringify(sampleRecipes));
    }
  }, []);

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  const addRecipe = (newRecipe: Omit<Recipe, "id" | "createdAt" | "isUserRecipe">) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isUserRecipe: true
    };
    setRecipes(prev => [recipe, ...prev]);
  };

  const updateRecipe = (id: string, updatedRecipe: Omit<Recipe, "id" | "createdAt" | "isUserRecipe">) => {
    setRecipes(prev => prev.map(recipe => {
      if (recipe.id === id && recipe.isUserRecipe) {
        return {
          ...recipe,
          ...updatedRecipe
        };
      }
      return recipe;
    }));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById }}>
      {children}
    </RecipeContext.Provider>
  );
}