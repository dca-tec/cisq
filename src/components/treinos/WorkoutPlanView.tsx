import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Dumbbell, Timer, Coffee, ChevronDown, ChevronUp } from "lucide-react";
import type { WorkoutPlan } from "@/pages/Treinos";
import { MuscleHighlight } from "@/components/treinos/MuscleHighlight";

const muscleGroupColors: Record<string, string> = {
  peito: "hsl(0, 75%, 55%)",
  costas: "hsl(210, 75%, 55%)",
  ombros: "hsl(38, 75%, 55%)",
  biceps: "hsl(280, 75%, 55%)",
  triceps: "hsl(160, 75%, 55%)",
  pernas: "hsl(120, 60%, 45%)",
  gluteos: "hsl(330, 70%, 55%)",
  abdomen: "hsl(45, 80%, 55%)",
  corpo_inteiro: "hsl(200, 70%, 55%)",
  cardio: "hsl(15, 80%, 55%)",
};

interface WorkoutPlanViewProps {
  plan: WorkoutPlan;
}

export function WorkoutPlanView({ plan }: WorkoutPlanViewProps) {
  const [activeWeek, setActiveWeek] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const week = plan.weeks?.[activeWeek];
  if (!week) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-headline mb-2">{plan.name}</h2>
        <p className="text-muted-foreground">Plano de {plan.weeks?.length || 4} semanas • Clique nos dias para ver os exercícios</p>
      </div>

      {/* Week Selector */}
      <div className="flex justify-center gap-2">
        {plan.weeks?.map((w, i) => (
          <button
            key={i}
            onClick={() => { setActiveWeek(i); setExpandedDay(null); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider transition-all ${
              activeWeek === i
                ? "bg-accent text-accent-foreground shadow-gold"
                : "bg-muted text-muted-foreground hover:bg-accent/20"
            }`}
          >
            Semana {w.week}
          </button>
        ))}
      </div>

      {/* Days Grid */}
      <div className="space-y-3">
        {week.days?.map((day, dayIndex) => (
          <Card
            key={dayIndex}
            className={`card-institutional overflow-hidden transition-all ${
              day.isRest ? "opacity-70" : "cursor-pointer hover:shadow-elevated"
            }`}
            onClick={() => !day.isRest && setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
          >
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    day.isRest ? "bg-muted" : "bg-accent/10"
                  }`}>
                    {day.isRest ? (
                      <Coffee className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Calendar className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base font-sans uppercase tracking-wider">
                      {day.day}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {day.isRest ? "Dia de Descanso" : day.focus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!day.isRest && day.muscleGroups?.map((mg) => (
                    <Badge
                      key={mg}
                      variant="outline"
                      className="text-xs uppercase"
                      style={{ borderColor: muscleGroupColors[mg] || "hsl(var(--accent))", color: muscleGroupColors[mg] || "hsl(var(--accent))" }}
                    >
                      {mg}
                    </Badge>
                  ))}
                  {!day.isRest && (
                    expandedDay === dayIndex ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedDay === dayIndex && !day.isRest && (
              <CardContent className="pt-0 pb-6">
                <div className="grid lg:grid-cols-[1fr_200px] gap-6">
                  {/* Exercises List */}
                  <div className="space-y-3">
                    {day.exercises?.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        {/* Exercise GIF placeholder */}
                        <div
                          className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${muscleGroupColors[ex.muscleGroup] || "hsl(var(--accent))"}20, ${muscleGroupColors[ex.muscleGroup] || "hsl(var(--accent))"}40)`,
                            boxShadow: `0 0 20px ${muscleGroupColors[ex.muscleGroup] || "hsl(var(--accent))"}30`,
                          }}
                        >
                          <Dumbbell className="h-6 w-6" style={{ color: muscleGroupColors[ex.muscleGroup] || "hsl(var(--accent))" }} />
                          <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                              border: `2px solid ${muscleGroupColors[ex.muscleGroup] || "hsl(var(--accent))"}60`,
                              animation: "pulse 2s ease-in-out infinite",
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{ex.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Dumbbell className="h-3 w-3" />
                              {ex.sets} × {ex.reps}
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {ex.rest}
                            </span>
                          </div>
                          {ex.notes && <p className="text-xs text-muted-foreground/70 mt-1 italic">{ex.notes}</p>}
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase shrink-0"
                          style={{ borderColor: muscleGroupColors[ex.muscleGroup], color: muscleGroupColors[ex.muscleGroup] }}
                        >
                          {ex.muscleGroup}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Muscle Highlight */}
                  <div className="hidden lg:block">
                    <MuscleHighlight muscleGroups={day.muscleGroups || []} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
