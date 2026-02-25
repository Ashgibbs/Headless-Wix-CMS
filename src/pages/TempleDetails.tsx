import { Link, useParams } from "react-router-dom";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCMSTemples } from "@/hooks/useWixCMS";

const TempleDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { temples } = useCMSTemples();

  const temple = slug ? temples.find((t: any) => t.slug === slug) : undefined;

  if (!temple) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Temple Not Found</h1>
            <p className="text-muted-foreground">
              The temple you are looking for does not exist.
            </p>
            <Button asChild>
              <Link to="/temples">Back to Temples</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const fullAddress = [
    temple.address1,
    temple.address2,
    temple.town,
    temple.district,
    temple.state,
    temple.country,
    temple.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            to="/temples"
            className="inline-flex items-center gap-2 mb-6 text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ArrowLeft size={18} />
            <span>Back to Temples</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {temple.name}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4 text-sm">
                {temple.deity && (
                  <Badge variant="outline" className="bg-primary-foreground/10">
                    {temple.deity}
                  </Badge>
                )}
                {temple.deityName && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-foreground/10">
                    Main Deity: {temple.deityName}
                  </span>
                )}
              </div>

              {fullAddress && (
                <p className="flex items-center gap-2 text-sm mb-2">
                  <MapPin size={16} />
                  <span>{fullAddress}</span>
                </p>
              )}

              {temple.openTime && (
                <p className="flex items-center gap-2 text-sm">
                  <Clock size={16} />
                  <span>Timings: {temple.openTime}</span>
                </p>
              )}
            </div>

            {temple.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-primary-foreground/20 bg-background/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={temple.imageUrl}
                  alt={temple.name}
                  className="w-full h-72 object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {temple.content && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {temple.content}
                </p>
              </div>
            )}

            {temple.belief && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Belief</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {temple.belief}
                </p>
              </div>
            )}

            {temple.famousFor && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Famous For</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {temple.famousFor}
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-card rounded-xl border p-5 space-y-2 text-sm">
              <h3 className="font-semibold mb-2">Temple Information</h3>

              {temple.otherDeity && (
                <p>
                  <span className="font-medium">Other Deities: </span>
                  {temple.otherDeity}
                </p>
              )}

              {temple.district && temple.state && (
                <p>
                  <span className="font-medium">Location: </span>
                  {temple.district}, {temple.state}
                </p>
              )}

              {(temple.latitude || temple.longitude) && (
                <p>
                  <span className="font-medium">Coordinates: </span>
                  {temple.latitude}, {temple.longitude}
                </p>
              )}
            </div>

            {temple.galleryImages && temple.galleryImages.length > 0 && (
              <div className="bg-card rounded-xl border p-4 space-y-3">
                <h3 className="font-semibold">Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {temple.galleryImages.slice(0, 4).map((img: string, i: number) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={img}
                      alt={`${temple.name} ${i + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default TempleDetails;

