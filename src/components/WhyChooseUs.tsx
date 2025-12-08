import { Calendar, Clock, Sparkles, MapPin } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Booking Online Mudah',
    description: 'Pilih tanggal & jam langsung dari website.',
  },
  {
    icon: Clock,
    title: 'Kalender Real-Time',
    description: 'Lihat hari & jam yang sudah terisi dan masih kosong.',
  },
  {
    icon: Sparkles,
    title: 'Studio Minimalis & Estetik',
    description: 'Cocok untuk portrait, produk, & konten media sosial.',
  },
  {
    icon: MapPin,
    title: 'Lokasi Strategis',
    description: 'Mudah dijangkau di pusat kota Denpasar.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Kenapa Pilih Morain?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami menghadirkan pengalaman foto studio yang mudah, nyaman, dan profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-6 md:p-8 rounded-xl border border-border hover:border-sage/30 hover:shadow-card transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-sage-dark" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
