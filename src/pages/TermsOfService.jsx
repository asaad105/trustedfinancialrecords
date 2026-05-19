import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <section className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Trusted Financial Records</p>
        <h1 className="font-heading text-4xl md:text-5xl mb-4">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Effective date: May 19, 2026</p>

        <div className="space-y-8 text-sm leading-7 text-foreground/90">
          <div>
            <h2 className="font-heading text-xl mb-2">1. Services</h2>
            <p>
              Trusted Financial Records provides bookkeeping, reporting, and consultation services for startups
              and small businesses. Scope, timeline, and deliverables are defined in client agreements.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">2. Client Responsibilities</h2>
            <p>
              You agree to provide accurate and timely records, approvals, and communications required for
              service performance. Delays or inaccuracies in provided data may affect results and timelines.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">3. Fees and Payment</h2>
            <p>
              Fees, billing cycles, and payment terms are specified in your service agreement.
              Late payments may result in service suspension until outstanding balances are settled.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">4. Confidentiality</h2>
            <p>
              Both parties will keep non-public business and financial information confidential,
              except where disclosure is legally required.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Trusted Financial Records is not liable for indirect,
              incidental, or consequential damages. Total liability is limited to fees paid for the services
              giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl mb-2">6. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Updates are effective when posted on this website.
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
