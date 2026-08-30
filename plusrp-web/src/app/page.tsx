import Link from "next/link";
import { Users, Clock, ShoppingBag, BookOpen } from "lucide-react";

async function getStats() {
  const API_URL = "http://185.80.130.45:3002";
  const API_KEY = "plusrp_secret_key_change_me_123";

  try {
    const [registeredRes, playtimeRes] = await Promise.all([
      fetch(`${API_URL}/stats/registered`, {
        headers: { "x-api-key": API_KEY },
        next: { revalidate: 60 }, // cache 60 seconds
      }),
      fetch(`${API_URL}/stats/top-playtime`, {
        headers: { "x-api-key": API_KEY },
        next: { revalidate: 60 },
      }),
    ]);

    const registered = registeredRes.ok ? await registeredRes.json() : { count: 0 };
    const topPlaytime = playtimeRes.ok ? await playtimeRes.json() : { playtime: 0 };

    // Convert seconds to hours
    const hours = Math.floor((topPlaytime.playtime || 0) / 3600);

    return {
      registered: registered.count || 0,
      topPlaytime: hours > 0 ? `${hours}h` : "—",
    };
  } catch (e) {
    console.error("Stats fetch error:", e);
    return { registered: 0, topPlaytime: "—" };
  }
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-black to-black" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400">
              Lithuanian FiveM Roleplay
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                PLUS RP
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              High quality roleplay, unique systems and an active community.
              Join us and create your story.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/account"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Connect Discord
              </Link>
              <Link
                href="/store"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open Store
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Online Players", value: "— / 128", icon: Users },
              { label: "Registered", value: stats.registered.toLocaleString(), icon: Users },
              { label: "Playtime Record", value: stats.topPlaytime, icon: Clock },
              { label: "Discord Members", value: "—", icon: Users },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <stat.icon className="mx-auto h-5 w-5 text-zinc-400" />
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">
          Everything you need
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
          Store, leaderboard, detailed wiki and personal account — all in one place.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Store",
              desc: "Buy Credits and spend them on cars, items and more. Instant delivery.",
              href: "/store",
              icon: ShoppingBag,
            },
            {
              title: "Leaderboard",
              desc: "See who has the most playtime on the server. Climb the ranks.",
              href: "/leaderboard",
              icon: Clock,
            },
            {
              title: "Wiki",
              desc: "First steps, jobs, phone, driving school, inventory items and more.",
              href: "/wiki",
              icon: BookOpen,
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <card.icon className="h-8 w-8 text-zinc-400 group-hover:text-white transition" />
              <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
