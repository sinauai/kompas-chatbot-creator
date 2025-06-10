
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Github, Settings, Users, Package, BarChart3, Plus } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const AdminDashboard = () => {
  const [githubConnected, setGithubConnected] = useState(false);
  const [vercelConnected, setVercelConnected] = useState(false);

  const stats = [
    { title: "Total Users", value: "156", icon: Users, color: "text-blue-600" },
    { title: "Active Chatbots", value: "89", icon: Bot, color: "text-green-600" },
    { title: "Templates", value: "23", icon: Package, color: "text-purple-600" },
    { title: "Deployments", value: "342", icon: BarChart3, color: "text-orange-600" }
  ];

  const templates = [
    { name: "Customer Support Bot", description: "Template untuk bot customer service", users: 45 },
    { name: "E-commerce Assistant", description: "Bot untuk toko online", users: 23 },
    { name: "FAQ Bot", description: "Bot untuk menjawab pertanyaan umum", users: 67 },
    { name: "News Bot", description: "Bot untuk distribusi berita", users: 12 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userType="admin" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Kelola template chatbot dan monitor aktivitas platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integrations">Integrasi</TabsTrigger>
            <TabsTrigger value="templates">Template Repository</TabsTrigger>
            <TabsTrigger value="users">Manajemen User</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    GitHub Integration
                  </CardTitle>
                  <CardDescription>
                    Hubungkan akun GitHub untuk mengelola template repository
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {githubConnected ? (
                    <div className="space-y-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✓ Terhubung ke @admin-github
                      </Badge>
                      <Button variant="outline" onClick={() => setGithubConnected(false)}>
                        Putuskan Koneksi
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setGithubConnected(true)}>
                      <Github className="w-4 h-4 mr-2" />
                      Hubungkan GitHub
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Vercel Integration
                  </CardTitle>
                  <CardDescription>
                    Hubungkan akun Vercel untuk auto-deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {vercelConnected ? (
                    <div className="space-y-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✓ Terhubung ke @admin-vercel
                      </Badge>
                      <Button variant="outline" onClick={() => setVercelConnected(false)}>
                        Putuskan Koneksi
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setVercelConnected(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Hubungkan Vercel
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Template Repository</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Template
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {template.users} user menggunakan
                      </span>
                      <Button variant="outline" size="sm">
                        Kelola
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen User</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Invite User
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">User Management</h4>
                  <p className="text-muted-foreground">
                    Fitur manajemen user akan tersedia setelah integrasi Supabase aktif
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
