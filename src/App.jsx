import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SplitView from './components/SplitView'
import Chat from './components/Chat'
import StatsBar from './components/StatsBar'
import UploadPage from './components/UploadPage'
import { CASES } from './data/cases'
import styles from './App.module.css'

function AnalyticsPage() {
  const stats = [
    { label: 'Total Cases Indexed', value: '4,65,00,000', icon: '🗄️', color: '#0D1B3E' },
    { label: 'Languages Covered', value: '22', icon: '🌐', color: '#138808' },
    { label: 'Court Systems', value: '25+', icon: '🏛️', color: '#FF6B00' },
    { label: 'Avg Search Time', value: '1.8s', icon: '⚡', color: '#C89520' },
    { label: 'Citation Accuracy', value: '99.2%', icon: '✅', color: '#138808' },
    { label: 'Cases Added Today', value: '1,240', icon: '📥', color: '#1E3163' },
  ]
  return (
    <div style={{ padding: 32, width: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, marginBottom: 8, color: '#1A1208' }}>Platform Analytics</h2>
      <p style={{ color: '#6B6355', fontSize: 13, marginBottom: 28 }}>Live statistics across the NyayaSetu legal research platform</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#6B6355', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#6B6355', marginBottom: 16 }}>Cases by Language</div>
        {[
          { lang: 'Hindi', pct: 34, color: '#FF6B00' },
          { lang: 'English', pct: 28, color: '#0D1B3E' },
          { lang: 'Marathi', pct: 12, color: '#1E3163' },
          { lang: 'Tamil', pct: 10, color: '#C89520' },
          { lang: 'Telugu', pct: 8, color: '#138808' },
          { lang: 'Others (17 languages)', pct: 8, color: '#6B6355' },
        ].map((l) => (
          <div key={l.lang} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 100, fontSize: 13, color: '#1A1208' }}>{l.lang}</div>
            <div style={{ flex: 1, height: 8, background: '#FAF7F2', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${l.pct}%`, height: '100%', background: l.color, borderRadius: 4 }} />
            </div>
            <div style={{ width: 36, fontSize: 12, color: '#6B6355', textAlign: 'right' }}>{l.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Research')
  const [activeTab, setActiveTab] = useState('split')
  const [activeCase, setActiveCase] = useState(null)
  const [extraCases, setExtraCases] = useState([])

  const allCases = [...CASES, ...extraCases]

  function handleSelectCase(c) {
    setActiveCase(c)
    setActiveTab('split')
  }

  function handleLoadChatCase(c) {
    setActiveCase({
      id: 'chat-' + Date.now(),
      name: c.title,
      court: c.court,
      year: c.year,
      section: c.section,
      lang: 'en',
      langLabel: c.language,
      originalText: `Original text in ${c.language} — translation and full text available upon retrieval from the court database.`,
      issues: ['Full issue extraction available upon complete case retrieval'],
      sections: [c.section],
      reasoning: c.summary,
      verdict: 'Full verdict available upon complete case retrieval from the court database.',
      confidence: 88,
      tags: [],
      relevance: 88,
      type: 'high',
    })
    setActiveTab('split')
  }

  function handleCaseAdded(newCase) {
    setExtraCases((prev) => [newCase, ...prev])
  }

  const TABS = [
    { id: 'split', label: '📄 Split View' },
    { id: 'chat', label: '💬 Legal Chat' },
    { id: 'compare', label: '⚖️ Compare Cases' },
  ]

  if (activeNav === 'Upload Judgment') {
    return (
      <div className={styles.appShell}>
        <Header activeNav={activeNav} onNavChange={setActiveNav} />
        <div className={styles.body}>
          <main className={styles.main} style={{ overflowY: 'auto' }}>
            <UploadPage onCaseAdded={(c) => { handleCaseAdded(c); setActiveNav('Research'); setActiveCase(c); setActiveTab('split') }} />
          </main>
        </div>
      </div>
    )
  }

  if (activeNav === 'Analytics') {
    return (
      <div className={styles.appShell}>
        <Header activeNav={activeNav} onNavChange={setActiveNav} />
        <div className={styles.body}>
          <main className={styles.main}>
            <AnalyticsPage />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.appShell}>
      <Header activeNav={activeNav} onNavChange={setActiveNav} />
      <div className={styles.body}>
        <Sidebar activeCase={activeCase} onSelectCase={handleSelectCase} extraCases={extraCases} />
        <main className={styles.main}>
          <div className={styles.tabs}>
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`${styles.tabBtn} ${activeTab === t.id ? styles.active : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'split' && <SplitView activeCase={activeCase} />}
            {activeTab === 'chat' && <Chat onLoadCase={handleLoadChatCase} />}
            {activeTab === 'compare' && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>⚖️</div>
                <div className={styles.emptyTitle}>Compare Case Law</div>
                <div className={styles.emptyText}>
                  Select two or more cases from the library, then use this view to compare rulings, sections cited, and judicial reasoning side by side.
                </div>
                <button className={styles.emptyAction} onClick={() => setActiveTab('chat')}>
                  Ask AI to Compare ↗
                </button>
              </div>
            )}
          </div>
          <StatsBar />
        </main>
      </div>
    </div>
  )
}
