import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout/Layout";
import { User, ShoppingBag, Calendar, FileText, Settings, LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  loginSchema, 
  registrationSchema, 
  type LoginFormData, 
  type RegistrationFormData 
} from "@/lib/validations";

// Note: This page requires backend authentication to be fully functional.
// The current implementation provides UI with validation but no server-side auth.

export default function AreaUsuario() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Login form with validation
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Registration form with validation
  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    // Clear previous errors
    setAuthError(null);
    
    // Backend authentication is required for this functionality
    // This form validates input but cannot authenticate without a backend
    setAuthError(
      "Sistema de autenticação não configurado. Para habilitar login, é necessário configurar o Lovable Cloud com autenticação Supabase."
    );
  };

  const handleRegistration = async (data: RegistrationFormData) => {
    // Clear previous errors
    setAuthError(null);
    
    // Backend authentication is required for this functionality
    // This form validates input but cannot create accounts without a backend
    setAuthError(
      "Sistema de autenticação não configurado. Para habilitar cadastro, é necessário configurar o Lovable Cloud com autenticação Supabase."
    );
  };

  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-narrow max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-headline mb-2">
              {isRegistering ? "Criar Conta" : "Área do Usuário"}
            </h1>
            <p className="text-muted-foreground">
              {isRegistering 
                ? "Preencha seus dados para criar sua conta" 
                : "Acesse para ver seus pedidos, protocolos e agendamentos"}
            </p>
          </div>

          {/* Backend requirement notice */}
          <Alert variant="default" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuração necessária</AlertTitle>
            <AlertDescription>
              Esta funcionalidade requer configuração do backend com Lovable Cloud para autenticação segura.
            </AlertDescription>
          </Alert>

          {authError && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          <div className="bg-card rounded-sm p-8">
            {isRegistering ? (
              <form 
                onSubmit={registrationForm.handleSubmit(handleRegistration)} 
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Seu nome"
                      maxLength={50}
                      {...registrationForm.register("firstName")}
                    />
                    {registrationForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive">
                        {registrationForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Seu sobrenome"
                      maxLength={50}
                      {...registrationForm.register("lastName")}
                    />
                    {registrationForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive">
                        {registrationForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    placeholder="seu@email.com"
                    maxLength={255}
                    autoComplete="email"
                    {...registrationForm.register("email")}
                  />
                  {registrationForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {registrationForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    placeholder="••••••••"
                    maxLength={128}
                    autoComplete="new-password"
                    {...registrationForm.register("password")}
                  />
                  {registrationForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {registrationForm.formState.errors.password.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Mínimo 8 caracteres, com maiúscula, minúscula e número
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    maxLength={128}
                    autoComplete="new-password"
                    {...registrationForm.register("confirmPassword")}
                  />
                  {registrationForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {registrationForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={registrationForm.formState.isSubmitting}
                >
                  {registrationForm.formState.isSubmitting ? "Processando..." : "Criar Conta"}
                </Button>
              </form>
            ) : (
              <form 
                onSubmit={loginForm.handleSubmit(handleLogin)} 
                className="space-y-4"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="seu@email.com"
                    maxLength={255}
                    autoComplete="email"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••"
                    maxLength={128}
                    autoComplete="current-password"
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? "Processando..." : "Entrar"}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setAuthError(null);
                  loginForm.reset();
                  registrationForm.reset();
                }}
                className="text-sm text-primary hover:underline"
              >
                {isRegistering 
                  ? "Já tem conta? Faça login" 
                  : "Não tem conta? Cadastre-se"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
