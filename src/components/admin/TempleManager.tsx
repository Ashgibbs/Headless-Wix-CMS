import { useState } from "react";
import { useCMSTemples } from "@/hooks/useCMSData";
import { Temple, getUniqueDeities, getUniqueStates } from "@/data/temples";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, RotateCcw, Image, Video, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const emptyTemple: Omit<Temple, 'id' | 'slug'> = {
  name: "",
  deity: "",
  deityName: "",
  otherDeity: "",
  famousFor: "",
  district: "",
  state: "",
  latitude: 0,
  longitude: 0,
  content: "",
  imageUrl: "",
  galleryImages: [],
  videoUrl: "",
};

const TempleManager = () => {
  const { temples, addTemple, updateTemple, deleteTemple, resetToDefault } = useCMSTemples();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDeity, setFilterDeity] = useState<string>("all");
  const [filterState, setFilterState] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemple, setEditingTemple] = useState<Temple | null>(null);
  const [formData, setFormData] = useState<Omit<Temple, 'id' | 'slug'>>(emptyTemple);
  const [galleryInput, setGalleryInput] = useState("");
  const { toast } = useToast();

  const deities = getUniqueDeities();
  const states = getUniqueStates();

  const filteredTemples = temples.filter(temple => {
    const matchesSearch = temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDeity = filterDeity === "all" || temple.deity === filterDeity;
    const matchesState = filterState === "all" || temple.state === filterState;
    return matchesSearch && matchesDeity && matchesState;
  });

  const handleOpenDialog = (temple?: Temple) => {
    if (temple) {
      setEditingTemple(temple);
      setFormData({
        name: temple.name,
        deity: temple.deity,
        deityName: temple.deityName,
        otherDeity: temple.otherDeity,
        famousFor: temple.famousFor,
        district: temple.district,
        state: temple.state,
        latitude: temple.latitude,
        longitude: temple.longitude,
        content: temple.content,
        imageUrl: temple.imageUrl || "",
        galleryImages: temple.galleryImages || [],
        videoUrl: temple.videoUrl || "",
      });
      setGalleryInput((temple.galleryImages || []).join("\n"));
    } else {
      setEditingTemple(null);
      setFormData(emptyTemple);
      setGalleryInput("");
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.deity || !formData.state) {
      toast({
        title: "Validation Error",
        description: "Please fill in required fields (Name, Deity, State)",
        variant: "destructive",
      });
      return;
    }

    const templeData = {
      ...formData,
      galleryImages: galleryInput.split("\n").map(s => s.trim()).filter(Boolean),
    };

    if (editingTemple) {
      updateTemple(editingTemple.id, templeData);
      toast({ title: "Temple Updated", description: `${formData.name} has been updated.` });
    } else {
      addTemple(templeData);
      toast({ title: "Temple Added", description: `${formData.name} has been added.` });
    }
    
    setIsDialogOpen(false);
    setFormData(emptyTemple);
    setGalleryInput("");
    setEditingTemple(null);
  };

  const handleDelete = (temple: Temple) => {
    deleteTemple(temple.id);
    toast({ title: "Temple Deleted", description: `${temple.name} has been removed.` });
  };

  const handleReset = () => {
    resetToDefault();
    toast({ title: "Data Reset", description: "Temples have been reset to default data." });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Manage Temples ({temples.length})</CardTitle>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset to Default?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will replace all temple data with the original defaults. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Temple
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingTemple ? "Edit Temple" : "Add New Temple"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Temple Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter temple name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deity">Primary Deity *</Label>
                      <Select value={formData.deity} onValueChange={(v) => setFormData({ ...formData, deity: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select deity" />
                        </SelectTrigger>
                        <SelectContent>
                          {deities.map(deity => (
                            <SelectItem key={deity} value={deity}>{deity}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deityName">Deity Name</Label>
                      <Input
                        id="deityName"
                        value={formData.deityName}
                        onChange={(e) => setFormData({ ...formData, deityName: e.target.value })}
                        placeholder="e.g., Lord Venkateswara"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherDeity">Other Deities</Label>
                      <Input
                        id="otherDeity"
                        value={formData.otherDeity}
                        onChange={(e) => setFormData({ ...formData, otherDeity: e.target.value })}
                        placeholder="e.g., Goddess Padmavathi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="Enter district"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="famousFor">Famous For</Label>
                    <Input
                      id="famousFor"
                      value={formData.famousFor}
                      onChange={(e) => setFormData({ ...formData, famousFor: e.target.value })}
                      placeholder="What is this temple famous for?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Description</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Detailed temple description..."
                      rows={4}
                    />
                  </div>

                  {/* Media Section */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Media
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Main Image URL</Label>
                        <Input
                          id="imageUrl"
                          value={formData.imageUrl || ""}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          placeholder="https://example.com/temple-image.jpg"
                        />
                        {formData.imageUrl && (
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="w-32 h-24 object-cover rounded border mt-2"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gallery">Gallery Images (one URL per line)</Label>
                        <Textarea
                          id="gallery"
                          value={galleryInput}
                          onChange={(e) => setGalleryInput(e.target.value)}
                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoUrl" className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Video URL
                        </Label>
                        <Input
                          id="videoUrl"
                          value={formData.videoUrl || ""}
                          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=... or direct video URL"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingTemple ? "Update Temple" : "Add Temple"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search temples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterDeity} onValueChange={setFilterDeity}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by deity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deities</SelectItem>
              {deities.map(deity => (
                <SelectItem key={deity} value={deity}>{deity}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterState} onValueChange={setFilterState}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Deity</TableHead>
                <TableHead className="hidden sm:table-cell">State</TableHead>
                <TableHead className="hidden lg:table-cell">District</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemples.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No temples found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemples.slice(0, 50).map((temple) => (
                  <TableRow key={temple.id}>
                    <TableCell className="font-medium">{temple.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{temple.deity}</TableCell>
                    <TableCell className="hidden sm:table-cell">{temple.state}</TableCell>
                    <TableCell className="hidden lg:table-cell">{temple.district}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(temple)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Temple?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{temple.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(temple)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {filteredTemples.length > 50 && (
          <p className="text-sm text-muted-foreground text-center">
            Showing 50 of {filteredTemples.length} temples. Use search to find specific temples.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TempleManager;
