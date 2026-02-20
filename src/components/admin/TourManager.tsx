import { useState } from "react";
import { useCMSTours } from "@/hooks/useWixCMS";
import { Tour, TourItinerary } from "@/data/tours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, RotateCcw, Star, Calendar, Users, Image, Video } from "lucide-react";
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

const emptyTour: Omit<Tour, 'id'> = {
  name: "",
  slug: "",
  duration: "",
  days: 0,
  nights: 0,
  groupSize: "",
  rating: 4.5,
  description: "",
  longDescription: "",
  templesCount: 0,
  citiesCovered: [],
  highlights: [],
  inclusions: [],
  itinerary: [],
  imageUrl: "",
  galleryImages: [],
  videoUrl: "",
};

const TourManager = () => {
  const { tours, addTour, updateTour, deleteTour, resetToDefault } = useCMSTours();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Omit<Tour, 'id'>>(emptyTour);
  const { toast } = useToast();

  // For array fields stored as comma-separated strings in the form
  const [citiesInput, setCitiesInput] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [inclusionsInput, setInclusionsInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  const filteredTours = tours.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.citiesCovered.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenDialog = (tour?: Tour) => {
    if (tour) {
      setEditingTour(tour);
      setFormData({
        name: tour.name,
        slug: tour.slug,
        duration: tour.duration,
        days: tour.days,
        nights: tour.nights,
        groupSize: tour.groupSize,
        rating: tour.rating,
        description: tour.description,
        longDescription: tour.longDescription,
        templesCount: tour.templesCount,
        citiesCovered: tour.citiesCovered,
        highlights: tour.highlights,
        inclusions: tour.inclusions,
        itinerary: tour.itinerary,
        imageUrl: tour.imageUrl || "",
        galleryImages: tour.galleryImages || [],
        videoUrl: tour.videoUrl || "",
      });
      setCitiesInput(tour.citiesCovered.join(", "));
      setHighlightsInput(tour.highlights.join("\n"));
      setInclusionsInput(tour.inclusions.join("\n"));
      setGalleryInput((tour.galleryImages || []).join("\n"));
    } else {
      setEditingTour(null);
      setFormData(emptyTour);
      setCitiesInput("");
      setHighlightsInput("");
      setInclusionsInput("");
      setGalleryInput("");
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.duration) {
      toast({
        title: "Validation Error",
        description: "Please fill in required fields (Name, Duration)",
        variant: "destructive",
      });
      return;
    }

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tourData = {
      ...formData,
      slug,
      citiesCovered: citiesInput.split(",").map(s => s.trim()).filter(Boolean),
      highlights: highlightsInput.split("\n").map(s => s.trim()).filter(Boolean),
      inclusions: inclusionsInput.split("\n").map(s => s.trim()).filter(Boolean),
      galleryImages: galleryInput.split("\n").map(s => s.trim()).filter(Boolean),
    };

    if (editingTour) {
      updateTour(editingTour.id, tourData);
      toast({ title: "Tour Updated", description: `${formData.name} has been updated.` });
    } else {
      addTour(tourData);
      toast({ title: "Tour Added", description: `${formData.name} has been added.` });
    }

    setIsDialogOpen(false);
    setFormData(emptyTour);
    setEditingTour(null);
  };

  const handleDelete = (tour: Tour) => {
    deleteTour(tour.id);
    toast({ title: "Tour Deleted", description: `${tour.name} has been removed.` });
  };

  const handleReset = () => {
    resetToDefault();
    toast({ title: "Data Reset", description: "Tours have been reset to default data." });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Manage Tours ({tours.length})</CardTitle>
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
                    This will replace all tour data with the original defaults. This action cannot be undone.
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
                  Add Tour
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingTour ? "Edit Tour" : "Add New Tour"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tour Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Pancha Dwaraka Tour"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 6 Days / 5 Nights"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="days">Days</Label>
                      <Input
                        id="days"
                        type="number"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nights">Nights</Label>
                      <Input
                        id="nights"
                        type="number"
                        value={formData.nights}
                        onChange={(e) => setFormData({ ...formData, nights: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Input
                        id="groupSize"
                        value={formData.groupSize}
                        onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                        placeholder="e.g., 15-25 Pilgrims"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="templesCount">Temples Count</Label>
                      <Input
                        id="templesCount"
                        type="number"
                        value={formData.templesCount}
                        onChange={(e) => setFormData({ ...formData, templesCount: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief tour description..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Full Description</Label>
                    <Textarea
                      id="longDescription"
                      value={formData.longDescription}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                      placeholder="Detailed tour description..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cities">Cities Covered (comma-separated)</Label>
                    <Input
                      id="cities"
                      value={citiesInput}
                      onChange={(e) => setCitiesInput(e.target.value)}
                      placeholder="Chennai, Ahmedabad, Dwarka..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="highlights">Highlights (one per line)</Label>
                    <Textarea
                      id="highlights"
                      value={highlightsInput}
                      onChange={(e) => setHighlightsInput(e.target.value)}
                      placeholder="Enter each highlight on a new line..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                    <Textarea
                      id="inclusions"
                      value={inclusionsInput}
                      onChange={(e) => setInclusionsInput(e.target.value)}
                      placeholder="Enter each inclusion on a new line..."
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
                        <Label htmlFor="tourImageUrl">Main Image URL</Label>
                        <Input
                          id="tourImageUrl"
                          value={formData.imageUrl || ""}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          placeholder="https://example.com/tour-image.jpg"
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
                        <Label htmlFor="tourGallery">Gallery Images (one URL per line)</Label>
                        <Textarea
                          id="tourGallery"
                          value={galleryInput}
                          onChange={(e) => setGalleryInput(e.target.value)}
                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tourVideoUrl" className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Video URL
                        </Label>
                        <Input
                          id="tourVideoUrl"
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
                      {editingTour ? "Update Tour" : "Add Tour"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour Name</TableHead>
                <TableHead className="hidden sm:table-cell">Duration</TableHead>
                <TableHead className="hidden md:table-cell">Temples</TableHead>
                <TableHead className="hidden lg:table-cell">Rating</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No tours found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div>
                        <span className="font-medium">{tour.name}</span>
                        <div className="flex gap-2 mt-1 sm:hidden">
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {tour.days}D
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            {tour.rating}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{tour.duration}</TableCell>
                    <TableCell className="hidden md:table-cell">{tour.templesCount}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {tour.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(tour)}>
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
                              <AlertDialogTitle>Delete Tour?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{tour.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(tour)}>Delete</AlertDialogAction>
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
      </CardContent>
    </Card>
  );
};

export default TourManager;
