import { Coins, ShoppingCart } from "lucide-react";

const creditPackages = [
  { id: 1, credits: 100, price: "5.00", popular: false },
  { id: 2, credits: 250, price: "10.00", popular: false },
  { id: 3, credits: 500, price: "18.00", popular: true },
  { id: 4, credits: 1000, price: "30.00", popular: false },
  { id: 5, credits: 2500, price: "65.00", popular: false },
  { id: 6, credits: 5000, price: "120.00", popular: false },
];

export default function StorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Store</h1>
        <p className="mt-3 text-zinc-400">
          Buy Credits and use them to purchase cars, items and more on the website.
        </p>
      </div>

      {/* Credits packages */}
      <section className="mt-14">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
          <Coins className="h-5 w-5 text-yellow-400" />
          Buy Credits
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-xl border p-6 transition ${
                pkg.popular
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 right-4 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-black">
                  Popular
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{pkg.credits}</span>
                <span className="text-zinc-400">Credits</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">€{pkg.price}</p>
              <a
                href="https://plusrp.tebex.store"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                <ShoppingCart className="h-4 w-4" />
                Buy now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for in-store items */}
      <section className="mt-20">
        <h2 className="mb-2 text-xl font-semibold text-white">Spend Credits</h2>
        <p className="mb-6 text-sm text-zinc-400">
          After buying Credits you can redeem them here for cars, items and other packages.
          (Coming soon – packages will appear after you create them)
        </p>

        <div className="rounded-xl border border-dashed border-white/15 bg-white/5 py-16 text-center">
          <p className="text-zinc-500">No packages available yet</p>
          <p className="mt-1 text-sm text-zinc-600">
            Create packages in Tebex or add them manually later
          </p>
        </div>
      </section>
    </div>
  );
}
