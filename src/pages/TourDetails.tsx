import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Calendar, 
  CheckCircle, 
  ArrowLeft,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useCMSTours } from "@/hooks/useCMSData";

const TourDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tours } = useCMSTours();
  const tour = slug ? tours.find(t => t.slug === slug) : undefined;

  if (!tour) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-display text-3xl font-bold text-foreground">Tour Not Found</h1>
            <p className="text-muted-foreground">The tour you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-primary-foreground/50 rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-primary-foreground/50 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-body">Back to Home</span>
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="bg-saffron text-saffron-foreground border-none mb-4">
              Featured Tour
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {tour.name}
            </h1>
            <p className="font-body text-lg text-primary-foreground/80 mb-6">
              {tour.longDescription}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Clock size={18} className="text-primary-foreground" />
                <span className="font-body text-primary-foreground">{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Users size={18} className="text-primary-foreground" />
                <span className="font-body text-primary-foreground">{tour.groupSize}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Star size={18} className="text-golden fill-golden" />
                <span className="font-body text-primary-foreground">{tour.rating} Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-muted rounded-xl">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-3xl font-bold text-foreground">{tour.days}</p>
              <p className="font-body text-muted-foreground">Days</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-3xl font-bold text-foreground">{tour.templesCount}</p>
              <p className="font-body text-muted-foreground">Temples</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-3xl font-bold text-foreground">{tour.citiesCovered.length}</p>
              <p className="font-body text-muted-foreground">Cities</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <Star className="w-8 h-8 text-golden fill-golden mx-auto mb-3" />
              <p className="font-display text-3xl font-bold text-foreground">{tour.rating}</p>
              <p className="font-body text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Covered */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Cities Covered</h2>
          <div className="flex flex-wrap gap-3">
            {tour.citiesCovered.map((city, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full"
              >
                <MapPin size={16} className="text-primary" />
                <span className="font-body text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Highlights */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tour Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tour.highlights.map((highlight, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-background p-4 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="font-body text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Itinerary */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              Day by Day
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Detailed Itinerary
            </h2>
            <div className="section-divider" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {tour.itinerary.map((day, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="bg-gradient-hero p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                      <span className="font-display text-lg font-bold text-primary-foreground">
                        {day.day}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-primary-foreground">
                      {day.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="font-body text-muted-foreground">
                    {day.description}
                  </p>
                  
                  {day.temples && day.temples.length > 0 && (
                    <div>
                      <p className="font-body text-sm font-medium text-foreground mb-2">
                        Temples Visited:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {day.temples.map((temple, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary"
                            className="bg-secondary/10 text-secondary border-secondary/20"
                          >
                            {temple}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {day.cities && day.cities.length > 0 && (
                    <div>
                      <p className="font-body text-sm font-medium text-foreground mb-2">
                        Cities:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {day.cities.map((city, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground"
                          >
                            <MapPin size={12} />
                            {city}
                            {i < day.cities!.length - 1 && " →"}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tour.inclusions.map((inclusion, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-background p-4 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-body text-foreground">{inclusion}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Ready to Book This Tour?
          </h2>
          <p className="font-body text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today to reserve your spot on this divine pilgrimage journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg font-display"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary px-8 py-6 text-lg font-display transition-colors"
            >
              <Link to="/pilgrimage">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TourDetails;
