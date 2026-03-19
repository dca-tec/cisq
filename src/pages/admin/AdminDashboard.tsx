import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, FileText, Users, Calendar, BookOpen, Newspaper, GraduationCap } from "lucide-react";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminProtocols } from "@/components/admin/AdminProtocols";
import { AdminArticles } from "@/components/admin/AdminArticles";
import { AdminProfessionals } from "@/components/admin/AdminProfessionals";
import { AdminEvents } from "@/components/admin/AdminEvents";
import { AdminEbooks } from "@/components/admin/AdminEbooks";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminAppointments } from "@/components/admin/AdminAppointments";

export default function AdminDashboard() {
  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-wide">
          <h1 className="text-headline mb-8">Painel Administrativo</h1>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="flex flex-wrap gap-1 h-auto p-1">
              <TabsTrigger value="products"><Package className="h-4 w-4 mr-1" />Produtos</TabsTrigger>
              <TabsTrigger value="protocols"><FileText className="h-4 w-4 mr-1" />Protocolos</TabsTrigger>
              <TabsTrigger value="ebooks"><BookOpen className="h-4 w-4 mr-1" />E-books</TabsTrigger>
              <TabsTrigger value="events"><GraduationCap className="h-4 w-4 mr-1" />Eventos</TabsTrigger>
              <TabsTrigger value="articles"><Newspaper className="h-4 w-4 mr-1" />Artigos</TabsTrigger>
              <TabsTrigger value="professionals"><Users className="h-4 w-4 mr-1" />Profissionais</TabsTrigger>
              <TabsTrigger value="appointments"><Calendar className="h-4 w-4 mr-1" />Agendamentos</TabsTrigger>
              <TabsTrigger value="users"><Users className="h-4 w-4 mr-1" />Usuários</TabsTrigger>
            </TabsList>

            <TabsContent value="products"><AdminProducts /></TabsContent>
            <TabsContent value="protocols"><AdminProtocols /></TabsContent>
            <TabsContent value="ebooks"><AdminEbooks /></TabsContent>
            <TabsContent value="events"><AdminEvents /></TabsContent>
            <TabsContent value="articles"><AdminArticles /></TabsContent>
            <TabsContent value="professionals"><AdminProfessionals /></TabsContent>
            <TabsContent value="appointments"><AdminAppointments /></TabsContent>
            <TabsContent value="users"><AdminUsers /></TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
