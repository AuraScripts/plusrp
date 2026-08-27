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

export default function WikiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Wiki</h1>
        <p className="mt-3 text-zinc-400">
          Everything you need to know about playing on PLUS RP
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <p className="mt-10 text-center text-sm text-zinc-600">
        Content pages can be added as Markdown or static React pages later.
      </p>
    </div>
  );
}
