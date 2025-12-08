import { useState } from 'react';
import { X } from 'lucide-react';
import galleryProduct from '@/assets/gallery-product.jpg';
import galleryCouple from '@/assets/gallery-couple.jpg';
import galleryGraduation from '@/assets/gallery-graduation.jpg';
import galleryFamily from '@/assets/gallery-family.jpg';
import galleryCorporate from '@/assets/gallery-corporate.jpg';
import galleryBaby from '@/assets/gallery-baby.jpg';

type Category = 'all' | 'portrait' | 'couple' | 'family' | 'product';

interface GalleryItem {
  src: string;
  alt: string;
  category: Category[];
}

const galleryItems: GalleryItem[] = [
  { src: galleryGraduation, alt: 'Graduation Portrait', category: ['portrait'] },
  { src: galleryCouple, alt: 'Couple Session', category: ['couple'] },
  { src: galleryFamily, alt: 'Family Portrait', category: ['family'] },
  { src: galleryProduct, alt: 'Product Photography', category: ['product'] },
  { src: galleryCorporate, alt: 'Corporate Headshot', category: ['portrait'] },
  { src: galleryBaby, alt: 'Baby Portrait', category: ['family', 'portrait'] },
];

const categories = [
  { id: 'all' as Category, label: 'Semua' },
  { id: 'portrait' as Category, label: 'Portrait' },
  { id: 'couple' as Category, label: 'Couple' },
  { id: 'family' as Category, label: 'Keluarga' },
  { id: 'product' as Category, label: 'Produk' },
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category.includes(activeCategory));

  return (
    <section id="portofolio" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Portofolio Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lihat hasil karya foto yang telah kami hasilkan di studio Morain.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-sage text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-sage-light hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setLightboxImage(item.src)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300" />
              {/* Watermark */}
              <span className="absolute bottom-3 right-3 text-primary-foreground/40 font-display text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                MORAIN
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-8 right-8 text-primary-foreground/30 font-display text-lg tracking-widest">
            MORAIN
          </span>
        </div>
      )}
    </section>
  );
};
