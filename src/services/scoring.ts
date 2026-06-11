import type { MatchData, UserBet } from '../types'

const stagePenalty = {
  group: 2,
  round_of_16: 4,
  quarter: 8,
  semi: 8,
  final: 8
}

export interface LeaderboardRow {
  matchId: string
  matchLabel: string
  team: string
  penalty: number
  betStatus: 'win' | 'lose' | 'half-loss' | 'draw' | 'no-bet'
}

export function buildLeaderboard(bets: Record<string, UserBet>, matches: MatchData[]) {
  return matches.map((match) => {
    const bet = bets[match.id]
    const penalty = stagePenalty[match.stage]
    const status = calculateStatus(match, bet)
    const isNoBetLocked = !bet && match.isLocked

    return {
      matchId: match.id,
      matchLabel: `${match.homeTeam} vs ${match.awayTeam}`,
      team: bet ? (bet.team === 'home' ? match.homeTeam : match.awayTeam) : 'Chưa đặt',
      penalty: isNoBetLocked || status === 'lose' ? penalty : status === 'half-loss' ? penalty / 2 : 0,
      betStatus: isNoBetLocked ? 'no-bet' : status
    }
  })
}

export function calculateStatus(match: MatchData, bet?: UserBet) {
  if (!bet) {
    return 'no-bet'
  }
  const score = match.score
  if (!score) {
    return 'no-bet'
  }

  const teamScore = bet.team === 'home' ? score.home : score.away
  const opponentScore = bet.team === 'home' ? score.away : score.home
  const favoriteIsHome = match.favorite === 'home'
  const handicap = match.handicap

  if (match.handicap === 'Đồng banh') {
    if (teamScore > opponentScore) return 'win'
    if (teamScore === opponentScore) return 'draw'
    return 'lose'
  }

  if (match.handicap === 'Chấp nửa trái') {
    const diff = goalDiff(teamScore, opponentScore)
    const isFavoriteBet = bet.team === (favoriteIsHome ? 'home' : 'away')
    return evaluateQuarter(diff, isFavoriteBet)
  }

  if (match.handicap === 'Chấp 1 trái') {
    const diff = goalDiff(teamScore, opponentScore)
    const isFavoriteBet = bet.team === (favoriteIsHome ? 'home' : 'away')
    if (isFavoriteBet) {
      if (diff >= 2) return 'win'
      if (diff === 1) return 'draw'
      return 'lose'
    }
    if (diff > 0) return 'lose'
    return 'win'
  }

  return 'no-bet'
}

function goalDiff(teamScore: number, opponentScore: number) {
  return teamScore - opponentScore
}

function evaluateQuarter(diff: number, isFavoriteBet: boolean) {
  if (diff > 0) return isFavoriteBet ? 'win' : 'lose'
  if (diff === 0) return isFavoriteBet ? 'half-loss' : 'win'
  return isFavoriteBet ? 'lose' : 'lose'
}
