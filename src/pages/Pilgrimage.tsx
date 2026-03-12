import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useCMSTours } from "@/hooks/useWixCMS";
import { Tour } from "@/data/tours";

const Pilgrimage = () => {
  const { toast } = useToast();
  const { tours, isLoading, error } = useCMSTours(); // ✅ Only Wix CMS


  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Tour | null>(null); // ✅ Fixed type
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "1",
    preferredDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = (pkg: Tour) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Booking Request Submitted!",
      description: `We've received your request for ${selectedPackage?.name}.`,
    });

    setIsBookingOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      travelers: "1",
      preferredDate: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section
        className="py-32 bg-gradient-hero text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-bold text-primary-foreground">
          Pilgrimage Packages
        </h1>
        <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
          Carefully curated spiritual journeys across India, powered by live
          data from Wix CMS.
        </p>
      </motion.section>


      {/* Tours Grid */}
      <motion.section
        className="py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">

          {isLoading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[500px] bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive">
              Error loading pilgrimage packages. Please try again later.
            </p>
          ) : tours.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No pilgrimage packages available at the moment.
            </p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {tours.map((pkg: Tour, index: number) => {
                const cities =
                  Array.isArray(pkg.citiesCovered) && pkg.citiesCovered.length > 0
                    ? pkg.citiesCovered
                    : Array.isArray(pkg.placesCovered)
                      ? pkg.placesCovered
                      : [];

                const days =
                  typeof pkg.days === "number" && pkg.days > 0
                    ? pkg.days
                    : typeof pkg.duration === "string"
                      ? parseInt(pkg.duration)
                      : undefined;

                const temples =
                  Number(pkg.templesCount || pkg.templesCovered || 0) || undefined;

                return (
                  <motion.div
                    key={pkg.id ?? index}
                    className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/60"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                  >
                    <div className="relative h-48 bg-gradient-hero flex items-center justify-center bg-muted overflow-hidden">
                      {pkg.imageUrl ? (
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-8xl text-primary-foreground/20">
                          {pkg.name?.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold">{pkg.name}</h3>

                      {/* Per-package stats grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                        <div className="bg-muted rounded-lg px-2 py-2 flex flex-col items-center justify-center">
                          <span className="font-semibold text-foreground">
                            {days || "—"}
                          </span>
                          <span>Days</span>
                        </div>
                        <div className="bg-muted rounded-lg px-2 py-2 flex flex-col items-center justify-center">
                          <span className="font-semibold text-foreground">
                            {cities.length || "—"}
                          </span>
                          <span>Cities</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {pkg.duration && (
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {pkg.duration}
                          </div>
                        )}

                        {pkg.groupSize && (
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            {pkg.groupSize}
                          </div>
                        )}

                        {pkg.state && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {pkg.state}
                          </div>
                        )}
                      </div>

                      {pkg.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {pkg.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {cities.slice(0, 3).map((city: string) => (
                          <Badge key={city} variant="outline" className="text-[10px]">
                            <MapPin size={10} className="mr-1" />
                            {city}
                          </Badge>
                        ))}
                        {pkg.zone && (
                          <Badge variant="secondary" className="text-[10px]">
                            {pkg.zone}
                          </Badge>
                        )}
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t">
                        <Link to={`/tour/${pkg.slug}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>

                        <Button
                          size="sm"
                          className="bg-gradient-hero text-primary-foreground"
                          onClick={() => handleBookNow(pkg)}
                        >
                          Book Now <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </motion.section>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Your Pilgrimage</DialogTitle>
            <DialogDescription>
              {selectedPackage?.name} - {selectedPackage?.duration}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelers">No. of Travelers</Label>
                <Input
                  id="travelers"
                  name="travelers"
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Special Requirements</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Any special requests or details..."
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pilgrimage;