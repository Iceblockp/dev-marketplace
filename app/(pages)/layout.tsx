import NavBar from "@/components/layout/NavBar";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NavBar />
      {children}
      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                INNO<span className="text-purple-400">BYTEX</span>
              </div>
              <p className="text-white/60">
                Premium development solutions for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Projects</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link
                    href="/projects?category=ecommerce"
                    className="hover:text-white transition-colors"
                  >
                    E-Commerce
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects?category=saas"
                    className="hover:text-white transition-colors"
                  >
                    SaaS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects?category=mobile"
                    className="hover:text-white transition-colors"
                  >
                    Mobile Apps
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 DevProjects. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
