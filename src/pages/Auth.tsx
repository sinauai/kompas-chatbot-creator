
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Bot, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error("Password tidak cocok");
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        
        toast({
          title: "Registrasi berhasil!",
          description: "Silakan cek email Anda untuk verifikasi akun.",
        });
        setMode('signin');
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Login berhasil!",
          description: "Selamat datang di Chatbot Kompas.",
        });
        navigate('/');
      } else if (mode === 'forgot') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        
        toast({
          title: "Email reset password terkirim!",
          description: "Silakan cek email Anda untuk reset password.",
        });
        setMode('signin');
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setError("");
  };

  const handleModeChange = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {mode === 'forgot' ? "Reset Password" : mode === 'signin' ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </CardTitle>
          <CardDescription>
            {mode === 'forgot' 
              ? "Masukkan email Anda untuk menerima link reset password"
              : mode === 'signin' 
                ? "Masuk ke dashboard Chatbot Kompas Anda" 
                : "Buat akun baru untuk mulai membuat chatbot"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Masukkan ulang password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : mode === 'forgot' ? "Kirim Link Reset" : mode === 'signin' ? "Masuk" : "Daftar"}
            </Button>
          </form>

          {mode !== 'forgot' && (
            <>
              <Separator className="my-4" />
              
              <div className="text-center space-y-2">
                {mode === 'signin' ? (
                  <>
                    <Button
                      variant="link"
                      onClick={() => handleModeChange('forgot')}
                      className="text-sm"
                    >
                      Lupa password?
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Belum punya akun?{" "}
                      <Button
                        variant="link"
                        onClick={() => handleModeChange('signup')}
                        className="p-0 h-auto font-semibold"
                      >
                        Daftar di sini
                      </Button>
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Sudah punya akun?{" "}
                    <Button
                      variant="link"
                      onClick={() => handleModeChange('signin')}
                      className="p-0 h-auto font-semibold"
                    >
                      Masuk di sini
                    </Button>
                  </p>
                )}
              </div>
            </>
          )}

          {mode === 'forgot' && (
            <div className="text-center mt-4">
              <Button
                variant="link"
                onClick={() => handleModeChange('signin')}
                className="text-sm"
              >
                Kembali ke halaman masuk
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
