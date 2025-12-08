import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroStudio from '@/assets/hero-studio-1.jpg';
import heroPortrait from '@/assets/hero-portrait.jpg';
import heroFamily from '@/assets/hero-family.jpg';

const slides = [
  {
    image: heroStudio,
    alt: 'Morain Studio Interior',
  },
  {
    image: heroPortrait,
    alt: 'Portrait Photography at Morain',
  },
  {
    image: heroFamily,
    alt: 'Family Photography Session',
  },
];

interface HeroProps {
  onBookingClick: () => void;
  onScheduleClick: () => void;
}

export const Hero = ({ onBookingClick, onScheduleClick }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="beranda" className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
      ))}

      {/* Watermark */}
      <div className="absolute bottom-8 right-8 text-primary-foreground/30 font-display text-lg tracking-widest">
        MORAIN
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container-custom">
          <div className="max-w-xl space-y-6 animate-fade-in-up">
            <p className="text-primary-foreground/80 text-sm tracking-widest uppercase">
              Berbasis di Denpasar, Bali
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Studio Foto
              <span className="block">Minimalis</span>
              <span className="block text-sage-light">di Denpasar</span>
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-md leading-relaxed">
              Frame Your Story dengan ruang studio yang nyaman, estetik, dan siap Anda booking secara online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" onClick={onBookingClick}>
                Lihat Paket & Booking
              </Button>
              <Button variant="heroOutline" onClick={onScheduleClick}>
                Cek Jadwal Tersedia
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary-foreground w-8'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/70'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-colors hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-colors hidden md:block"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};
