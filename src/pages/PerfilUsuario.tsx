import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, ChefHat, Edit2, Check, X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRecipes } from "@/context/RecipeContext";

export default function PerfilUsuario() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const { recipes } = useRecipes();
  
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio
  });

  // Calcular estatísticas do usuário - apenas receitas criadas pelo usuário
  const recipesCount = recipes.filter(recipe => recipe.isUserRecipe).length;

  const handleEdit = (field: string) => {
    setEditingField(field);
    setEditValues({
      name: user.name,
      email: user.email,
      bio: user.bio
    });
  };

  const handleSave = (field: string) => {
    updateUser({ [field]: editValues[field as keyof typeof editValues] });
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValues({
      name: user.name,
      email: user.email,
      bio: user.bio
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateUser({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
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
            <h1 className="text-2xl font-bold text-recipe-text">Meu Perfil</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-3xl bg-gradient-warm text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                id="avatar-change"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <label
                htmlFor="avatar-change"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Edit2 className="h-4 w-4" />
              </label>
            </div>
          </div>

          {/* Profile Info */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-recipe-text flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nome */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome</label>
                <div className="flex items-center gap-2 mt-1">
                  {editingField === 'name' ? (
                    <>
                      <Input
                        value={editValues.name}
                        onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                        className="flex-1"
                      />
                      <Button size="sm" variant="ghost" onClick={() => handleSave('name')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-recipe-text font-medium flex-1">{user.name}</p>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit('name')}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  {editingField === 'email' ? (
                    <>
                      <Input
                        value={editValues.email}
                        onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                        className="flex-1"
                        type="email"
                      />
                      <Button size="sm" variant="ghost" onClick={() => handleSave('email')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-recipe-text flex-1">{user.email}</p>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit('email')}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Membro desde */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Membro desde</label>
                <p className="text-recipe-text mt-1">{user.joinDate}</p>
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                <div className="flex items-start gap-2 mt-1">
                  {editingField === 'bio' ? (
                    <>
                      <Textarea
                        value={editValues.bio}
                        onChange={(e) => setEditValues(prev => ({ ...prev, bio: e.target.value }))}
                        className="flex-1 min-h-[80px]"
                        placeholder="Conte um pouco sobre você e sua paixão pela culinária..."
                      />
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleSave('bio')}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-recipe-text flex-1 whitespace-pre-wrap">{user.bio}</p>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit('bio')}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atividade Culinária */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-recipe-text flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Atividade Culinária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6 bg-gradient-card rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">{recipesCount}</div>
                <div className="text-muted-foreground">Receitas Criadas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
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
            Criar Nova Receita
          </Button>
        </div>
      </main>
    </div>
  );
}