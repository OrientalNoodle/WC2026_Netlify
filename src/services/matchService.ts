import type { MatchData } from '../types'

const DEFAULT_MATCHES_URL = '/matches.json'

export async function fetchMatches(sourceUrl?: string): Promise<MatchData[]> {
  const url = sourceUrl ?? import.meta.env.VITE_MATCHES_URL ?? DEFAULT_MATCHES_URL
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu trận: ${response.status}`)
  }

  const data = (await response.json()) as MatchData[]
  return data
}
