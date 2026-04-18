import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const workoutPlanSchema = {
  type: "object",
  properties: {
    name: { type: "string", description: "Nome descritivo do plano de treino" },
    weeks: {
      type: "array",
      description: "4 semanas de treino",
      items: {
        type: "object",
        properties: {
          week: { type: "number" },
          days: {
            type: "array",
            description: "7 dias (segunda a domingo)",
            items: {
              type: "object",
              properties: {
                day: { type: "string", description: "Nome do dia (Segunda, Terça, etc)" },
                dayNumber: { type: "number" },
                isRest: { type: "boolean" },
                focus: { type: "string", description: "Foco do treino do dia" },
                muscleGroups: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ["peito", "costas", "ombros", "biceps", "triceps", "pernas", "gluteos", "abdomen", "corpo_inteiro", "cardio"],
                  },
                },
                exercises: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      sets: { type: "number" },
                      reps: { type: "string", description: "Ex: '8-12' ou '30s'" },
                      rest: { type: "string", description: "Ex: '60s'" },
                      muscleGroup: { type: "string" },
                      equipment: { type: "string" },
                      notes: { type: "string" },
                    },
                    required: ["name", "sets", "reps", "rest", "muscleGroup"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["day", "dayNumber", "isRest", "focus", "muscleGroups", "exercises"],
              additionalProperties: false,
            },
          },
        },
        required: ["week", "days"],
        additionalProperties: false,
      },
    },
  },
  required: ["name", "weeks"],
  additionalProperties: false,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // ===== Modo CHAT (streaming) =====
    if (mode !== "generate") {
      const systemPrompt = `Você é um assistente de treino do CISQ - Centro de Inteligência em Saúde Quântica.
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
          messages: [{ role: "system", content: systemPrompt }, ...messages],
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
        console.error("AI gateway error (chat):", response.status, t);
        return new Response(JSON.stringify({ error: "Erro no serviço de IA" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // ===== Modo GENERATE (tool calling, não streaming) =====
    const systemPrompt = `Você é um personal trainer especializado do CISQ - Centro de Inteligência em Saúde Quântica.
Crie treinos personalizados, científicos e seguros baseados no objetivo, nível e preferências do usuário.

REGRAS:
- O plano DEVE cobrir 4 semanas (segunda a domingo, 7 dias por semana)
- Inclua 2 dias de descanso por semana (preferencialmente quarta e domingo) com isRest=true e exercises=[]
- Use linguagem científica e profissional
- NÃO faça promessas médicas
- Adapte ao nível do praticante
- Para cada exercício preencha: nome, séries, repetições, descanso, grupo muscular, equipamento e notas técnicas

Use SEMPRE a função generate_workout_plan para retornar o plano.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        tools: [{
          type: "function",
          function: {
            name: "generate_workout_plan",
            description: "Retorna um plano de treino completo de 4 semanas",
            parameters: workoutPlanSchema,
          },
        }],
        tool_choice: { type: "function", function: { name: "generate_workout_plan" } },
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
      console.error("AI gateway error (generate):", response.status, t);
      return new Response(JSON.stringify({ error: "Erro no serviço de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "A IA não retornou um plano estruturado" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let plan;
    try {
      plan = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      console.error("Failed to parse tool args:", toolCall.function.arguments);
      return new Response(JSON.stringify({ error: "Plano retornado em formato inválido" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ plan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-workout error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
