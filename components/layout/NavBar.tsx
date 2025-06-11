import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              INNO<span className="text-purple-400">BYTEX</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/projects"
                className="text-white/80 hover:text-white transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
