import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { RulesPanel } from './components/RulesPanel'
import { MatchList } from './components/MatchList'
import { TabNav } from './components/TabNav'
import { Leaderboard } from './components/Leaderboard'
import { useAuth } from './services/firebase'
import { buildLeaderboard } from './services/scoring'
import { fetchMatches } from './services/matchService'
import { loadBets, saveBets } from './services/storage'
import type { MatchData, UserBet } from './types'

const tabs = [
  { key: 'matches', label: 'Kèo & Trận' },
  { key: 'leaderboard', label: '🏆 Bảng điểm' },
  { key: 'rules', label: '📖 Luật chơi' }
] as const

type TabKey = typeof tabs[number]['key']

function getTabFromHash(hash: string | null): TabKey {
  if (!hash) {
    return 'matches'
  }
  const normalized = hash.replace('#', '') as TabKey
  return tabs.some((tab) => tab.key === normalized) ? normalized : 'matches'
}

function App() {
  const { user, signIn, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>(() => getTabFromHash(window.location.hash))
  const [bets, setBets] = useState<Record<string, UserBet>>(() => loadBets())
  const [matches, setMatches] = useState<MatchData[]>([])
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [matchError, setMatchError] = useState<string | null>(null)

  useEffect(() => {
    saveBets(bets)
  }, [bets])

  useEffect(() => {
    fetchMatches()
      .then((data) => {
        setMatches(data)
      })
      .catch((error) => {
        setMatchError(error.message)
      })
      .finally(() => setLoadingMatches(false))
  }, [])

  useEffect(() => {
    const handleHashChange = () => setActiveTab(getTabFromHash(window.location.hash))
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (window.location.hash !== `#${activeTab}`) {
      window.history.replaceState(null, '', `#${activeTab}`)
    }
  }, [activeTab])

  const leaderboard = useMemo(() => buildLeaderboard(bets, matches), [bets, matches])

  const handleBet = (matchId: string, teamKey: 'home' | 'away' | null) => {
    setBets((prev) => {
      const current = prev[matchId]?.team
      if (teamKey === null || current === teamKey) {
        const { [matchId]: removed, ...rest } = prev
        return rest
      }
      return {
        ...prev,
        [matchId]: {
          matchId,
          team: teamKey,
          updatedAt: new Date().toISOString()
        }
      }
    })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <span className="title">⚽ WC2026 Kèo bạn bè</span>
          <p className="subtitle">Đăng nhập, bắt kèo châu Á, xem bảng điểm và so kèo bạn bè.</p>
        </div>
        <div className="auth-row">
          {user ? (
            <>
              <span className="user-chip">{user.displayName}</span>
              <button className="ghost-button" onClick={signOut}>Đăng xuất</button>
            </>
          ) : (
            <button className="primary-button" onClick={signIn}>Đăng nhập Google</button>
          )}
        </div>
      </header>

      <TabNav active={activeTab} tabs={tabs} onChange={setActiveTab} />

      <main className="main-content">
        {activeTab === 'rules' && <RulesPanel />}
        {activeTab === 'leaderboard' && <Leaderboard leaderboard={leaderboard} />}
        {activeTab === 'matches' && (
          <>
            {loadingMatches && <div className="message-box">Đang tải danh sách trận...</div>}
            {matchError && <div className="message-box error">Lỗi tải trận: {matchError}</div>}
            {!loadingMatches && !matchError && matches.length === 0 && (
              <div className="message-box">Không có trận nào để hiển thị.</div>
            )}
            {!loadingMatches && !matchError && matches.length > 0 && (
              <MatchList matches={matches} bets={bets} disabled={!user} onBet={handleBet} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
