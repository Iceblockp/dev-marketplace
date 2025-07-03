"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";

type Props = {};

const NavBar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              INNO<span className="text-purple-400">BYTEX</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${isActive(item.href) ? "text-purple-400 font-semibold" : "text-white/80 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900/95 backdrop-blur-md border-white/10 text-white p-0 w-[280px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <Link href="/" className="text-2xl font-bold text-white" onClick={() => setIsOpen(false)}>
                      INNO<span className="text-purple-400">BYTEX</span>
                    </Link>
                    {/* <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-white">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose> */}
                  </div>
                  <div className="flex-1 overflow-auto py-6 px-4">
                    <div className="flex flex-col space-y-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-lg transition-colors ${isActive(item.href) ? "text-purple-400 font-semibold" : "text-white/80 hover:text-white"}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link href="/admin" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full mt-4"
                        >
                          Admin
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <div className="text-white/60 text-sm">
                      © 2024 INNOBYTEX. All rights reserved.
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
