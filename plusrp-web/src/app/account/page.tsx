import { auth, signIn, signOut } from "@/lib/auth";
import { getOrCreateUser } from "@/lib/db";
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
              Sign in with Discord
            </button>
          </form>
        </div>
      </div>
    );
  }

  const user = session.user as any;
  const discordId = user.discordId;

  // Create or get user from database + get credits
  let credits = 0;
  try {
    const dbUser = await getOrCreateUser(
      discordId,
      user.username || user.name,
      user.image
    );
    credits = dbUser.credits ?? 0;
  } catch (e) {
    console.error("DB error:", e);
  }

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
            <p className="text-sm text-zinc-400">Discord ID: {discordId}</p>
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

      {/* Stats */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-zinc-400">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Credits</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{credits}</p>
          <p className="mt-1 text-xs text-zinc-500">Website balance</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-zinc-400">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm">Job</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">—</p>
          <p className="mt-1 text-xs text-zinc-500">From server</p>
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

      {/* Character */}
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
      </div>
    </div>
  );
}
