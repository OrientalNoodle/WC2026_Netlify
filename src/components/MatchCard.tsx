import './MatchCard.css'
import type { MatchData, UserBet } from '../types'

interface Props {
  match: MatchData
  bet?: UserBet
  disabled: boolean
  onBet: (matchId: string, teamKey: 'home' | 'away' | null) => void
}

export function MatchCard({ match, bet, disabled, onBet }: Props) {
  const pickedHome = bet?.team === 'home'
  const pickedAway = bet?.team === 'away'
  const now = new Date()
  const kickoff = new Date(`${match.date}T${match.time}:00`)
  const lockMoment = new Date(kickoff.getTime() - 30 * 60000)
  const matchLocked = match.isLocked || now >= lockMoment
  const minutesToKickoff = Math.max(0, Math.floor((lockMoment.getTime() - now.getTime()) / 60000))

  const buttonDisabled = disabled || matchLocked

  return (
    <article className={matchLocked ? 'match-card locked' : 'match-card'}>
      <div className="match-meta">
        <strong>{match.date} · {match.location}</strong>
        <span>{match.stage === 'group' ? 'Bảng' : 'Knockout'} · {match.time}</span>
      </div>
      <div className="match-teams">
        <button
          className={`team-button ${pickedHome ? 'selected' : ''}`}
          type="button"
          disabled={buttonDisabled}
          onClick={() => onBet(match.id, pickedHome ? null : 'home')}
        >
          {match.homeTeam}
        </button>
        <div className="handicap-copy">⚖️ {match.handicap}</div>
        <button
          className={`team-button ${pickedAway ? 'selected' : ''}`}
          type="button"
          disabled={disabled}
          onClick={() => onBet(match.id, pickedAway ? null : 'away')}
        >
          {match.awayTeam}
        </button>
      </div>
      <div className="match-footer">
        <span className="status-line">
          {matchLocked
            ? `⏳ Khóa lúc ${match.time}`
            : `⏳ Còn ${minutesToKickoff} phút trước giờ khóa`}
        </span>
        <button className="secondary-button" type="button">Kèo của mọi người</button>
      </div>
    </article>
  )
}
