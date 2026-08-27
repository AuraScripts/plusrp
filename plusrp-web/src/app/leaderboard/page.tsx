import { Trophy, Clock } from "lucide-react";

// Placeholder data – will be replaced by VPS API
const placeholder = [
  { rank: 1, name: "Player One", playtime: "342h 18m" },
  { rank: 2, name: "Player Two", playtime: "298h 45m" },
  { rank: 3, name: "Player Three", playtime: "267h 02m" },
  { rank: 4, name: "Player Four", playtime: "241h 33m" },
  { rank: 5, name: "Player Five", playtime: "219h 11m" },
];

export default function LeaderboardPage() {
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
            {placeholder.map((row) => (
              <tr key={row.rank} className="hover:bg-white/5 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {row.rank <= 3 ? (
                      <Trophy
                        className={`h-4 w-4 ${
                          row.rank === 1
                            ? "text-yellow-400"
                            : row.rank === 2
                            ? "text-zinc-300"
                            : "text-amber-700"
                        }`}
                      />
                    ) : (
                      <span className="w-4 text-center text-zinc-500">
                        {row.rank}
                      </span>
                    )}
                    <span className="font-medium text-white">#{row.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                <td className="px-6 py-4 text-right text-zinc-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" />
                    {row.playtime}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-600">
        Data comes from txAdmin playersDB.json via VPS API
      </p>
    </div>
  );
}
