import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, User, Video, MapPin, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const professionals = [
  {
    id: 1,
    name: "Dr. Helena Vasquez",
    specialty: "Etnobotânica Clínica",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Dr. Marcus Chen",
    specialty: "Fisiologia Integrativa",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Dra. Sofia Almeida",
    specialty: "Bioquímica Funcional",
    image: "/placeholder.svg"
  }
];

const consultationTypes = [
  {
    id: "initial",
    name: "Consulta Inicial",
    duration: "60 min",
    price: 350,
    description: "Avaliação completa e orientação inicial personalizada."
  },
  {
    id: "followup",
    name: "Retorno",
    duration: "30 min",
    price: 200,
    description: "Acompanhamento e ajustes de protocolo."
  },
  {
    id: "protocol",
    name: "Orientação de Protocolo",
    duration: "45 min",
    price: 280,
    description: "Análise e personalização de protocolo adquirido."
  }
];

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [modality, setModality] = useState<"online" | "presencial">("online");

  const selectedTypeData = consultationTypes.find(t => t.id === selectedType);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 pb-12">
        <div className="container-narrow text-center">
          <p className="text-caption mb-4">Consultas</p>
          <h1 className="text-display mb-6">
            Agende sua<br />
            <em className="text-primary">Consulta</em>
          </h1>
          <p className="text-body-large max-w-xl mx-auto">
            Orientação personalizada com profissionais qualificados. 
            Escolha o tipo de consulta, profissional, data e horário.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-6 border-y border-border">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {["Tipo", "Profissional", "Data/Hora", "Confirmação"].map((label, index) => (
              <div key={label} className="flex items-center gap-2 md:gap-4">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${step > index + 1 ? 'bg-primary text-primary-foreground' : 
                    step === index + 1 ? 'bg-primary text-primary-foreground' : 
                    'bg-muted text-muted-foreground'}
                `}>
                  {step > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`hidden md:block text-sm ${step === index + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {label}
                </span>
                {index < 3 && <div className="w-8 md:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="section-padding">
        <div className="container-narrow">
          
          {/* Step 1: Type Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-headline text-center mb-8">
                Selecione o tipo de consulta
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {consultationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-6 rounded-sm border-2 text-left transition-all ${
                      selectedType === type.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{type.duration}</span>
                    </div>
                    <h3 className="font-serif text-lg mb-2">{type.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                    <span className="font-medium">R$ {type.price}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center pt-6">
                <Button 
                  size="lg" 
                  disabled={!selectedType}
                  onClick={() => setStep(2)}
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-headline text-center mb-8">
                Escolha o profissional
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {professionals.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => setSelectedProfessional(prof.id)}
                    className={`p-6 rounded-sm border-2 text-center transition-all ${
                      selectedProfessional === prof.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                      <img src={prof.image} alt={prof.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-serif text-lg mb-1">{prof.name}</h3>
                    <p className="text-sm text-muted-foreground">{prof.specialty}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-4 pt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button 
                  size="lg" 
                  disabled={!selectedProfessional}
                  onClick={() => setStep(3)}
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Date/Time Selection */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-headline text-center mb-8">
                Selecione data e horário
              </h2>

              {/* Modality */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setModality("online")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-sm border-2 transition-all ${
                    modality === "online" ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <Video className="h-4 w-4" />
                  Online
                </button>
                <button
                  onClick={() => setModality("presencial")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-sm border-2 transition-all ${
                    modality === "presencial" ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  Presencial
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-sm border"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="font-medium mb-4">Horários disponíveis</h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-sm border-2 text-sm transition-all ${
                            selectedTime === time 
                              ? 'border-primary bg-primary text-primary-foreground' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Selecione uma data para ver os horários disponíveis.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button 
                  size="lg" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="max-w-md mx-auto">
              <h2 className="text-headline text-center mb-8">
                Confirme sua consulta
              </h2>
              
              <div className="bg-card rounded-sm p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">{selectedTypeData?.name}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground">Profissional</span>
                  <span className="font-medium">
                    {professionals.find(p => p.id === selectedProfessional)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground">Data</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground">Horário</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground">Modalidade</span>
                  <span className="font-medium capitalize">{modality}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-serif">R$ {selectedTypeData?.price}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <Button size="lg" className="w-full">
                  Confirmar e Pagar
                </Button>
                <Button variant="outline" onClick={() => setStep(3)}>
                  Voltar
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Ao confirmar, você concorda com nossos termos de serviço 
                e política de cancelamento.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
