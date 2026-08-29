import { auth, signIn, signOut } from "@/lib/auth";
import { User, LogOut, Coins, Briefcase, Clock } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Welcome</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in with Discord to view your character, credits and activity.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("discord");
            }}
            className="mt-8"
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865F2] py-3 text-sm font-semibold text-white transition hover:bg-[#4752C4]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
              </svg>
              Sign in with Discord
            </button>
          </form>
        </div>
      </div>
    );
  }

  const user = session.user as any;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-16 w-16 rounded-full border border-white/20"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <User className="h-8 w-8 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">
              {user.username || user.name}
            </h1>
            <p className="text-sm text-zinc-400">Discord ID: {user.discordId}</p>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>

      {/* Stats cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-zinc-400">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Credits</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">0</p>
          <p className="mt-1 text-xs text-zinc-500">Website balance</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-zinc-400">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm">Job</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">—</p>
          <p className="mt-1 text-xs text-zinc-500">Loaded from server</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Playtime</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">—</p>
          <p className="mt-1 text-xs text-zinc-500">From txAdmin</p>
        </div>
      </div>

      {/* Character info */}
      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Character</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Data is fetched from the server using your Discord ID.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-zinc-500">Character name</p>
            <p className="mt-1 font-medium text-white">—</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Last seen</p>
            <p className="mt-1 font-medium text-white">—</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-600">
          Connect the VPS API to populate this section automatically.
        </p>
      </div>
    </div>
  );
}
