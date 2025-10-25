import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8 shadow-card">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 25, 2025</p>

          <div className="space-y-6 prose prose-slate max-w-none">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using DevOps Pilot ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground">
                DevOps Pilot is an AI-powered CI/CD monitoring and log analysis platform. The Service provides automated build monitoring, log analysis, error detection, and suggested fixes for software development teams.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Account Registration</h2>
              <p className="text-muted-foreground mb-3">
                To use the Service, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be at least 18 years old or have parental consent</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-3">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malware or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users' access to the Service</li>
                <li>Use the Service for illegal or fraudulent purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Subscription and Payment</h2>
              <p className="text-muted-foreground">
                Paid subscriptions are billed in advance on a monthly or annual basis. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
                <li>Provide current and accurate billing information</li>
                <li>Pay all fees associated with your subscription</li>
                <li>Accept automatic renewal unless cancelled</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Refunds are provided on a case-by-case basis within 30 days of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The Service and its original content, features, and functionality are owned by DevOps Pilot and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground mt-3">
                You retain ownership of any content you submit to the Service, but grant us a license to use, store, and process it to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Data and Privacy</h2>
              <p className="text-muted-foreground">
                Your use of the Service is subject to our Privacy Policy. We collect and use your data as described in the Privacy Policy. We do not access your source code, only build logs and CI/CD pipeline data that you explicitly share.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Service Availability</h2>
              <p className="text-muted-foreground">
                We strive to provide 99.9% uptime but do not guarantee uninterrupted access to the Service. We may modify, suspend, or discontinue any part of the Service with notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, DevOps Pilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Warranty Disclaimer</h2>
              <p className="text-muted-foreground">
                The Service is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the Service will be error-free or that suggested fixes will resolve all issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account immediately, without prior notice, for conduct that violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the State of California, United States, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">13. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">14. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, contact us at:
              </p>
              <p className="text-muted-foreground mt-3">
                Email: legal@devopspilot.com<br />
                Address: 123 Tech Street, San Francisco, CA 94105
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
