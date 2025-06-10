
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  title?: string;
  showLogout?: boolean;
}

const Header = ({ title = "Chatbot Kompas", showLogout = false }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">{title}</span>
          </div>
          
          {showLogout && user && (
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
