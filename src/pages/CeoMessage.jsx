import { useState } from 'react';
import ceoPhotoFallback from '@/assets/ceo-picture.png';

export default function CeoMessage() {
  const [photoSrc, setPhotoSrc] = useState('/ceo-picture.png');

  return (
    <main className="bg-background pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6 lg:px-12">
        <header className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Message from Our CEO</p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Leadership Built on Experience, Trust, and Financial Clarity
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A message from the Founder &amp; CEO of Trusted Financial Records.
          </p>
        </header>

        <div className="grid lg:grid-cols-[320px,1fr] gap-10 lg:gap-14 items-start mb-14">
          <aside className="bg-card border border-border rounded-2xl p-6 sticky top-28">
            <img
              src={photoSrc}
              alt="Asaad Ahmed, Founder and CEO of TrustedFinr"
              className="w-full rounded-xl border border-border object-cover aspect-square mb-5"
              onError={() => setPhotoSrc(ceoPhotoFallback)}
            />
            <h2 className="font-heading text-2xl text-foreground mb-3">CEO Intro</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Asaad is the Founder and CEO of Trusted Financial Records, bringing over two decades of experience in
              accounting, financial operations, and business support. His leadership is built on professionalism,
              integrity, and a commitment to helping individuals and businesses achieve long-term financial clarity
              and stability.
            </p>
          </aside>

          <article className="prose prose-zinc max-w-none prose-p:text-foreground/90 prose-p:leading-relaxed">
            <p>
              At TrustedFinr, we believe financial management should create clarity, stability, and confidence — not
              stress and uncertainty.
            </p>
            <p>
              With over two decades of experience across accounting, financial operations, revenue cycle management,
              and business support environments, I have worked closely with individuals, entrepreneurs, and
              organizations navigating the daily challenges of financial management, compliance, reporting, and
              operational efficiency.
            </p>
            <p>
              Throughout my career, I have seen how disorganized financial systems and inconsistent financial support
              can slow business growth and create unnecessary pressure for business owners. TrustedFinr was founded to
              solve that problem by delivering dependable, transparent, and professional financial support services
              built on accuracy, integrity, and long-term client relationships.
            </p>
            <p>
              At TrustedFinr, we understand that every client’s financial situation is unique. Our approach is centered
              on personalized support, responsive communication, and practical financial solutions that help clients
              stay organized, informed, and confident in their financial decisions.
            </p>
            <p>
              Over the past two decades, I have learned that trust is earned through consistency, accountability, and
              genuine commitment to client success. Those principles continue to guide every aspect of our company
              today.
            </p>
            <p>
              As we continue growing across Canada, our vision remains clear: to build one of the country’s most
              trusted modern financial support companies by combining professional expertise with exceptional client
              service.
            </p>
            <p>
              We are committed to helping individuals and businesses simplify financial management, strengthen
              operational stability, and focus on long-term growth with confidence.
            </p>
            <p>
              Thank you for placing your trust in TrustedFinr. We look forward to supporting your financial journey for
              years to come.
            </p>
            <p className="pt-4 font-medium">
              Asaad Ahmed
              <br />
              Founder &amp; CEO
              <br />
              TrustedFinr
            </p>
          </article>
        </div>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-7">
            <h3 className="font-heading text-2xl text-foreground mb-3">Company Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become one of Canada’s most trusted modern financial support companies by delivering reliable,
              transparent, and professional financial services that empower individuals and businesses to grow with
              confidence.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-7">
            <h3 className="font-heading text-2xl text-foreground mb-3">Company Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide accurate, dependable, and client-focused bookkeeping and financial support services that
              simplify financial management and support long-term business success.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
