import { Trophy, Clock } from "lucide-react";

async function getLeaderboard() {
  try {
    const res = await fetch(`${process.env.VPS_API_URL}/leaderboard`, {
      headers: {
        "x-api-key": process.env.VPS_API_KEY || "",
      },
      next: { revalidate: 60 }, // cache 60 seconds
    });

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function formatPlaytime(minutes: number) {
  if (!minutes || minutes <= 0) return "0h 0m";
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  return `${h}h ${m}m`;
}

export default async function LeaderboardPage() {
  const data = await getLeaderboard();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Playtime Leaderboard
        </h1>
        <p className="mt-3 text-zinc-400">
          Top players by total time spent on the server
        </p>
      </div>

      <div className="mt-12 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-4 font-medium text-zinc-400">Rank</th>
              <th className="px-6 py-4 font-medium text-zinc-400">Player</th>
              <th className="px-6 py-4 font-medium text-zinc-400 text-right">
                Playtime
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-zinc-500">
                  No data yet or API not connected
                </td>
              </tr>
            ) : (
              data.map((row: any, index: number) => (
                <tr key={index} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index < 3 ? (
                        <Trophy
                          className={`h-4 w-4 ${
                            index === 0
                              ? "text-yellow-400"
                              : index === 1
                              ? "text-zinc-300"
                              : "text-amber-700"
                          }`}
                        />
                      ) : (
                        <span className="w-4 text-center text-zinc-500">
                          {index + 1}
                        </span>
                      )}
                      <span className="font-medium text-white">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {row.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-right text-zinc-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      {formatPlaytime(row.playtime)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
