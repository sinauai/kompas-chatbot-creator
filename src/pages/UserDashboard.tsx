
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Copy, Settings, Rocket, Calendar } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const UserDashboard = () => {
  const templates = [
    { 
      name: "Customer Support Bot", 
      description: "Template untuk bot customer service",
      category: "Support",
      lastUpdated: "2 hari lalu"
    },
    { 
      name: "E-commerce Assistant", 
      description: "Bot untuk toko online",
      category: "E-commerce", 
      lastUpdated: "5 hari lalu"
    },
    { 
      name: "FAQ Bot", 
      description: "Bot untuk menjawab pertanyaan umum",
      category: "General",
      lastUpdated: "1 minggu lalu"
    },
    { 
      name: "News Bot", 
      description: "Bot untuk distribusi berita",
      category: "Media",
      lastUpdated: "3 hari lalu"
    }
  ];

  const myChatbots = [
    {
      name: "chatbot-raja-ampat",
      template: "News Bot",
      status: "deployed",
      url: "chatbot-raja-ampat.vercel.app",
      lastDeployed: "Kemarin"
    },
    {
      name: "support-bot-toko",
      template: "Customer Support Bot", 
      status: "draft",
      url: null,
      lastDeployed: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userType="user" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard User</h1>
          <p className="text-muted-foreground">
            Kelola chatbot Anda dan buat yang baru dari template yang tersedia
          </p>
        </div>

        {/* My Chatbots Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Chatbot Saya</h2>
          {myChatbots.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myChatbots.map((chatbot, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{chatbot.name}</CardTitle>
                      <Badge variant={chatbot.status === 'deployed' ? 'default' : 'secondary'}>
                        {chatbot.status === 'deployed' ? 'Deployed' : 'Draft'}
                      </Badge>
                    </div>
                    <CardDescription>Based on {chatbot.template}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {chatbot.url && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">URL: </span>
                          <span className="font-mono text-blue-600">{chatbot.url}</span>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {chatbot.lastDeployed ? `Deploy: ${chatbot.lastDeployed}` : 'Belum di-deploy'}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Kelola
                        </Button>
                        {chatbot.status === 'deployed' && (
                          <Button size="sm">
                            <Rocket className="w-3 h-3 mr-1" />
                            Buka
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Belum Ada Chatbot</h3>
                <p className="text-muted-foreground mb-4">
                  Mulai buat chatbot pertama Anda dari template yang tersedia
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Templates Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Template Repository</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Update: {template.lastUpdated}
                    </div>
                    <Button className="w-full">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Repository
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
