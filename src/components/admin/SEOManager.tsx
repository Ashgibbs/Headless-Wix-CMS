import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, FileText, Share2, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SEOSettings {
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  ogImage: string;
  twitterHandle: string;
  canonicalUrl: string;
  pages: {
    [key: string]: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  structuredData: {
    organization: {
      name: string;
      description: string;
      url: string;
      logo: string;
      contactEmail: string;
      contactPhone: string;
      address: string;
    };
  };
}

const defaultSEO: SEOSettings = {
  siteName: "Temple Tours India",
  siteDescription: "Discover sacred temples across India with our curated pilgrimage tours. Experience divine journeys to ancient temples, jyotirlingas, and shakti peethas.",
  siteKeywords: "temple tours, pilgrimage india, hindu temples, jyotirlinga tour, shakti peetha, spiritual tourism",
  ogImage: "/og-image.jpg",
  twitterHandle: "@templetoursind",
  canonicalUrl: "https://templetoursind.com",
  pages: {
    home: {
      title: "Temple Tours India - Sacred Pilgrimage Journeys",
      description: "Explore divine temples across India with our expertly curated pilgrimage tours.",
      keywords: "temple tours, pilgrimage, india temples",
    },
    temples: {
      title: "Temple Directory - Explore Sacred Temples of India",
      description: "Browse our comprehensive directory of Hindu temples across India.",
      keywords: "hindu temples, temple list, india temples directory",
    },
    pilgrimage: {
      title: "Pilgrimage Tours - Sacred Journey Packages",
      description: "Book curated pilgrimage tour packages to holy sites across India.",
      keywords: "pilgrimage tours, temple tour packages, spiritual journey",
    },
    about: {
      title: "About Us - Temple Tours India",
      description: "Learn about our mission to provide meaningful spiritual journeys.",
      keywords: "about temple tours, our story, pilgrimage company",
    },
    contact: {
      title: "Contact Us - Temple Tours India",
      description: "Get in touch with us for tour bookings and inquiries.",
      keywords: "contact temple tours, book pilgrimage, tour inquiry",
    },
  },
  structuredData: {
    organization: {
      name: "Temple Tours India",
      description: "Leading pilgrimage tour operator in India",
      url: "https://templetoursind.com",
      logo: "/logo.png",
      contactEmail: "info@templetoursind.com",
      contactPhone: "+91-9876543210",
      address: "Chennai, Tamil Nadu, India",
    },
  },
};

const SEOManager = () => {
  const [seoSettings, setSeoSettings] = useLocalStorage<SEOSettings>('cms_seo', defaultSEO);
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO settings have been updated.",
    });
  };

  const handleReset = () => {
    setSeoSettings(defaultSEO);
    toast({
      title: "SEO Settings Reset",
      description: "SEO settings have been restored to defaults.",
    });
  };

  const updatePageSEO = (page: string, field: string, value: string) => {
    setSeoSettings({
      ...seoSettings,
      pages: {
        ...seoSettings.pages,
        [page]: {
          ...seoSettings.pages[page],
          [field]: value,
        },
      },
    });
  };

  const generateSitemapPreview = () => {
    const pages = ['/', '/temples', '/pilgrimage', '/about', '/contact'];
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${seoSettings.canonicalUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  const generateJSONLD = () => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": seoSettings.structuredData.organization.name,
      "description": seoSettings.structuredData.organization.description,
      "url": seoSettings.structuredData.organization.url,
      "logo": seoSettings.structuredData.organization.logo,
      "email": seoSettings.structuredData.organization.contactEmail,
      "telephone": seoSettings.structuredData.organization.contactPhone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": seoSettings.structuredData.organization.address
      }
    }, null, 2);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Manage meta tags, structured data, and sitemap configuration
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>Reset</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="pages" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Pages</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Social</span>
              </TabsTrigger>
              <TabsTrigger value="structured" className="gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Schema</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={seoSettings.siteName}
                    onChange={(e) => setSeoSettings({ ...seoSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input
                    value={seoSettings.canonicalUrl}
                    onChange={(e) => setSeoSettings({ ...seoSettings, canonicalUrl: e.target.value })}
                    placeholder="https://yoursite.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Default Site Description</Label>
                <Textarea
                  value={seoSettings.siteDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">{seoSettings.siteDescription.length}/160 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Default Keywords</Label>
                <Input
                  value={seoSettings.siteKeywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, siteKeywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </TabsContent>

            <TabsContent value="pages" className="space-y-6 mt-6">
              {Object.entries(seoSettings.pages).map(([page, data]) => (
                <Card key={page}>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm capitalize">{page} Page</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={data.title}
                        onChange={(e) => updatePageSEO(page, 'title', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">{data.title.length}/60 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={data.description}
                        onChange={(e) => updatePageSEO(page, 'description', e.target.value)}
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">{data.description.length}/160 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Keywords</Label>
                      <Input
                        value={data.keywords}
                        onChange={(e) => updatePageSEO(page, 'keywords', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="social" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>OG Image URL</Label>
                  <Input
                    value={seoSettings.ogImage}
                    onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                    placeholder="/og-image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Twitter Handle</Label>
                  <Input
                    value={seoSettings.twitterHandle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, twitterHandle: e.target.value })}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>
              
              <Card className="bg-muted/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-background">
                    <p className="text-sm text-blue-600">{seoSettings.canonicalUrl}</p>
                    <h3 className="text-lg font-medium text-blue-800">{seoSettings.siteName}</h3>
                    <p className="text-sm text-muted-foreground">{seoSettings.siteDescription.slice(0, 120)}...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structured" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input
                    value={seoSettings.structuredData.organization.name}
                    onChange={(e) => setSeoSettings({
                      ...seoSettings,
                      structuredData: {
                        ...seoSettings.structuredData,
                        organization: { ...seoSettings.structuredData.organization, name: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input
                    value={seoSettings.structuredData.organization.url}
                    onChange={(e) => setSeoSettings({
                      ...seoSettings,
                      structuredData: {
                        ...seoSettings.structuredData,
                        organization: { ...seoSettings.structuredData.organization, url: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input
                    value={seoSettings.structuredData.organization.contactEmail}
                    onChange={(e) => setSeoSettings({
                      ...seoSettings,
                      structuredData: {
                        ...seoSettings.structuredData,
                        organization: { ...seoSettings.structuredData.organization, contactEmail: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input
                    value={seoSettings.structuredData.organization.contactPhone}
                    onChange={(e) => setSeoSettings({
                      ...seoSettings,
                      structuredData: {
                        ...seoSettings.structuredData,
                        organization: { ...seoSettings.structuredData.organization, contactPhone: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Organization Description</Label>
                <Textarea
                  value={seoSettings.structuredData.organization.description}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    structuredData: {
                      ...seoSettings.structuredData,
                      organization: { ...seoSettings.structuredData.organization, description: e.target.value }
                    }
                  })}
                  rows={2}
                />
              </div>

              <Card className="bg-muted/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">JSON-LD Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-background p-4 rounded-lg overflow-x-auto">
                    {generateJSONLD()}
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Sitemap Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-background p-4 rounded-lg overflow-x-auto">
                    {generateSitemapPreview()}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOManager;
