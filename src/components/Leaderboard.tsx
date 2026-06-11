import './Leaderboard.css'
import type { LeaderboardRow } from '../services/scoring'

interface Props {
  leaderboard: LeaderboardRow[]
}

export function Leaderboard({ leaderboard }: Props) {
  const sorted = [...leaderboard].sort((a, b) => b.penalty - a.penalty)

  return (
    <section className="leaderboard-panel">
      <h2>🏆 Bảng điểm</h2>
      <div className="leaderboard-grid">
        <div className="leaderboard-header">Trận</div>
        <div className="leaderboard-header">Kèo</div>
        <div className="leaderboard-header">Kết quả</div>
        <div className="leaderboard-header">Điểm</div>
        {sorted.map((row) => (
          <div className="leaderboard-row" key={row.matchId}>
            <div>{row.matchLabel}</div>
            <div>{row.team}</div>
            <div>{row.betStatus}</div>
            <div>{row.penalty}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
