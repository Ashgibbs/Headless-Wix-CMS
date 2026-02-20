import { Link } from "react-router-dom";
import { MapPin, Star, Sparkles, Clock, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { temples } from "@/data/temples";
import { tours } from "@/data/tours";
import heroTemple from "@/assets/hero-temple.jpg";
import VideoCarousel from "@/components/VideoCarousel";
import Panchang from "@/components/Panchang";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const featuredTemples = temples.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const toursRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: toursScrollProgress } = useScroll({
    target: toursRef,
    offset: ["start end", "center center"],
  });
  const toursX = useTransform(toursScrollProgress, [0, 0.5, 1], [200, 0, 0]);

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroTemple})`, y: heroY, scale: heroScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/80" />

        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-saffron/20 backdrop-blur-sm px-4 py-2 rounded-full border border-saffron/30"
            >
              <Sparkles size={16} className="text-background" />
              <span className="text-background font-body text-sm">Discover India's Sacred Heritage</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl font-bold text-background leading-tight"
            >
              Your Gateway to
              <motion.span
                className="block text-saffron"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Divine Temples
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-body text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed"
            >
              Embark on transformative spiritual journeys to India's most sacred temples.
              Experience centuries of devotion, architectural marvels, and divine blessings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-hero text-primary-foreground hover:opacity-90 px-8 py-6 text-lg font-display"
              >
                <Link to="/temples">Explore Temples</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background text-background bg-transparent hover:bg-background hover:text-foreground px-8 py-6 text-lg font-display transition-colors"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 border border-saffron/20 rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-16 w-12 h-12 border border-background/10 rounded-full"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-background/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-background/50 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Video Section - Full Width with reveal */}
      <motion.section
        className="w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-screen">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/temple-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.span
                className="text-saffron font-body text-sm uppercase tracking-widest block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Experience the Divine
              </motion.span>
              <motion.h2
                className="font-display text-4xl md:text-6xl font-bold text-background"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Your Spiritual Journey Awaits
              </motion.h2>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Daily Panchang Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
          >
            <Panchang />
          </motion.div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section ref={toursRef} className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-4 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-secondary font-body text-sm uppercase tracking-widest block">
              Popular Journeys
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured Tours
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="section-divider" />
            <motion.p variants={fadeUp} custom={3} className="font-body text-muted-foreground max-w-2xl mx-auto">
              Embark on transformative spiritual journeys with our expertly crafted pilgrimage packages.
            </motion.p>
          </motion.div>

          <motion.div className="relative" style={{ x: toursX }}>
            {/* Left Arrow */}
            <button
              onClick={() => {
                const el = document.getElementById('tours-scroll');
                if (el) el.scrollBy({ left: -380, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-background shadow-elevated border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            {/* Scrollable Row */}
            <div
              id="tours-scroll"
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 min-w-[340px] max-w-[360px] flex-shrink-0 snap-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  custom={index}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="relative h-48 bg-gradient-hero flex items-center justify-center overflow-hidden">
                    <motion.span
                      className="font-display text-8xl text-primary-foreground/20"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      {tour.name.charAt(0)}
                    </motion.span>
                    <Badge className="absolute top-4 left-4 bg-saffron text-saffron-foreground border-none">
                      Featured
                    </Badge>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                      <Star size={14} className="text-golden fill-golden" />
                      <span className="text-sm font-medium text-foreground">{tour.rating}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {tour.name}
                    </h3>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="font-body">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span className="font-body">{tour.groupSize}</span>
                      </div>
                    </div>

                    <p className="font-body text-muted-foreground text-sm line-clamp-2">
                      {tour.description}
                    </p>

                    <div className="pt-4 flex items-center justify-end border-t border-border">
                      <Button
                        asChild
                        className="bg-gradient-hero text-primary-foreground hover:opacity-90"
                      >
                        <Link to={`/tour/${tour.slug}`}>
                          View Details <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const el = document.getElementById('tours-scroll');
                if (el) el.scrollBy({ left: 380, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-background shadow-elevated border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-display"
            >
              <Link to="/pilgrimage">View All Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-4 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-secondary font-body text-sm uppercase tracking-widest block">
              Explore Sacred Sites
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured Temples
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="section-divider" />
            <motion.p variants={fadeUp} custom={3} className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover some of India's most revered temples, each with unique spiritual
              significance and architectural grandeur.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemples.map((temple, index) => (
              <motion.div
                key={temple.id}
                className="card-temple group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="relative h-52 bg-gradient-hero overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="font-display text-6xl text-primary-foreground/20"
                      whileHover={{ scale: 1.3, rotate: -5 }}
                      transition={{ duration: 0.4 }}
                    >
                      {temple.deity.charAt(0)}
                    </motion.span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-background/90 text-foreground text-xs font-body px-3 py-1 rounded-full">
                      {temple.deity}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                    <div className="flex items-center gap-2 text-background/80 text-sm">
                      <MapPin size={14} />
                      <span className="font-body">{temple.state}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {temple.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">
                    {temple.famousFor}
                  </p>
                  <Link
                    to={`/temples?id=${temple.id}`}
                    className="inline-flex items-center text-primary font-body text-sm hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-display"
            >
              <Link to="/temples">View All Temples</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <VideoCarousel />
      </motion.div>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-4 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-secondary font-body text-sm uppercase tracking-widest block">
              Why Temple Gateway
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Your Spiritual Journey Partner
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🕉️",
                title: "Expert Guidance",
                description: "Our knowledgeable guides ensure you understand the spiritual significance and history of each temple.",
              },
              {
                icon: "📍",
                title: "Comprehensive Coverage",
                description: "Access detailed information about temples across all states of India with interactive maps.",
              },
              {
                icon: "✨",
                title: "Curated Experiences",
                description: "From Jyotirlingas to Shakti Peethas, we help you plan meaningful pilgrimage journeys.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleIn}
                custom={index}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-40 h-40 border border-background/50 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-60 h-60 border border-background/50 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-32 h-32 border border-background/30 rounded-full"
            animate={{ scale: [1, 1.4, 1], y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              Ready to Begin Your Sacred Journey?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-lg text-primary-foreground/80">
              Explore our comprehensive temple directory and plan your next spiritual pilgrimage today.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg font-display"
              >
                <Link to="/temples">Browse Temples</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary px-8 py-6 text-lg font-display transition-colors"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
