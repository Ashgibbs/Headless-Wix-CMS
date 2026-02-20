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
import { useCMSTours } from "@/hooks/useWixCMS";

const Pilgrimage = () => {
  const { toast } = useToast();
  const { tours } = useCMSTours(); // ✅ Only Wix CMS

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null); // ✅ No Tour type
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "1",
    preferredDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = (pkg: any) => {
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
      <section className="py-32 bg-gradient-hero text-center">
        <h1 className="text-5xl font-bold text-primary-foreground">
          Pilgrimage Packages
        </h1>
        <p className="mt-4 text-primary-foreground/80">
          Spiritual journeys powered directly from Wix CMS.
        </p>
      </section>

      {/* Tours Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          {tours.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No pilgrimage packages available.
            </p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {tours.map((pkg: any, index: number) => (
                <div
                  key={pkg.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-card"
                >
                  <div className="relative h-48 bg-gradient-hero flex items-center justify-center">
                    <span className="text-8xl text-primary-foreground/20">
                      {pkg.name?.charAt(0)}
                    </span>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{pkg.rating}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">
                      {pkg.name}
                    </h3>

                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {pkg.groupSize}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {pkg.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {pkg.citiesCovered?.slice(0, 3)?.map((city: string) => (
                        <Badge key={city} variant="outline">
                          <MapPin size={10} className="mr-1" />
                          {city}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-between border-t">
                      <Link to={`/tour/${pkg.slug}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>

                      <Button
                        className="bg-gradient-hero text-primary-foreground"
                        onClick={() => handleBookNow(pkg)}
                      >
                        Book Now <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

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
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pilgrimage;