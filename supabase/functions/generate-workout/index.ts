import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = mode === "generate"
      ? `Você é um personal trainer especializado do CISQ - Centro de Inteligência em Saúde Quântica. 
Crie treinos personalizados baseados no objetivo, nível e preferências do usuário.

REGRAS IMPORTANTES:
- Responda SEMPRE em JSON válido quando solicitado a gerar um plano
- O plano deve cobrir 4 semanas (segunda a domingo)
- Inclua 2 dias de descanso por semana (preferencialmente quarta e domingo)
- Para cada dia de treino, liste os exercícios com: nome, séries, repetições, descanso, grupo muscular
- Grupos musculares: peito, costas, ombros, biceps, triceps, pernas, gluteos, abdomen, corpo_inteiro, cardio
- Use linguagem científica e profissional
- NÃO faça promessas médicas
- Adapte ao nível do praticante

Formato do JSON do plano:
{
  "name": "Nome do Plano",
  "weeks": [
    {
      "week": 1,
      "days": [
        {
          "day": "Segunda",
          "dayNumber": 1,
          "isRest": false,
          "focus": "Peito e Tríceps",
          "muscleGroups": ["peito", "triceps"],
          "exercises": [
            {
              "name": "Supino Reto com Barra",
              "sets": 4,
              "reps": "8-12",
              "rest": "90s",
              "muscleGroup": "peito",
              "equipment": "Barra e banco",
              "notes": "Manter escápulas retraídas"
            }
          ]
        }
      ]
    }
  ]
}`
      : `Você é um assistente de treino do CISQ - Centro de Inteligência em Saúde Quântica.
Ajude o usuário com dúvidas sobre seu treino, execução de exercícios, nutrição esportiva e recuperação.
Seja profissional, científico e não faça promessas médicas. Responda em português do Brasil.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro no serviço de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-workout error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
