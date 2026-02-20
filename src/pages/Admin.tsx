import { useState } from "react";
import { useAdminAuth } from "@/hooks/useLocalStorage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Lock, Database, Map, Route, Download, Upload, Settings } from "lucide-react";
import TempleManager from "@/components/admin/TempleManager";
import TourManager from "@/components/admin/TourManager";
import DataManager from "@/components/admin/DataManager";
import SEOManager from "@/components/admin/SEOManager";

const Admin = () => {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError("");
      setPassword("");
    } else {
      setError("Invalid password. Default password is 'admin123'");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the CMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
              />
              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Temple Tours CMS</h1>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="temples" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mx-auto">
            <TabsTrigger value="temples" className="gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Temples</span>
            </TabsTrigger>
            <TabsTrigger value="tours" className="gap-2">
              <Route className="w-4 h-4" />
              <span className="hidden sm:inline">Tours</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temples">
            <TempleManager />
          </TabsContent>

          <TabsContent value="tours">
            <TourManager />
          </TabsContent>

          <TabsContent value="data">
            <DataManager />
          </TabsContent>

          <TabsContent value="seo">
            <SEOManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
