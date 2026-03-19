import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type TableName = "products" | "protocols" | "ebooks" | "events" | "articles" | "glossary_terms" | "professionals" | "consultation_types" | "appointments" | "orders" | "order_items" | "cart_items" | "user_purchases" | "event_registrations" | "profiles" | "user_roles";

export function useSupabaseQuery<T = any>(table: TableName, options?: { select?: string; filter?: Record<string, any>; order?: { column: string; ascending?: boolean }; enabled?: boolean }) {
  return useQuery({
    queryKey: [table, options?.filter],
    enabled: options?.enabled !== false,
    queryFn: async () => {
      let query = supabase.from(table).select(options?.select || "*");
      if (options?.filter) {
        for (const [key, value] of Object.entries(options.filter)) {
          query = query.eq(key, value);
        }
      }
      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending ?? false });
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    },
  });
}

export function useSupabaseInsert(table: TableName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: Record<string, any>) => {
      const { data, error } = await supabase.from(table).insert(values).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}

export function useSupabaseUpdate(table: TableName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: Record<string, any>) => {
      const { data, error } = await supabase.from(table).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}

export function useSupabaseDelete(table: TableName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}
