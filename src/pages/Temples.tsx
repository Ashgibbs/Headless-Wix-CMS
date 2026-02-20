import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Temple } from "@/data/temples";
import { useCMSTemples } from "@/hooks/useCMSData";
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
  const { temples } = useCMSTemples();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedTemple, setExpandedTemple] = useState<number | null>(null);

  // Dynamic filter options based on actual data
  const deities = useMemo(() => [...new Set(temples.map(t => t.deity).filter(Boolean))], [temples]);
  const states = useMemo(() => [...new Set(temples.map(t => t.state).filter(Boolean))], [temples]);
  const categories = useMemo(() => {
    const cats = temples.map(t => t.famousFor?.split(',')[0]?.trim()).filter(Boolean);
    return [...new Set(cats)];
  }, [temples]);

  const filteredTemples = useMemo(() => {
    return temples.filter((temple) => {
      const matchesSearch =
        temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.famousFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDeity = selectedDeity === "all" || temple.deity === selectedDeity;
      const matchesState = selectedState === "all" || temple.state === selectedState;
      const matchesCategory =
        selectedCategory === "all" ||
        temple.famousFor.toLowerCase().includes(selectedCategory.toLowerCase());

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
    searchQuery || selectedDeity !== "all" || selectedState !== "all" || selectedCategory !== "all";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Explore Sacred <span className="text-primary">Temples</span>
            </h1>
            <p className="font-body text-muted-foreground">
              Discover {temples.length}+ temples across India with detailed information and interactive maps.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          {/* Search & Filters */}
          <div className="bg-card rounded-xl shadow-card p-6 mb-8">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search temples by name, location, or significance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-body"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="font-body"
              >
                <Filter size={18} className="mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border animate-fade-in">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Deity</Label>
                  <Select value={selectedDeity} onValueChange={setSelectedDeity}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="All Deities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Deities</SelectItem>
                      {deities.map((deity) => (
                        <SelectItem key={deity} value={deity}>
                          {deity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-body text-sm">State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-body text-sm">Significance</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <div className="md:col-span-3 flex justify-end">
                    <Button variant="ghost" onClick={clearFilters} className="font-body text-sm">
                      <X size={16} className="mr-2" />
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredTemples.length}</span> temples
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Temple List */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {filteredTemples.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-display text-xl text-foreground mb-2">No temples found</p>
                  <p className="font-body text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredTemples.map((temple) => (
                  <div
                    key={temple.id}
                    className={`bg-card rounded-xl shadow-soft p-5 cursor-pointer transition-all duration-300 hover:shadow-card ${
                      selectedTemple?.id === temple.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTemple(temple)}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-body rounded">
                            {temple.deity}
                          </span>
                          <span className="px-2 py-0.5 bg-secondary/30 text-secondary-foreground text-xs font-body rounded">
                            {temple.state}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                          {temple.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                          <MapPin size={14} />
                          <span className="font-body">{temple.district}, {temple.state}</span>
                        </div>
                        <p className="font-body text-sm text-muted-foreground line-clamp-2">
                          {temple.famousFor}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedTemple(expandedTemple === temple.id ? null : temple.id);
                        }}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                      >
                        {expandedTemple === temple.id ? (
                          <ChevronUp size={20} className="text-muted-foreground" />
                        ) : (
                          <ChevronDown size={20} className="text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Content */}
                    {expandedTemple === temple.id && (
                      <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                        <h4 className="font-display text-sm font-semibold text-foreground mb-2">
                          About this Temple
                        </h4>
                        <p className="font-body text-sm text-muted-foreground mb-3">
                          {temple.content}
                        </p>
                        {temple.otherDeity && (
                          <p className="font-body text-sm">
                            <span className="text-foreground font-medium">Other Deities: </span>
                            <span className="text-muted-foreground">{temple.otherDeity}</span>
                          </p>
                        )}
                        {temple.latitude && temple.longitude && (
                          <p className="font-body text-sm mt-2">
                            <span className="text-foreground font-medium">Coordinates: </span>
                            <span className="text-muted-foreground">
                              {temple.latitude.toFixed(4)}°N, {temple.longitude.toFixed(4)}°E
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Map */}
            <div className="h-[70vh] sticky top-24">
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
