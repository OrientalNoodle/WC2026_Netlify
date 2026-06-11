import type { UserBet } from '../types'

const STORAGE_KEY = 'wc2026-user-bets'

export function loadBets(): Record<string, UserBet> {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {}
    }
    return JSON.parse(raw) as Record<string, UserBet>
  } catch {
    return {}
  }
}

export function saveBets(bets: Record<string, UserBet>) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bets))
  } catch {
    // ignore write errors
  }
}
