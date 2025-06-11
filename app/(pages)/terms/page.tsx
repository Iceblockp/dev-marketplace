"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="pt-20 py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70">Last updated: January 2024</p>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Acceptance of Terms
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  By accessing and using DevProjects services, you agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, please do not use our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Use of Services
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  Our services are intended for legitimate business and personal
                  use. You agree to use our services only for lawful purposes
                  and in accordance with these terms.
                </p>
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Use our services for any illegal or unauthorized purpose
                  </li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Distribute malware or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Intellectual Property
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  Upon purchase of a project, you receive a license to use,
                  modify, and distribute the source code for your own purposes.
                  However, you may not resell or redistribute the original
                  source code as-is.
                </p>
                <p>
                  All content, trademarks, and intellectual property on our
                  website remain the property of DevProjects unless otherwise
                  specified.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Payment and Refunds
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  All payments are processed securely through third-party
                  payment providers. We offer a 7-day money-back guarantee for
                  all purchases.
                </p>
                <p>
                  Refund requests must be submitted within 7 days of purchase
                  and include a valid reason for the refund request.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Support and Warranties
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  We provide 30 days of setup support for all purchased
                  projects. This includes assistance with deployment,
                  configuration, and basic customization.
                </p>
                <p>
                  Our projects are provided &apos;as-is&apos; without warranty
                  of any kind. We make no guarantees about the suitability of
                  our projects for your specific needs.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Limitation of Liability
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  In no event shall DevProjects be liable for any indirect,
                  incidental, special, consequential, or punitive damages
                  arising out of your use of our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Changes to Terms
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  We reserve the right to modify these terms at any time. We
                  will notify users of significant changes via email or through
                  our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Contact Information
              </h2>
              <div className="text-white/80">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us at{" "}
                  <a
                    href="mailto:legal@devprojects.com"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    legal@devprojects.com
                  </a>
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
