import { Link } from "react-router-dom";
import { useState } from "react";
import { Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";
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
import { useCMSTours } from "@/hooks/useCMSData";
import { Tour } from "@/data/tours";

const Pilgrimage = () => {
  const { toast } = useToast();
  const { tours } = useCMSTours();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Tour | null>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Booking Request Submitted!",
      description: `We've received your request for ${selectedPackage?.name}. Our team will contact you within 24 hours.`,
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
      <section className="relative py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-primary-foreground/50 rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-primary-foreground/50 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge variant="secondary" className="bg-background/20 text-primary-foreground border-none">
              Curated Spiritual Journeys
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground">
              Pilgrimage Packages
            </h1>
            <p className="font-body text-lg text-primary-foreground/80">
              Embark on transformative spiritual journeys with our expertly crafted pilgrimage 
              packages. From the Char Dham to Jyotirlingas, experience divine blessings.
            </p>
          </div>
        </div>
      </section>

      {/* All Tour Packages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-14">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              Explore Our Journeys
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Tour Packages
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tours.map((pkg, index) => (
              <div
                key={pkg.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 bg-gradient-hero flex items-center justify-center">
                  <span className="font-display text-8xl text-primary-foreground/20">
                    {pkg.name.charAt(0)}
                  </span>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                    <Star size={14} className="text-golden fill-golden" />
                    <span className="text-sm font-medium text-foreground">{pkg.rating}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {pkg.name}
                  </h3>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span className="font-body">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span className="font-body">{pkg.groupSize}</span>
                    </div>
                  </div>

                  <p className="font-body text-muted-foreground text-sm line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pkg.citiesCovered.slice(0, 3).map((dest) => (
                      <Badge key={dest} variant="outline" className="text-xs font-body">
                        <MapPin size={10} className="mr-1" />
                        {dest}
                      </Badge>
                    ))}
                    {pkg.citiesCovered.length > 3 && (
                      <Badge variant="outline" className="text-xs font-body">
                        +{pkg.citiesCovered.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border">
                    <Link to={`/tour/${pkg.slug}`}>
                      <Button variant="outline" className="font-body">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      className="bg-gradient-hero text-primary-foreground hover:opacity-90"
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-hero rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/50 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-primary-foreground/50 rounded-full" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Need a Custom Pilgrimage?
              </h2>
              <p className="font-body text-primary-foreground/80">
                We can create a personalized pilgrimage package tailored to your spiritual needs, 
                schedule, and budget. Contact us to plan your unique journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 font-display"
                >
                  <Link to="/contact">Request Custom Tour</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 font-display"
                >
                  <Link to="/temples">Browse Temples</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              Book Your Pilgrimage
            </DialogTitle>
            <DialogDescription className="font-body text-muted-foreground">
              {selectedPackage && (
                <span>
                  <strong className="text-foreground">{selectedPackage.name}</strong> - {selectedPackage.duration}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  className="font-body"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="font-body"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-body">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="font-body"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelers" className="font-body">Number of Travelers *</Label>
                <Input
                  id="travelers"
                  name="travelers"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  required
                  className="font-body"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="font-body">Preferred Travel Date</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="font-body"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-body">Special Requests</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any special requirements, dietary restrictions, mobility needs, etc."
                rows={3}
                className="font-body"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsBookingOpen(false)}
                className="flex-1 font-body"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-hero text-primary-foreground hover:opacity-90 font-display"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pilgrimage;
