import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  { src: "/videos/temple-video-5.mp4", title: "Pancha Dwaraka Journey" },
  { src: "/videos/temple-video-1.mp4", title: "Temple Experience" },
  { src: "/videos/temple-video-2.mp4", title: "Devotee Testimonial" },
  { src: "/videos/temple-video-3.mp4", title: "Sacred Moments" },
  { src: "/videos/temple-video-4.mp4", title: "Pilgrimage Journey" },
  
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Video (Blurred) */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover scale-110 blur-2xl opacity-50"
          autoPlay
          muted
          loop
          playsInline
          key={`bg-${currentIndex}`}
        >
          <source src={videos[currentIndex].src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-14">
          <span className="text-saffron font-body text-sm uppercase tracking-widest">
            Watch & Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background">
            Temple Videos & Testimonials
          </h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full" />
          <p className="font-body text-background/80 max-w-2xl mx-auto">
            Witness the divine beauty of sacred temples and hear from fellow pilgrims about their spiritual experiences.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 h-12 w-12 rounded-full bg-background/90 hover:bg-background shadow-elevated border-none"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Video Container */}
          <div className="relative aspect-[9/16] max-h-[70vh] mx-auto rounded-2xl overflow-hidden shadow-elevated">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              playsInline
              key={currentIndex}
            >
              <source src={videos[currentIndex].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 h-12 w-12 rounded-full bg-background/90 hover:bg-background shadow-elevated border-none"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-saffron w-8"
                    : "bg-background/30 hover:bg-background/50"
                }`}
              />
            ))}
          </div>

          {/* Video Title */}
          <p className="text-center mt-4 font-display text-lg text-background">
            {videos[currentIndex].title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
