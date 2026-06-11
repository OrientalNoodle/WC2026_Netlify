import './Leaderboard.css'
import type { LeaderboardRow } from '../services/scoring'

interface Props {
  leaderboard: LeaderboardRow[]
}

export function Leaderboard({ leaderboard }: Props) {
  const sorted = [...leaderboard].sort((a, b) => b.penalty - a.penalty)
  const totalPenalty = sorted.reduce((sum, row) => sum + row.penalty, 0)

  return (
    <section className="leaderboard-panel">
      <h2>🏆 Bảng điểm</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Trận</th>
            <th>Kèo</th>
            <th>Kết quả</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.matchId}>
              <td>{row.matchLabel}</td>
              <td>{row.team}</td>
              <td>{row.betStatus}</td>
              <td>{row.penalty}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Tổng điểm tất cả trận</td>
            <td>{totalPenalty}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}
