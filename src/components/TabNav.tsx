import './TabNav.css'

interface TabItem {
  key: 'matches' | 'leaderboard' | 'rules'
  label: string
}

interface Props {
  active: TabItem['key']
  tabs: TabItem[]
  onChange: (key: TabItem['key']) => void
}

export function TabNav({ active, tabs, onChange }: Props) {
  return (
    <nav className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={active === tab.key ? 'tab-button active' : 'tab-button'}
          onClick={() => onChange(tab.key)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
