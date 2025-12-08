import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: 'Bagaimana cara booking studio?',
    answer: 'Anda bisa booking langsung dari website ini. Pilih paket studio yang diinginkan, tentukan tanggal dan jam dari kalender ketersediaan, lalu isi data diri Anda. Setelah mendapat kode booking, konfirmasi via WhatsApp untuk menyelesaikan reservasi.',
  },
  {
    question: 'Apakah bisa reschedule jadwal?',
    answer: 'Ya, Anda bisa melakukan reschedule maksimal H-1 sebelum jadwal booking melalui WhatsApp kami. Reschedule tergantung ketersediaan jadwal pengganti.',
  },
  {
    question: 'Berapa minimal durasi sewa?',
    answer: 'Durasi minimal sewa studio adalah 1 jam untuk semua paket. Anda bisa memperpanjang durasi sesuai kebutuhan dengan biaya overtime Rp 50.000/jam.',
  },
  {
    question: 'Apakah harga sudah termasuk fotografer?',
    answer: 'Harga yang tertera adalah untuk sewa ruangan studio saja. Kami menyediakan layanan fotografer profesional sebagai add-on dengan biaya tambahan. Silakan hubungi kami via WhatsApp untuk informasi lebih lanjut.',
  },
  {
    question: 'Metode pembayaran apa saja yang diterima?',
    answer: 'Kami menerima pembayaran via transfer bank (BCA, Mandiri, BNI) dan juga cash di tempat. DP 50% diperlukan untuk mengkonfirmasi booking, sisanya bisa dibayar saat datang.',
  },
  {
    question: 'Apakah boleh membawa makeup artist sendiri?',
    answer: 'Tentu saja boleh! Anda bebas membawa makeup artist, fotografer, atau crew Anda sendiri. Kami juga memiliki partner MUA yang bisa direkomendasikan jika Anda membutuhkan.',
  },
  {
    question: 'Apakah ada tempat parkir?',
    answer: 'Ya, tersedia area parkir gratis untuk mobil dan motor di sekitar studio kami.',
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar layanan studio kami.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-sage/30 data-[state=open]:shadow-card transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-display text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
