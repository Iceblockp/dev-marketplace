import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function AdminNavbar() {
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Dev<span className="text-purple-400">Projects</span>{" "}
            <span className="text-sm text-purple-300">Admin</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="outline"
                className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
              >
                View Site
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
