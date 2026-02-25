import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCMSTemples } from "@/hooks/useWixCMS";
import TempleMap from "@/components/TempleMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

const Temples = () => {
  const { temples } = useCMSTemples(); // ✅ Only Wix CMS

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemple, setSelectedTemple] = useState<any | null>(null);
  const [expandedTemple, setExpandedTemple] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Dynamic filter options from Wix data
  const deities = useMemo(
    () => [...new Set(temples.map((t: any) => t.deity).filter(Boolean))],
    [temples]
  );

  const states = useMemo(
    () => [...new Set(temples.map((t: any) => t.state).filter(Boolean))],
    [temples]
  );

  const categories = useMemo(() => {
    const cats = temples
      .map((t: any) => t.famousFor?.split(",")[0]?.trim())
      .filter(Boolean);
    return [...new Set(cats)];
  }, [temples]);

  const filteredTemples = useMemo(() => {
    return temples.filter((temple: any) => {
      const matchesSearch =
        temple.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.famousFor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.state?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDeity =
        selectedDeity === "all" || temple.deity === selectedDeity;

      const matchesState =
        selectedState === "all" || temple.state === selectedState;

      const matchesCategory =
        selectedCategory === "all" ||
        temple.famousFor
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesDeity && matchesState && matchesCategory;
    });
  }, [temples, searchQuery, selectedDeity, selectedState, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDeity("all");
    setSelectedState("all");
    setSelectedCategory("all");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDeity !== "all" ||
    selectedState !== "all" ||
    selectedCategory !== "all";

  return (
    <Layout>
      <section className="py-12 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">
            Explore Sacred <span className="text-primary">Temples</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover {temples.length}+ temples across India.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">

          {/* Search */}
          <div className="bg-card rounded-xl p-6 mb-8 shadow">
            <div className="flex gap-4">
              <Input
                placeholder="Search temples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} />
              </Button>
            </div>

            {showFilters && (
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <Select value={selectedDeity} onValueChange={setSelectedDeity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Deities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {deities.map((d: string) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {states.map((s: string) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters}>
                    <X size={16} /> Clear
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Temple List */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {filteredTemples.length === 0 ? (
                <p>No temples found</p>
              ) : (
                filteredTemples.map((temple: any) => (
                  <div
                    key={temple.id}
                    className="bg-card p-5 rounded-xl shadow cursor-pointer flex flex-col sm:flex-row gap-5"
                    onClick={() => setSelectedTemple(temple)}
                  >
                    {/* Image Thumbnail */}
                    {temple.imageUrl && (
                      <div className="w-full sm:w-32 h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-muted">
                        <img
                          src={temple.imageUrl}
                          alt={temple.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold">{temple.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {temple.district}, {temple.state}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedTemple(
                              expandedTemple === temple.id ? null : temple.id
                            );
                          }}
                          className="text-xs inline-flex items-center gap-1 text-primary"
                        >
                          {expandedTemple === temple.id ? (
                            <>
                              <ChevronUp size={14} />
                              Hide summary
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} />
                              View summary
                            </>
                          )}
                        </button>

                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link to={`/temple/${temple.slug}`}>View details</Link>
                        </Button>
                      </div>

                      {expandedTemple === temple.id && (
                        <div className="mt-3 text-sm text-muted-foreground space-y-1">
                          {temple.content && <p>{temple.content}</p>}

                          {temple.deityName && (
                            <p>
                              <span className="font-medium">Main Deity: </span>
                              {temple.deityName}
                            </p>
                          )}

                          {temple.otherDeity && (
                            <p>
                              <span className="font-medium">Other Deities: </span>
                              {temple.otherDeity}
                            </p>
                          )}

                          {temple.famousFor && (
                            <p>
                              <span className="font-medium">Famous For: </span>
                              {temple.famousFor}
                            </p>
                          )}

                          {temple.openTime && (
                            <p>
                              <span className="font-medium">Timings: </span>
                              {temple.openTime}
                            </p>
                          )}

                          {temple.belief && (
                            <p>
                              <span className="font-medium">Belief: </span>
                              {temple.belief}
                            </p>
                          )}

                          {(temple.address1 ||
                            temple.address2 ||
                            temple.town ||
                            temple.district ||
                            temple.state ||
                            temple.country ||
                            temple.pincode) && (
                              <p>
                                <span className="font-medium">Address: </span>
                                {[
                                  temple.address1,
                                  temple.address2,
                                  temple.town,
                                  temple.district,
                                  temple.state,
                                  temple.country,
                                  temple.pincode,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Map */}
            <div className="h-[70vh]">
              <TempleMap
                temples={filteredTemples}
                selectedTemple={selectedTemple}
                onTempleSelect={setSelectedTemple}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Temples;