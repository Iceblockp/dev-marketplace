"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="pt-20 py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70">Last updated: January 2024</p>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Information We Collect
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, make a purchase, or contact us for
                  support.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Personal information (name, email address, phone number)
                  </li>
                  <li>
                    Payment information (processed securely through third-party
                    providers)
                  </li>
                  <li>Communication preferences</li>
                  <li>Support requests and correspondence</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                How We Use Your Information
              </h2>
              <div className="text-white/80 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Communicate about products, services, and events</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Information Sharing
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this policy.
                </p>
                <p>We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Service providers who assist in our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Data Security
              </h2>
              <div className="text-white/80 space-y-4">
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Rights
              </h2>
              <div className="text-white/80 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <div className="text-white/80">
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:privacy@devprojects.com"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    privacy@devprojects.com
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
