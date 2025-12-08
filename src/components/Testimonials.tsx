import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Dewi S.',
    type: 'Family Shoot',
    rating: 5,
    quote: 'Studio yang sangat nyaman dan bersih. Anak-anak betah foto di sini. Proses booking juga gampang banget!',
  },
  {
    name: 'Andi P.',
    type: 'Product Photography',
    rating: 5,
    quote: 'Hasil foto produk saya jadi sangat profesional. Lighting di studio sudah perfect, tinggal jepret aja.',
  },
  {
    name: 'Maya R.',
    type: 'Graduation Portrait',
    rating: 5,
    quote: 'Suasana studio minimalis dan estetik. Foto wisuda saya terlihat elegant. Terima kasih Morain!',
  },
  {
    name: 'Budi & Lisa',
    type: 'Prewedding Session',
    rating: 5,
    quote: 'Kami sangat puas dengan sesi prewedding di Morain. Backdrop-nya bagus-bagus dan tim sangat helpful.',
  },
  {
    name: 'Ratna K.',
    type: 'Self Portrait',
    rating: 5,
    quote: 'Harga terjangkau untuk kualitas studio sekelas ini. Pasti akan balik lagi untuk sesi foto berikutnya.',
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimoni" className="section-padding bg-sage-light/30">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Apa Kata Klien Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kepuasan klien adalah prioritas utama kami. Ini yang mereka katakan tentang Morain.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-partial fill-partial" />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl text-foreground text-center leading-relaxed mb-6 font-display italic">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            
            <div className="text-center">
              <p className="font-medium text-foreground">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonials[currentIndex].type}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-sage w-6'
                      : 'bg-border hover:bg-sage-light'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
