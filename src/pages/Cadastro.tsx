import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        setAvatarPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    // Update user profile with registration data
    updateUser({
      name,
      email,
      bio,
      avatar,
      joinDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    });

    toast.success("Conta criada com sucesso!");
    navigate("/receitas");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-recipe-text">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Avatar Upload */}
            <div className="space-y-2">
              <Label>Foto de perfil</Label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <label 
                htmlFor="avatar-upload"
                className="border-2 border-dashed border-input rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer block"
              >
                {avatarPreview ? (
                  <div className="space-y-2">
                    <img 
                      src={avatarPreview} 
                      alt="Preview" 
                      className="w-24 h-24 mx-auto rounded-full object-cover"
                    />
                    <p className="text-sm text-muted-foreground">
                      Clique para alterar a foto
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Clique para adicionar uma foto
                    </p>
                  </>
                )}
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você e suas paixões culinárias..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-warm hover:opacity-90 transition-opacity">
              Registrar
            </Button>
          </form>
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline text-sm"
            >
              Já tem conta? Faça login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}