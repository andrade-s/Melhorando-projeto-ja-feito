import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Heart } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
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

interface Comment {
  id: string;
  recipeId: string;
  author: string;
  avatar?: string;
  text: string;
  createdAt: string;
  likes?: string[]; // lista de nomes que curtiram
}

interface RecipeCommentsProps {
  recipeId: string;
}

const STORAGE_KEY = "recipe-comments";

export default function RecipeComments({ recipeId }: RecipeCommentsProps) {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState(user.name || "");
  const [text, setText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setAuthor(user.name || "");
  }, [user.name]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const all: Comment[] = JSON.parse(saved);
      setComments(all.filter((c) => c.recipeId === recipeId));
    }
  }, [recipeId]);

  const persist = (updated: Comment[]) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const all: Comment[] = saved ? JSON.parse(saved) : [];
    const others = all.filter((c) => c.recipeId !== recipeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...others, ...updated]));
    setComments(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedText = text.trim();

    if (!trimmedAuthor || !trimmedText) {
      toast.error("Preencha nome e comentário.");
      return;
    }
    if (trimmedAuthor.length > 50) {
      toast.error("Nome deve ter no máximo 50 caracteres.");
      return;
    }
    if (trimmedText.length > 500) {
      toast.error("Comentário deve ter no máximo 500 caracteres.");
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      recipeId,
      author: trimmedAuthor,
      avatar: user.avatar || undefined,
      text: trimmedText,
      createdAt: new Date().toISOString(),
      likes: [],
    };
    persist([newComment, ...comments]);
    setText("");
    toast.success("Comentário adicionado!");
  };

  const handleToggleLike = (id: string) => {
    const userKey = (user.name || "anônimo").trim().toLowerCase();
    const updated = comments.map((c) => {
      if (c.id !== id) return c;
      const likes = c.likes ?? [];
      const liked = likes.includes(userKey);
      return {
        ...c,
        likes: liked ? likes.filter((k) => k !== userKey) : [...likes, userKey],
      };
    });
    persist(updated);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    persist(comments.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    toast.success("Comentário excluído.");
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getInitials = (name: string) =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() ?? "")
      .join("") || "?";

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl text-recipe-text">
          Comentários ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {user.avatar && <AvatarImage src={user.avatar} alt={author} />}
              <AvatarFallback>{getInitials(author)}</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Seu nome"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={50}
            />
          </div>
          <Textarea
            placeholder="Escreva seu comentário..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            rows={3}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-gradient-warm">
              Publicar comentário
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhum comentário ainda. Seja o primeiro!
            </p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="border border-border rounded-lg p-4 bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <Avatar className="h-9 w-9">
                    {c.avatar && <AvatarImage src={c.avatar} alt={c.author} />}
                    <AvatarFallback>{getInitials(c.author)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-recipe-text">
                        {c.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(c.createdAt)}
                      </span>
                    </div>
                    <p className="text-recipe-text whitespace-pre-line break-words">
                      {c.text}
                    </p>
                    {(() => {
                      const userKey = (user.name || "anônimo").trim().toLowerCase();
                      const likes = c.likes ?? [];
                      const liked = likes.includes(userKey);
                      return (
                        <button
                          type="button"
                          onClick={() => handleToggleLike(c.id)}
                          className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          aria-label={liked ? "Descurtir comentário" : "Curtir comentário"}
                          aria-pressed={liked}
                        >
                          <Heart
                            className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`}
                          />
                          <span>{likes.length}</span>
                        </button>
                      );
                    })()}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(c.id)}
                    aria-label="Excluir comentário"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir comentário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
