import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  category: string;
}

export function RecipeCard({ id, title, image, ingredients, category }: RecipeCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/receita/${id}`);
  };
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-card" onClick={handleClick}>
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-recipe-text">{title}</h3>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">Ingredientes:</p>
          <p className="text-sm text-recipe-text line-clamp-3">
            {ingredients.join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}