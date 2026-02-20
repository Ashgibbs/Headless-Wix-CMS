import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getPanchang, getNorthIndianPanchang, PanchangData, NorthIndianPanchangData } from "@/lib/panchang";
import { Sun, Moon, Calendar, Clock, Star, Sparkles, AlertTriangle, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanchangProps {
  date?: Date;
  latitude?: number;
  longitude?: number;
  compact?: boolean;
}

const Panchang = ({ date, compact = false }: PanchangProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(date || new Date());
  const [tamilPanchang, setTamilPanchang] = useState<PanchangData | null>(null);
  const [northPanchang, setNorthPanchang] = useState<NorthIndianPanchangData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      setTamilPanchang(getPanchang(selectedDate, 13.0827, 80.2707));
      setNorthPanchang(getNorthIndianPanchang(selectedDate, 28.6139, 77.2090));
    } catch (error) {
      console.error("Error calculating panchang:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  if (loading) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!tamilPanchang || !northPanchang) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-destructive/20">
        <CardContent className="p-6 text-center text-muted-foreground">
          பஞ்சாங்கத்தை கணக்கிட இயலவில்லை
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-saffron/10 to-temple-gold/10 border-primary/20 overflow-hidden">
          <CardHeader className="pb-2 bg-primary/5">
            <CardTitle className="text-lg font-display flex items-center gap-2 text-primary">
              <Calendar className="h-5 w-5" />
              தமிழ் பஞ்சாங்கம்
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-saffron/20 text-saffron border-saffron/30">{tamilPanchang.varaTamil}</Badge>
              <Badge variant="outline" className="bg-temple-gold/20 text-foreground border-temple-gold/30">{tamilPanchang.tithiTamil}</Badge>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">{tamilPanchang.nakshatraTamil}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-saffron" />
                <span className="text-muted-foreground">சூரிய உதயம்:</span>
                <span className="font-medium">{tamilPanchang.sunrise}</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">சூரிய அஸ்தமனம்:</span>
                <span className="font-medium">{tamilPanchang.sunset}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100/30 to-amber-100/30 dark:from-orange-900/10 dark:to-amber-900/10 border-orange-300/30 dark:border-orange-700/30 overflow-hidden">
          <CardHeader className="pb-2 bg-orange-500/5">
            <CardTitle className="text-lg font-display flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <Calendar className="h-5 w-5" />
              Daily Panchang
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30">{northPanchang.vara}</Badge>
              <Badge variant="outline" className="bg-amber-500/20 text-foreground border-amber-500/30">{northPanchang.tithi}</Badge>
              <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30">{northPanchang.nakshatra}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-orange-500" />
                <span className="text-muted-foreground">Sunrise:</span>
                <span className="font-medium">{northPanchang.sunrise}</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-orange-700 dark:text-orange-400" />
                <span className="text-muted-foreground">Sunset:</span>
                <span className="font-medium">{northPanchang.sunset}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Title with Date Picker */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-display text-primary">தினசரி பஞ்சாங்கம் | Daily Panchang</h2>
        <p className="text-sm text-muted-foreground">Daily Panchangam — Tamil & North Indian Traditions</p>
        <div className="flex items-center justify-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(d) => d && setSelectedDate(d)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDate(new Date())}
            className="text-xs text-muted-foreground"
          >
            Today
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tamil Panchangam */}
        <Card className="bg-gradient-to-br from-saffron/5 via-card to-temple-gold/5 border-primary/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-saffron/10 border-b border-primary/10">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-xl font-display flex items-center gap-2 text-primary">
                <Calendar className="h-6 w-6" />
                <span>தமிழ் பஞ்சாங்கம்</span>
              </CardTitle>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {tamilPanchang.date.toLocaleDateString('ta-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-xs text-primary font-medium">
                  {tamilPanchang.tamilYearTamil} ({tamilPanchang.tamilYear}) • {tamilPanchang.tamilMonthTamil} ({tamilPanchang.tamilMonth}) • {tamilPanchang.pakshaTamil}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            {tamilPanchang.specialDayTamil && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-saffron/20 to-temple-gold/20 border border-saffron/30">
                <Sparkles className="h-5 w-5 text-saffron animate-pulse" />
                <div>
                  <p className="font-display text-saffron">{tamilPanchang.specialDayTamil}</p>
                  <p className="text-xs text-muted-foreground">{tamilPanchang.specialDay}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <PanchangItem icon={<Star className="h-4 w-4" />} label="திதி" labelEnglish="Tithi" value={tamilPanchang.tithiTamil} valueEnglish={tamilPanchang.tithi} subValue={tamilPanchang.pakshaTamil} color="saffron" />
              <PanchangItem icon={<Moon className="h-4 w-4" />} label="நட்சத்திரம்" labelEnglish="Nakshatra" value={tamilPanchang.nakshatraTamil} valueEnglish={tamilPanchang.nakshatra} color="primary" />
              <PanchangItem icon={<Sparkles className="h-4 w-4" />} label="யோகம்" labelEnglish="Yoga" value={tamilPanchang.yogaTamil} valueEnglish={tamilPanchang.yoga} color="temple-gold" />
              <PanchangItem icon={<Calendar className="h-4 w-4" />} label="கரணம்" labelEnglish="Karana" value={tamilPanchang.karanaTamil} valueEnglish={tamilPanchang.karana} color="muted" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-saffron/10 to-orange-100/30 dark:to-orange-900/10 border border-saffron/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="h-4 w-4 text-saffron" />
                  <span className="text-xs text-muted-foreground">சூரிய உதயம்</span>
                </div>
                <p className="text-base font-semibold text-foreground">{tamilPanchang.sunrise}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100/50 to-purple-100/30 dark:from-indigo-900/20 dark:to-purple-900/10 border border-indigo-200/50 dark:border-indigo-800/30">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="h-4 w-4 text-indigo-500" />
                  <span className="text-xs text-muted-foreground">சூரிய அஸ்தமனம்</span>
                </div>
                <p className="text-base font-semibold text-foreground">{tamilPanchang.sunset}</p>
              </div>
            </div>

            {/* Inauspicious Times */}
            <div className="space-y-2">
              <h3 className="font-display text-xs text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-3 w-3" />
                தவிர்க்க வேண்டிய நேரங்கள்
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">ராகு காலம்</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{tamilPanchang.rahu_kaal}</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-600">எமகண்டம்</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{tamilPanchang.yamagandam}</span>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">குளிகை காலம்</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{tamilPanchang.gulika_kaal}</span>
                </div>
              </div>
            </div>

            {tamilPanchang.auspicious && (
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300/50 dark:border-green-700/30">
                <Sparkles className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="font-display text-green-700 dark:text-green-400 text-sm">இன்று சுபதினம்</p>
                <p className="text-xs text-green-600/80 dark:text-green-500/80">Auspicious Day</p>
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              📍 சென்னை, தமிழ்நாடு | Chennai, Tamil Nadu
            </p>
          </CardContent>
        </Card>

        {/* North Indian Panchangam */}
        <Card className="bg-gradient-to-br from-orange-50/50 via-card to-red-50/30 dark:from-orange-950/20 dark:to-red-950/10 border-orange-300/30 dark:border-orange-700/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-orange-300/20 dark:border-orange-700/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-xl font-display flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <Calendar className="h-6 w-6" />
                <span>Daily Panchang</span>
              </CardTitle>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {northPanchang.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">
                  Vikram Samvat {northPanchang.vikramSamvat} • {northPanchang.monthHindi} ({northPanchang.month}) • {northPanchang.paksha}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            {northPanchang.specialDayHindi && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <Sparkles className="h-5 w-5 text-orange-600 animate-pulse" />
                <div>
                  <p className="font-display text-orange-700 dark:text-orange-400">{northPanchang.specialDayHindi}</p>
                  <p className="text-xs text-muted-foreground">{northPanchang.specialDay}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <NorthPanchangItem icon={<Star className="h-4 w-4" />} label="Tithi" labelEnglish="" value={northPanchang.tithi} subValue={northPanchang.paksha} color="orange" />
              <NorthPanchangItem icon={<Moon className="h-4 w-4" />} label="Nakshatra" labelEnglish="" value={northPanchang.nakshatra} color="red" />
              <NorthPanchangItem icon={<Sparkles className="h-4 w-4" />} label="Yoga" labelEnglish="" value={northPanchang.yoga} color="amber" />
              <NorthPanchangItem icon={<Calendar className="h-4 w-4" />} label="Karana" labelEnglish="" value={northPanchang.karana} color="muted" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-100/50 to-amber-100/30 dark:from-orange-900/20 dark:to-amber-900/10 border border-orange-300/30 dark:border-orange-700/30">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="h-4 w-4 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Sunrise</span>
                </div>
                <p className="text-base font-semibold text-foreground">{northPanchang.sunrise}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-100/30 to-pink-100/30 dark:from-red-900/10 dark:to-pink-900/10 border border-red-200/30 dark:border-red-800/30">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-muted-foreground">Sunset</span>
                </div>
                <p className="text-base font-semibold text-foreground">{northPanchang.sunset}</p>
              </div>
            </div>

            {/* Moon & Day Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/30 border border-muted">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                   <span className="text-xs text-muted-foreground">Moon Phase</span>
                 </div>
                <p className="text-base font-semibold text-foreground">{northPanchang.moonPhase}</p>
                <p className="text-xs text-muted-foreground">{northPanchang.moonIllumination}% Illumination</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-muted">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                   <span className="text-xs text-muted-foreground">Day</span>
                 </div>
                <p className="text-base font-semibold text-foreground">{northPanchang.vara}</p>
              </div>
            </div>

            {/* Rahu Kaal */}
            <div className="space-y-2">
              <h3 className="font-display text-xs text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-3 w-3" />
                Inauspicious Time
              </h3>
              <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Rahu Kaal</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{northPanchang.rahu_kaal}</span>
              </div>
            </div>

            {northPanchang.auspicious && (
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300/50 dark:border-green-700/30">
                <Sparkles className="h-5 w-5 text-green-600 mx-auto mb-1" />
                 <p className="font-display text-green-700 dark:text-green-400 text-sm">Auspicious Day</p>
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              📍 Delhi, India
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface PanchangItemProps {
  icon: React.ReactNode;
  label: string;
  labelEnglish: string;
  value: string;
  valueEnglish?: string;
  subValue?: string;
  color: 'saffron' | 'primary' | 'temple-gold' | 'muted';
}

const PanchangItem = ({ icon, label, labelEnglish, value, valueEnglish, subValue, color }: PanchangItemProps) => {
  const colorClasses = {
    saffron: 'text-saffron bg-saffron/10 border-saffron/20',
    primary: 'text-primary bg-primary/10 border-primary/20',
    'temple-gold': 'text-temple-gold bg-temple-gold/10 border-temple-gold/20',
    muted: 'text-muted-foreground bg-muted/50 border-muted'
  };

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-[10px] text-muted-foreground/70">({labelEnglish})</span>
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
      {valueEnglish && <p className="text-[11px] text-muted-foreground">{valueEnglish}</p>}
      {subValue && <p className="text-[11px] text-muted-foreground mt-0.5">{subValue}</p>}
    </div>
  );
};

interface NorthPanchangItemProps {
  icon: React.ReactNode;
  label: string;
  labelEnglish: string;
  value: string;
  valueEnglish?: string;
  subValue?: string;
  color: 'orange' | 'red' | 'amber' | 'muted';
}

const NorthPanchangItem = ({ icon, label, labelEnglish, value, valueEnglish, subValue, color }: NorthPanchangItemProps) => {
  const colorClasses = {
    orange: 'text-orange-700 dark:text-orange-400 bg-orange-500/10 border-orange-500/20',
    red: 'text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20',
    amber: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    muted: 'text-muted-foreground bg-muted/50 border-muted'
  };

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-[10px] text-muted-foreground/70">({labelEnglish})</span>
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
      {valueEnglish && <p className="text-[11px] text-muted-foreground">{valueEnglish}</p>}
      {subValue && <p className="text-[11px] text-muted-foreground mt-0.5">{subValue}</p>}
    </div>
  );
};

export default Panchang;
