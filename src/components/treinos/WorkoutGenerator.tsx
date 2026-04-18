import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Sparkles, Dumbbell, Heart, Flame, Wind, Flower2, PersonStanding } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { WorkoutPlan } from "@/pages/Treinos";

const goals = [
  { id: "musculacao", label: "Musculação", icon: Dumbbell, desc: "Hipertrofia e força muscular" },
  { id: "emagrecer", label: "Emagrecimento", icon: Flame, desc: "Perda de gordura e definição" },
  { id: "funcional", label: "Funcional", icon: Wind, desc: "Mobilidade e condicionamento" },
  { id: "calistenia", label: "Calistenia", icon: PersonStanding, desc: "Peso corporal e controle" },
  { id: "pilates", label: "Pilates", icon: Flower2, desc: "Core, flexibilidade e postura" },
  { id: "yoga", label: "Yoga", icon: Heart, desc: "Equilíbrio mente-corpo" },
];

const levels = [
  { id: "iniciante", label: "Iniciante", desc: "Até 6 meses de prática" },
  { id: "intermediario", label: "Intermediário", desc: "6 meses a 2 anos" },
  { id: "avancado", label: "Avançado", desc: "Mais de 2 anos" },
];

interface WorkoutGeneratorProps {
  onPlanGenerated: (plan: WorkoutPlan) => void;
  initialGoal?: string;
}

export function WorkoutGenerator({ onPlanGenerated, initialGoal = "" }: WorkoutGeneratorProps) {
  const [goal, setGoal] = useState(initialGoal);
  const [level, setLevel] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [sessionDuration, setSessionDuration] = useState("60");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!goal || !level) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Gere um plano de treino completo em JSON para:
- Objetivo: ${goals.find(g => g.id === goal)?.label}
- Nível: ${levels.find(l => l.id === level)?.label}
- Dias por semana: ${daysPerWeek}
- Duração por sessão: ${sessionDuration} minutos
- Duração: 4 semanas

Retorne APENAS o JSON do plano, sem texto adicional, sem markdown.`;

      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-workout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
            mode: "generate",
          }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "Erro ao gerar treino");
      }

      // Stream the response
      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: d } = await reader.read();
          done = d;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ") || line.trim() === "") continue;
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") continue;
              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) fullText += content;
              } catch { /* partial */ }
            }
          }
        }
      }

      // Extract JSON from response
      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Não foi possível extrair o plano");

      const plan = JSON.parse(jsonMatch[0]) as WorkoutPlan;
      onPlanGenerated(plan);
      toast({ title: "Treino gerado com sucesso!", description: plan.name });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao gerar treino",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-headline mb-2">Monte seu <span className="text-accent">treino ideal</span></h2>
        <p className="text-muted-foreground">Selecione seu objetivo e nível para gerar um plano personalizado de 4 semanas.</p>
      </div>

      {/* Goal Selection */}
      <Card className="card-institutional">
        <CardHeader>
          <CardTitle className="text-lg uppercase tracking-wider font-sans text-accent">Objetivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goals.map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setGoal(id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  goal === id
                    ? "border-accent bg-accent/10 shadow-gold"
                    : "border-border hover:border-accent/40 hover:bg-muted/50"
                }`}
              >
                <Icon className={`h-6 w-6 mb-2 ${goal === id ? "text-accent" : "text-muted-foreground"}`} />
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Level & Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-institutional">
          <CardHeader>
            <CardTitle className="text-lg uppercase tracking-wider font-sans text-accent">Nível</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={level} onValueChange={setLevel} className="space-y-3">
              {levels.map(({ id, label, desc }) => (
                <div key={id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/40 transition-colors">
                  <RadioGroupItem value={id} id={id} />
                  <Label htmlFor={id} className="cursor-pointer flex-1">
                    <span className="font-medium text-sm">{label}</span>
                    <span className="block text-xs text-muted-foreground">{desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="card-institutional">
          <CardHeader>
            <CardTitle className="text-lg uppercase tracking-wider font-sans text-accent">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="text-sm mb-2 block">Dias por semana</Label>
              <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["3", "4", "5", "6"].map(d => (
                    <SelectItem key={d} value={d}>{d} dias</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-2 block">Duração da sessão</Label>
              <Select value={sessionDuration} onValueChange={setSessionDuration}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["30", "45", "60", "75", "90"].map(d => (
                    <SelectItem key={d} value={d}>{d} minutos</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !goal || !level}
          size="lg"
          className="btn-primary px-12 py-6 text-lg gap-3"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Gerando seu treino...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Gerar Treino Personalizado
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
