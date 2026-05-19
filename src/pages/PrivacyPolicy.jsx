import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Trusted Financial Records</p>
        <h1 className="font-heading text-4xl md:text-5xl mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Effective date: May 19, 2026</p>

        <div className="space-y-8 text-sm leading-7 text-foreground/90">
          <div>
            <h2 className="font-heading text-xl mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as your name, business name, email,
              phone number, and financial records you share when requesting bookkeeping or consultation services.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">2. How We Use Information</h2>
            <p>
              We use your information to deliver services, schedule consultations, communicate with you,
              issue invoices, improve our operations, and comply with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">3. Sharing of Information</h2>
            <p>
              We do not sell personal information. We may share information with trusted service providers
              (such as cloud storage, payment, and scheduling tools) only as needed to operate our business,
              subject to appropriate confidentiality and security measures.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">4. Data Security & Retention</h2>
            <p>
              We use administrative, technical, and physical safeguards designed to protect your information.
              We retain information only for as long as needed for service delivery, legal, tax, and accounting requirements.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">5. Your Choices</h2>
            <p>
              You can request access, correction, or deletion of your personal data by contacting us.
              Certain data may be retained where required by law or legitimate business needs.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">6. Contact</h2>
            <p>
              Questions about this policy can be sent to{' '}
              <a className="text-accent underline" href="mailto:info@trustedfinr.com">info@trustedfinr.com</a>.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-sm text-accent underline">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
