import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Packages, packages, Package } from '@/components/Packages';
import { BookingFlow } from '@/components/BookingFlow';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { About } from '@/components/About';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const openBooking = (pkg?: Package) => {
    setSelectedPackage(pkg || null);
    setIsBookingOpen(true);
  };

  const scrollToPackages = () => {
    const element = document.getElementById('layanan');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar onBookingClick={() => openBooking()} />
      
      <Hero 
        onBookingClick={() => openBooking()} 
        onScheduleClick={scrollToPackages} 
      />
      
      <WhyChooseUs />
      
      <Packages onSelectPackage={(pkg) => openBooking(pkg)} />
      
      <BookingFlow />
      
      <Portfolio />
      
      <Testimonials />
      
      <About />
      
      <FAQ />
      
      <Contact />
      
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPackage={selectedPackage}
        packages={packages}
      />
    </main>
  );
};

export default Index;
