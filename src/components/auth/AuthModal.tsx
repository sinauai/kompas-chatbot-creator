
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Bot, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AuthModal = ({ open, onOpenChange, mode, onModeChange }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    try {
      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error("Password tidak cocok");
      }
      
      // Simulate successful auth
      setTimeout(() => {
        setLoading(false);
        onOpenChange(false);
        console.log(`${mode} successful for:`, email);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate sending reset email
      setTimeout(() => {
        setLoading(false);
        setShowForgotPassword(false);
        console.log("Reset password email sent to:", email);
      }, 1500);
    } catch (err) {
      setError("Gagal mengirim email reset password");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowForgotPassword(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">
            {showForgotPassword ? "Reset Password" : mode === 'signin' ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </DialogTitle>
          <DialogDescription>
            {showForgotPassword 
              ? "Masukkan email Anda untuk menerima link reset password"
              : mode === 'signin' 
                ? "Masuk ke dashboard Chatbot Kompas Anda" 
                : "Buat akun baru untuk mulai membuat chatbot"
            }
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-4">
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

              {!showForgotPassword && (
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

              {mode === 'signup' && !showForgotPassword && (
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
                {loading ? "Memproses..." : showForgotPassword ? "Kirim Link Reset" : mode === 'signin' ? "Masuk" : "Daftar"}
              </Button>
            </form>

            {!showForgotPassword && (
              <>
                <Separator className="my-4" />
                
                <div className="text-center space-y-2">
                  {mode === 'signin' ? (
                    <>
                      <Button
                        variant="link"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm"
                      >
                        Lupa password?
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Belum punya akun?{" "}
                        <Button
                          variant="link"
                          onClick={() => onModeChange('signup')}
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
                        onClick={() => onModeChange('signin')}
                        className="p-0 h-auto font-semibold"
                      >
                        Masuk di sini
                      </Button>
                    </p>
                  )}
                </div>
              </>
            )}

            {showForgotPassword && (
              <div className="text-center mt-4">
                <Button
                  variant="link"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-sm"
                >
                  Kembali ke halaman masuk
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
