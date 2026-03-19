import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { User, ShoppingBag, Calendar, FileText, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import {
  loginSchema,
  registrationSchema,
  type LoginFormData,
  type RegistrationFormData,
} from "@/lib/validations";
import { UserDashboard } from "@/components/user/UserDashboard";

export default function AreaUsuario() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (user) return <UserDashboard />;

  return <AuthForms />;
}

function AuthForms() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setAuthError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) setAuthError(error);
  };

  const handleRegistration = async (data: RegistrationFormData) => {
    setAuthError(null);
    const { error } = await signUp(data.email, data.password, data.firstName, data.lastName);
    if (error) {
      setAuthError(error);
    } else {
      setAuthSuccess("Conta criada! Verifique seu email para confirmar o cadastro.");
      setIsRegistering(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    if (!email) return;
    setAuthError(null);
    const { error } = await resetPassword(email);
    if (error) setAuthError(error);
    else setAuthSuccess("Email de recuperação enviado! Verifique sua caixa de entrada.");
    setIsForgotPassword(false);
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
              {isForgotPassword ? "Recuperar Senha" : isRegistering ? "Criar Conta" : "Área do Usuário"}
            </h1>
            <p className="text-muted-foreground">
              {isForgotPassword
                ? "Informe seu email para recuperar a senha"
                : isRegistering
                ? "Preencha seus dados para criar sua conta"
                : "Acesse para ver seus pedidos, protocolos e agendamentos"}
            </p>
          </div>

          {authSuccess && (
            <Alert className="mb-6 border-primary/30 bg-primary/5">
              <AlertDescription className="text-primary">{authSuccess}</AlertDescription>
            </Alert>
          )}

          {authError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          <div className="bg-card rounded-sm p-8">
            {isForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input id="forgot-email" name="email" type="email" placeholder="seu@email.com" required />
                </div>
                <Button type="submit" className="w-full">Enviar Email de Recuperação</Button>
                <button type="button" onClick={() => setIsForgotPassword(false)} className="text-sm text-primary hover:underline w-full text-center block mt-2">
                  Voltar ao login
                </button>
              </form>
            ) : isRegistering ? (
              <form onSubmit={registrationForm.handleSubmit(handleRegistration)} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="Seu nome" maxLength={50} {...registrationForm.register("firstName")} />
                    {registrationForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive">{registrationForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Seu sobrenome" maxLength={50} {...registrationForm.register("lastName")} />
                    {registrationForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive">{registrationForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" placeholder="seu@email.com" maxLength={255} autoComplete="email" {...registrationForm.register("email")} />
                  {registrationForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{registrationForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <Input id="reg-password" type="password" placeholder="••••••••" maxLength={128} autoComplete="new-password" {...registrationForm.register("password")} />
                  {registrationForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{registrationForm.formState.errors.password.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, com maiúscula, minúscula e número</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" maxLength={128} autoComplete="new-password" {...registrationForm.register("confirmPassword")} />
                  {registrationForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{registrationForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={registrationForm.formState.isSubmitting}>
                  {registrationForm.formState.isSubmitting ? "Processando..." : "Criar Conta"}
                </Button>
              </form>
            ) : (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="seu@email.com" maxLength={255} autoComplete="email" {...loginForm.register("email")} />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input id="login-password" type="password" placeholder="••••••••" maxLength={128} autoComplete="current-password" {...loginForm.register("password")} />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? "Processando..." : "Entrar"}
                </Button>
                <button type="button" onClick={() => setIsForgotPassword(true)} className="text-sm text-muted-foreground hover:text-primary w-full text-center block mt-1">
                  Esqueceu a senha?
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              {!isForgotPassword && (
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setAuthError(null);
                    setAuthSuccess(null);
                    loginForm.reset();
                    registrationForm.reset();
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {isRegistering ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
