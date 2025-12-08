import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Calendar, Clock, User, CreditCard, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Package } from './Packages';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
  packages: Package[];
}

type Step = 1 | 2 | 3 | 4 | 5;

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DayData {
  date: Date;
  status: 'available' | 'partial' | 'booked';
  slots?: TimeSlot[];
}

// Generate mock calendar data
const generateCalendarData = (): DayData[] => {
  const days: DayData[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const random = Math.random();
    let status: 'available' | 'partial' | 'booked';
    
    if (random < 0.2) status = 'booked';
    else if (random < 0.5) status = 'partial';
    else status = 'available';
    
    const slots: TimeSlot[] = [];
    for (let hour = 8; hour <= 20; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: status === 'available' ? true : status === 'booked' ? false : Math.random() > 0.4,
      });
    }
    
    days.push({ date, status, slots });
  }
  
  return days;
};

const calendarData = generateCalendarData();

const sessionTypes = ['Portrait', 'Couple', 'Family', 'Produk', 'Wisuda', 'Lainnya'];
const durations = ['1 Jam', '2 Jam', '3 Jam', '4 Jam'];

export const BookingModal = ({ isOpen, onClose, selectedPackage, packages }: BookingModalProps) => {
  const [step, setStep] = useState<Step>(1);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(selectedPackage);
  const [duration, setDuration] = useState('2 Jam');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    guests: '',
    sessionType: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | null>(null);
  const [bookingCode, setBookingCode] = useState('');

  if (!isOpen) return null;

  const generateBookingCode = () => {
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `MOR-${year}-${code}`;
  };

  const handleNext = () => {
    if (step < 5) {
      if (step === 4) {
        setBookingCode(generateBookingCode());
      }
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleClose = () => {
    setStep(1);
    setCurrentPackage(selectedPackage);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', whatsapp: '', email: '', guests: '', sessionType: '', notes: '' });
    setPaymentMethod(null);
    setBookingCode('');
    onClose();
  };

  const openWhatsApp = () => {
    const message = `Halo Morain, saya ingin konfirmasi booking dengan kode ${bookingCode} pada tanggal ${selectedDate?.toLocaleDateString('id-ID')} jam ${selectedTime} Paket ${currentPackage?.name} atas nama ${formData.name}. Terima kasih.`;
    const url = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return currentPackage && duration;
      case 2: return selectedDate && selectedTime;
      case 3: return formData.name && formData.whatsapp && formData.sessionType;
      case 4: return paymentMethod;
      default: return true;
    }
  };

  const steps = [
    { num: 1, label: 'Paket', icon: Clock },
    { num: 2, label: 'Jadwal', icon: Calendar },
    { num: 3, label: 'Data', icon: User },
    { num: 4, label: 'Bayar', icon: CreditCard },
    { num: 5, label: 'Selesai', icon: Check },
  ];

  const selectedDayData = selectedDate
    ? calendarData.find(d => d.date.toDateString() === selectedDate.toDateString())
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-background w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-2xl overflow-hidden shadow-elevated animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-display text-xl text-foreground">Booking Studio</h2>
            <button onClick={handleClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {/* Stepper */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div className={`flex flex-col items-center ${step >= s.num ? 'text-sage' : 'text-muted-foreground'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      step > s.num ? 'bg-sage text-primary-foreground' :
                      step === s.num ? 'bg-sage-light text-sage-dark' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      {step > s.num ? <Check size={18} /> : <s.icon size={18} />}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">{s.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-12 h-0.5 mx-1 transition-colors ${
                      step > s.num ? 'bg-sage' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-200px)] md:max-h-[60vh]">
          {/* Step 1: Package Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg text-foreground mb-4">Pilih Paket Studio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setCurrentPackage(pkg)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        currentPackage?.id === pkg.id
                          ? 'border-sage bg-sage-light/50 shadow-card'
                          : 'border-border hover:border-sage/30'
                      }`}
                    >
                      <p className="font-display text-lg text-foreground">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.size}</p>
                      <p className="text-sage-dark font-medium mt-2">{pkg.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg text-foreground mb-4">Durasi Sewa</h3>
                <div className="flex flex-wrap gap-2">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        duration === d
                          ? 'border-sage bg-sage-light/50'
                          : 'border-border hover:border-sage/30'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {currentPackage && (
                <div className="bg-secondary/50 rounded-xl p-4">
                  <h4 className="font-medium text-foreground mb-2">Ringkasan</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paket {currentPackage.name} × {duration}</span>
                    <span className="text-foreground font-medium">
                      Rp {(parseInt(currentPackage.price.replace(/\D/g, '')) * parseInt(duration)).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Calendar & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg text-foreground mb-4">Pilih Tanggal</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {calendarData.slice(0, 14).map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.status !== 'booked' && setSelectedDate(day.date)}
                      disabled={day.status === 'booked'}
                      className={`flex-shrink-0 w-16 p-3 rounded-xl border text-center transition-all ${
                        selectedDate?.toDateString() === day.date.toDateString()
                          ? 'border-sage bg-sage-light/50 shadow-card'
                          : day.status === 'booked'
                          ? 'border-border bg-secondary/50 opacity-50 cursor-not-allowed'
                          : 'border-border hover:border-sage/30'
                      }`}
                    >
                      <p className="text-xs text-muted-foreground">
                        {day.date.toLocaleDateString('id-ID', { weekday: 'short' })}
                      </p>
                      <p className="font-display text-lg text-foreground">{day.date.getDate()}</p>
                      <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                        day.status === 'available' ? 'bg-available' :
                        day.status === 'partial' ? 'bg-partial' :
                        'bg-booked'
                      }`} />
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-available" /> Tersedia</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-partial" /> Sebagian</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-booked" /> Penuh</span>
                </div>
              </div>

              {selectedDate && selectedDayData && (
                <div>
                  <h3 className="font-display text-lg text-foreground mb-4">
                    Pilih Jam - {formatDate(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {selectedDayData.slots?.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                          selectedTime === slot.time
                            ? 'border-sage bg-sage-light/50'
                            : slot.available
                            ? 'border-border hover:border-sage/30'
                            : 'border-border bg-secondary/50 opacity-50 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Client Data */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg text-foreground mb-4">Data Klien</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nama Lengkap <span className="text-booked">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nomor WhatsApp <span className="text-booked">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="input-field"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="email@example.com (opsional)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Jumlah Orang</label>
                  <input
                    type="number"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="input-field"
                    placeholder="1"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Jenis Sesi <span className="text-booked">*</span>
                  </label>
                  <select
                    value={formData.sessionType}
                    onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Pilih...</option>
                    {sessionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Catatan Tambahan</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field min-h-[100px]"
                  placeholder="Catatan khusus untuk sesi Anda (opsional)"
                />
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-display text-lg text-foreground mb-4">Metode Pembayaran</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-sage bg-sage-light/50 shadow-card'
                      : 'border-border hover:border-sage/30'
                  }`}
                >
                  <p className="font-medium text-foreground">Transfer Bank</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    DP 50% untuk konfirmasi booking. Sisanya dibayar saat datang.
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-sage bg-sage-light/50 shadow-card'
                      : 'border-border hover:border-sage/30'
                  }`}
                >
                  <p className="font-medium text-foreground">Cash (Bayar di Tempat)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bayar penuh saat Anda datang ke studio.
                  </p>
                </button>
              </div>

              {paymentMethod === 'transfer' && (
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="font-medium text-foreground mb-2">Rekening Pembayaran</p>
                  <p className="text-sm text-muted-foreground">Bank BCA</p>
                  <p className="font-mono text-foreground">1234567890</p>
                  <p className="text-sm text-muted-foreground">a.n. Morain Studio</p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-sage-dark" />
              </div>

              <div>
                <h3 className="font-display text-2xl text-foreground mb-2">Booking Berhasil!</h3>
                <p className="text-muted-foreground">Simpan kode booking Anda untuk konfirmasi</p>
              </div>

              <div className="bg-sage-light/50 rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Kode Booking</p>
                <p className="font-mono text-2xl text-sage-dark font-bold tracking-wider">{bookingCode}</p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 text-left">
                <h4 className="font-medium text-foreground mb-3">Ringkasan Booking</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="text-foreground">{currentPackage?.name} ({duration})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal</span>
                    <span className="text-foreground">{selectedDate?.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jam</span>
                    <span className="text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama</span>
                    <span className="text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pembayaran</span>
                    <span className="text-foreground">{paymentMethod === 'transfer' ? 'Transfer Bank' : 'Cash'}</span>
                  </div>
                </div>
              </div>

              <Button variant="whatsapp" size="lg" onClick={openWhatsApp} className="w-full">
                <MessageCircle size={20} />
                Konfirmasi via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground">
                Booking akan dikonfirmasi setelah Anda menghubungi kami via WhatsApp.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 5 && (
          <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ChevronLeft size={18} />
                Kembali
              </Button>
            )}
            <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
              {step === 4 ? 'Konfirmasi Booking' : 'Lanjutkan'}
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
