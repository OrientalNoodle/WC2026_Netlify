import { MatchCard } from './MatchCard'
import type { MatchData, UserBet } from '../types'

interface Props {
  matches: MatchData[]
  bets: Record<string, UserBet>
  disabled: boolean
  onBet: (matchId: string, teamKey: 'home' | 'away' | null) => void
}

export function MatchList({ matches, bets, disabled, onBet }: Props) {
  return (
    <section className="matches-section">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          bet={bets[match.id]}
          disabled={disabled}
          onBet={onBet}
        />
      ))}
    </section>
  )
}
