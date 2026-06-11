import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { matches } from './data/matches'
import { RulesPanel } from './components/RulesPanel'
import { MatchCard } from './components/MatchCard'
import { Leaderboard } from './components/Leaderboard'
import { useAuth } from './services/firebase'
import { buildLeaderboard } from './services/scoring'
import { loadBets, saveBets } from './services/storage'
import type { MatchStage, UserBet } from './types'

const tabs: Array<{ key: 'matches' | 'leaderboard' | 'rules'; label: string }> = [
  { key: 'matches', label: 'Kèo & Trận' },
  { key: 'leaderboard', label: '🏆 Bảng điểm' },
  { key: 'rules', label: '📖 Luật chơi' }
]

function App() {
  const { user, signIn, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'matches' | 'leaderboard' | 'rules'>('matches')
  const [bets, setBets] = useState<Record<string, UserBet>>(() => loadBets())

  useEffect(() => {
    saveBets(bets)
  }, [bets])

  const leaderboard = useMemo(() => buildLeaderboard(bets, matches), [bets])

  const handleBet = (matchId: string, teamKey: 'home' | 'away' | null) => {
    setBets((prev) => {
      const current = prev[matchId]?.team
      if (teamKey === null) {
        const { [matchId]: removed, ...rest } = prev
        return rest
      }
      if (current === teamKey) {
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

      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'rules' && <RulesPanel />}

        {activeTab === 'leaderboard' && <Leaderboard leaderboard={leaderboard} />}

        {activeTab === 'matches' && (
          <section className="matches-section">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                bet={bets[match.id]}
                disabled={!user}
                onBet={handleBet}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
