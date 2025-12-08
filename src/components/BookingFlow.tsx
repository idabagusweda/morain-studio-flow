import { ClipboardList, Calendar, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Pilih Paket & Durasi',
    description: 'Tentukan paket studio dan durasi sewa yang sesuai kebutuhan Anda.',
  },
  {
    icon: Calendar,
    step: '02',
    title: 'Pilih Tanggal & Jam',
    description: 'Lihat kalender ketersediaan dan pilih jadwal yang masih kosong.',
  },
  {
    icon: MessageCircle,
    step: '03',
    title: 'Konfirmasi via WhatsApp',
    description: 'Dapatkan kode booking dan konfirmasi melalui WhatsApp kami.',
  },
];

export const BookingFlow = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Booking dalam 3 Langkah Mudah
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proses booking studio kami dirancang simple agar Anda bisa langsung fokus pada sesi foto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-sage-light flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-sage-dark" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {step.step}
                </span>
              </div>
              
              <h3 className="font-display text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
