import heroStudio from '@/assets/hero-studio-1.jpg';

export const About = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroStudio}
                alt="Morain Studio Interior"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Watermark */}
              <span className="absolute bottom-4 right-4 text-primary-foreground/30 font-display text-sm tracking-widest">
                MORAIN
              </span>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sage-light rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Tentang Morain Studio
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Berlokasi di pusat kota Denpasar, Bali, Morain Studio hadir sebagai ruang foto yang 
                mengutamakan estetika minimalis dan kenyamanan klien.
              </p>
              <p>
                Dengan filosofi <span className="text-sage-dark font-medium italic">"Frame Your Story"</span>, 
                kami percaya setiap momen berharga layak diabadikan dengan cara yang indah dan bermakna.
              </p>
              <p>
                Kami menyediakan ruang studio dengan berbagai ukuran, dilengkapi peralatan lighting profesional 
                dan pilihan backdrop yang beragam. Yang membuat kami berbeda adalah kemudahan sistem booking 
                online dengan kalender real-time, sehingga Anda bisa merencanakan sesi foto kapan saja, di mana saja.
              </p>
              <p>
                Kerapian, kebersihan, dan ketepatan waktu adalah nilai-nilai yang kami junjung tinggi. 
                Di Morain, Anda tidak hanya menyewa studio—Anda mendapatkan pengalaman foto yang menyenangkan.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-display text-2xl text-sage-dark">500+</p>
                  <p className="text-sm text-muted-foreground">Sesi Foto</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-sage-dark">3</p>
                  <p className="text-sm text-muted-foreground">Ruang Studio</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-sage-dark">4.9</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
