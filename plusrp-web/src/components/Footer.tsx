import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              PLUS<span className="text-zinc-400">RP</span>
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              High quality Lithuanian FiveM roleplay experience.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/store" className="hover:text-white transition">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white transition">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/wiki" className="hover:text-white transition">
                  Wiki
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <a
                  href="https://discord.gg/your-invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://plusrp.tebex.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Tebex Store
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} PLUS RP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
