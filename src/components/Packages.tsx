import { Check, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Package {
  id: 'small' | 'medium' | 'large';
  name: string;
  size: string;
  capacity: string;
  price: string;
  priceNote: string;
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: 'small',
    name: 'Small',
    size: '±3×4 m',
    capacity: '1–3 orang',
    price: 'Rp 150.000',
    priceNote: 'per jam',
  },
  {
    id: 'medium',
    name: 'Medium',
    size: '±4×6 m',
    capacity: '3–6 orang',
    price: 'Rp 250.000',
    priceNote: 'per jam',
    popular: true,
  },
  {
    id: 'large',
    name: 'Large',
    size: '±6×8 m',
    capacity: '8–10 orang',
    price: 'Rp 400.000',
    priceNote: 'per jam',
  },
];

const facilities = [
  'Lighting basic (2–3 lampu softbox)',
  'Pilihan backdrop (putih, hitam, warna netral)',
  'Standing mirror',
  'Kursi / stool',
  'Meja kecil & props dasar',
  'AC',
  'Colokan listrik / extension',
];

interface PackagesProps {
  onSelectPackage: (pkg: Package) => void;
}

export const Packages = ({ onSelectPackage }: PackagesProps) => {
  return (
    <section id="layanan" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Layanan & Paket Studio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih ruang studio sesuai kebutuhan Anda. Semua paket dilengkapi dengan fasilitas lengkap untuk sesi foto terbaik.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-card rounded-2xl border transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
                pkg.popular
                  ? 'border-sage shadow-card'
                  : 'border-border hover:border-sage/30'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
                  Paling Populer
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Ukuran ruangan: {pkg.size}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Users size={16} />
                  <span>Cocok untuk {pkg.capacity}</span>
                </div>

                <div className="mb-6">
                  <span className="font-display text-3xl text-foreground">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    /{pkg.priceNote}
                  </span>
                </div>

                <Button
                  onClick={() => onSelectPackage(pkg)}
                  variant={pkg.popular ? 'default' : 'outline'}
                  className="w-full"
                >
                  Pilih Paket {pkg.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities */}
        <div className="bg-secondary/50 rounded-2xl p-6 md:p-8">
          <h3 className="font-display text-xl text-foreground mb-6 text-center">
            Fasilitas Semua Paket
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={16} className="text-sage flex-shrink-0" />
                <span>{facility}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">
            * Tambahan jam tersedia. Biaya overtime Rp 50.000/jam.
          </p>
        </div>
      </div>
    </section>
  );
};

export { packages };
