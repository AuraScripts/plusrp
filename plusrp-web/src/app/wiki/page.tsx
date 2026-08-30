import Link from "next/link";
import {
  BookOpen,
  Map,
  Phone,
  Car,
  Briefcase,
  Package,
  GraduationCap,
  Play,
} from "lucide-react";

const keybinds = [
  { key: "F1", action: "Phone" },
  { key: "F2", action: "Inventory" },
  { key: "F3", action: "Emote Menu" },
  { key: "F5", action: "Radial Menu" },
  { key: "F6", action: "Job Menu" },
  { key: "T", action: "Chat" },
  { key: "X", action: "Hands Up" },
  { key: "B", action: "Point" },
  { key: "Left Alt", action: "Eye Target" },
  { key: "L", action: "Lock Vehicle" },
];

const sections = [
  {
    title: "Game Start – First Steps",
    description: "How to join, create a character and start playing.",
    href: "/wiki/first-steps",
    icon: Play,
  },
  {
    title: "How to Play",
    description: "Basic rules, controls and roleplay guidelines.",
    href: "/wiki/how-to-play",
    icon: BookOpen,
  },
  {
    title: "Phone",
    description: "How to use the in-game phone, apps and contacts.",
    href: "/wiki/phone",
    icon: Phone,
  },
  {
    title: "Driving School",
    description: "Get your license and learn the traffic rules.",
    href: "/wiki/driving-school",
    icon: GraduationCap,
  },
  {
    title: "Jobs",
    description: "All available jobs and how to start them.",
    href: "/wiki/jobs",
    icon: Briefcase,
  },
  {
    title: "Game Items (ox_inventory)",
    description: "Full list of items, their uses and how to obtain them.",
    href: "/wiki/items",
    icon: Package,
  },
  {
    title: "Game Map",
    description: "Important locations, jobs and points of interest.",
    href: "/wiki/map",
    icon: Map,
  },
  {
    title: "Vehicles",
    description: "Cars, bikes and how to buy / spawn them.",
    href: "/wiki/vehicles",
    icon: Car,
  },
];

function Key({
  label,
  width = 1,
  active = false,
}: {
  label: string;
  width?: number;
  active?: boolean;
}) {
  return (
    <div
      style={{ flex: width }}
      className={`flex h-11 items-center justify-center rounded-md border text-[11px] font-medium select-none
        ${
          active
            ? "border-white/50 bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            : "border-white/10 bg-zinc-900/80 text-zinc-500"
        }`}
    >
      {label}
    </div>
  );
}

export default function WikiPage() {
  const active = (key: string) =>
    keybinds.some((k) => k.key === key || (key === "Alt" && k.key === "Left Alt"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Wiki</h1>
        <p className="mt-3 text-zinc-400">
          Everything you need to know about playing on PLUS RP
        </p>
      </div>

      {/* Keyboard + Keybinds */}
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {/* Keyboard */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Keyboard
          </h2>

          <div className="mx-auto max-w-3xl space-y-1.5">
            {/* F-row */}
            <div className="flex gap-1.5">
              <Key label="Esc" width={1.2} />
              <div className="w-3" />
              {["F1","F2","F3","F4"].map(k => <Key key={k} label={k} active={active(k)} />)}
              <div className="w-3" />
              {["F5","F6","F7","F8"].map(k => <Key key={k} label={k} active={active(k)} />)}
              <div className="w-3" />
              {["F9","F10","F11","F12"].map(k => <Key key={k} label={k} active={active(k)} />)}
            </div>

            {/* Number row */}
            <div className="flex gap-1.5">
              {["`","1","2","3","4","5","6","7","8","9","0","-","="].map(k => (
                <Key key={k} label={k} active={active(k)} />
              ))}
              <Key label="Backspace" width={2} />
            </div>

            {/* Q row */}
            <div className="flex gap-1.5">
              <Key label="Tab" width={1.5} />
              {["Q","W","E","R","T","Y","U","I","O","P","[","]"].map(k => (
                <Key key={k} label={k} active={active(k)} />
              ))}
              <Key label="\\" width={1.5} />
            </div>

            {/* A row */}
            <div className="flex gap-1.5">
              <Key label="Caps" width={1.8} />
              {["A","S","D","F","G","H","J","K","L",";","'"].map(k => (
                <Key key={k} label={k} active={active(k)} />
              ))}
              <Key label="Enter" width={2.2} />
            </div>

            {/* Z row */}
            <div className="flex gap-1.5">
              <Key label="Shift" width={2.4} />
              {["Z","X","C","V","B","N","M",",",".","/"].map(k => (
                <Key key={k} label={k} active={active(k)} />
              ))}
              <Key label="Shift" width={2.4} />
            </div>

            {/* Bottom row */}
            <div className="flex gap-1.5">
              <Key label="Ctrl" width={1.5} />
              <Key label="Win" width={1.2} />
              <Key label="Alt" width={1.2} active={active("Alt")} />
              <Key label="Space" width={6.5} />
              <Key label="Alt" width={1.2} active={active("Alt")} />
              <Key label="Fn" width={1.2} />
              <Key label="Ctrl" width={1.5} />
            </div>
          </div>
        </div>

        {/* Keybind list */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Keybinds
          </h2>
          <ul className="space-y-3">
            {keybinds.map((bind) => (
              <li key={bind.key} className="flex items-center justify-between gap-3">
                <span className="min-w-[70px] rounded-md border border-white/20 bg-white px-2.5 py-1 text-center text-xs font-bold text-black">
                  {bind.key}
                </span>
                <span className="text-sm text-zinc-300">{bind.action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wiki sections */}
      <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-white">Guides</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <section.icon className="h-7 w-7 text-zinc-400 transition group-hover:text-white" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
