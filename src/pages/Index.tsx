
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Rocket, Shield, Code, Zap, Users } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import Header from "@/components/layout/Header";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const features = [
    {
      icon: Bot,
      title: "Template Repository",
      description: "Pilih dari berbagai template chatbot yang sudah siap pakai"
    },
    {
      icon: Rocket,
      title: "Deploy Otomatis",
      description: "Deploy chatbot Anda ke Vercel dengan satu klik"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Keamanan tingkat enterprise dengan infrastruktur yang handal"
    },
    {
      icon: Code,
      title: "GitHub Integration",
      description: "Sinkronisasi otomatis dengan repository GitHub Anda"
    },
    {
      icon: Zap,
      title: "Fast Setup",
      description: "Buat chatbot dalam hitungan menit, bukan jam"
    },
    {
      icon: Users,
      title: "Multi-User",
      description: "Kelola tim dan user dengan sistem role yang fleksibel"
    }
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header onAuthClick={handleAuthClick} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            🚀 Platform Chatbot Builder Terpercaya
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Chatbot Kompas
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Buat dan deploy chatbot profesional dengan mudah.<br />
            Dari template hingga production dalam hitungan menit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold"
              onClick={() => handleAuthClick('signup')}
            >
              Mulai Gratis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold"
              onClick={() => handleAuthClick('signin')}
            >
              Masuk ke Akun
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Template Tersedia</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">User Aktif</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk membuat chatbot yang powerful dan profesional
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Siap Memulai Perjalanan Chatbot Anda?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan developer yang sudah mempercayai Chatbot Kompas 
              untuk membuat chatbot yang amazing.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold"
              onClick={() => handleAuthClick('signup')}
            >
              Daftar Sekarang - Gratis!
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Chatbot Kompas. Semua hak dilindungi.</p>
            <p className="mt-2">
              Powered by <span className="font-semibold">Kompas Technology</span>
            </p>
          </div>
        </div>
      </footer>

      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;
