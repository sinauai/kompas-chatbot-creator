
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface HeaderProps {
  onAuthClick: (mode: 'signin' | 'signup') => void;
}

const Header = ({ onAuthClick }: HeaderProps) => {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Chatbot Kompas</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Fitur
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Harga
            </a>
            <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Dokumentasi
            </a>
            <a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => onAuthClick('signin')}
            >
              Masuk
            </Button>
            <Button onClick={() => onAuthClick('signup')}>
              Daftar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
