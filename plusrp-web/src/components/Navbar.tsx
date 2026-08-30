import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserCredits } from "@/lib/db";
import { Coins, Menu } from "lucide-react";
import MobileNav from "./MobileNav"; // we will keep it simple

const links = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/wiki", label: "Wiki" },
  { href: "/account", label: "Account" },
];

export default async function Navbar() {
  const session = await auth();
  let credits = 0;

  if (session?.user) {
    const discordId = (session.user as any).discordId;
    if (discordId) {
      try {
        credits = await getUserCredits(discordId);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">
            PLUS<span className="text-zinc-400">RP</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span>{credits} Credits</span>
          </div>
        </div>
      </div>
    </header>
  );
}
