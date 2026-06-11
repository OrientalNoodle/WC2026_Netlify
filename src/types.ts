export type MatchStage = 'group' | 'round_of_16' | 'quarter' | 'semi' | 'final'

export interface MatchData {
  id: string
  date: string
  time: string
  location: string
  homeTeam: string
  awayTeam: string
  stage: MatchStage
  handicap: string
  favorite: 'home' | 'away' | 'level'
  score?: {
    home: number
    away: number
  }
  isLocked: boolean
}

export interface UserBet {
  matchId: string
  team: 'home' | 'away'
  updatedAt: string
}
