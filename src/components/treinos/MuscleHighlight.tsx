interface MuscleHighlightProps {
  muscleGroups: string[];
}

const musclePositions: Record<string, { top: string; left: string; width: string; height: string }> = {
  peito: { top: "22%", left: "30%", width: "40%", height: "12%" },
  costas: { top: "25%", left: "28%", width: "44%", height: "15%" },
  ombros: { top: "18%", left: "20%", width: "60%", height: "8%" },
  biceps: { top: "28%", left: "12%", width: "18%", height: "12%" },
  triceps: { top: "28%", left: "70%", width: "18%", height: "12%" },
  pernas: { top: "55%", left: "25%", width: "50%", height: "25%" },
  gluteos: { top: "45%", left: "30%", width: "40%", height: "12%" },
  abdomen: { top: "35%", left: "32%", width: "36%", height: "14%" },
  corpo_inteiro: { top: "15%", left: "15%", width: "70%", height: "70%" },
  cardio: { top: "22%", left: "40%", width: "20%", height: "10%" },
};

const muscleColors: Record<string, string> = {
  peito: "#ef4444",
  costas: "#3b82f6",
  ombros: "#f59e0b",
  biceps: "#a855f7",
  triceps: "#10b981",
  pernas: "#22c55e",
  gluteos: "#ec4899",
  abdomen: "#eab308",
  corpo_inteiro: "#06b6d4",
  cardio: "#f97316",
};

export function MuscleHighlight({ muscleGroups }: MuscleHighlightProps) {
  return (
    <div className="relative w-full aspect-[2/3] bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
      {/* Body silhouette */}
      <svg viewBox="0 0 100 160" className="w-full h-full opacity-20">
        {/* Head */}
        <circle cx="50" cy="15" r="8" fill="currentColor" />
        {/* Neck */}
        <rect x="47" y="23" width="6" height="5" fill="currentColor" rx="2" />
        {/* Torso */}
        <path d="M35 28 L65 28 L62 75 L38 75 Z" fill="currentColor" rx="4" />
        {/* Arms */}
        <path d="M35 28 L22 32 L18 60 L24 60 L30 40 L35 35" fill="currentColor" />
        <path d="M65 28 L78 32 L82 60 L76 60 L70 40 L65 35" fill="currentColor" />
        {/* Legs */}
        <path d="M38 75 L35 120 L30 150 L40 150 L42 120 L45 80" fill="currentColor" />
        <path d="M62 75 L65 120 L70 150 L60 150 L58 120 L55 80" fill="currentColor" />
      </svg>

      {/* Muscle highlights with glow */}
      {muscleGroups.map((mg) => {
        const pos = musclePositions[mg];
        const color = muscleColors[mg] || "#f59e0b";
        if (!pos) return null;
        return (
          <div
            key={mg}
            className="absolute rounded-full animate-pulse"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              height: pos.height,
              background: `radial-gradient(ellipse, ${color}60 0%, ${color}20 50%, transparent 70%)`,
              boxShadow: `0 0 30px ${color}40, 0 0 60px ${color}20`,
              filter: "blur(2px)",
            }}
          />
        );
      })}

      {/* Labels */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="flex flex-wrap gap-1 justify-center">
          {muscleGroups.map((mg) => (
            <span
              key={mg}
              className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium"
              style={{
                color: muscleColors[mg] || "#f59e0b",
                background: `${muscleColors[mg] || "#f59e0b"}15`,
                border: `1px solid ${muscleColors[mg] || "#f59e0b"}30`,
              }}
            >
              {mg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
