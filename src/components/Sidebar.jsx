import React, { useState } from 'react'
import { CASES } from '../data/cases'
import styles from './Sidebar.module.css'

const FILTERS = [
  { label: 'All Courts', value: 'all' },
  { label: 'Supreme', value: 'supreme' },
  { label: 'High Courts', value: 'high' },
  { label: 'District', value: 'district' },
]

export default function Sidebar({ activeCase, onSelectCase }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = CASES.filter((c) => {
    const matchesFilter = filter === 'all' || c.type === filter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.court.toLowerCase().includes(q) ||
      c.section.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTitle}>Case Library</div>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search cases, sections, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterChip} ${filter === f.value ? styles.active : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.casesList}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No cases found</div>
        ) : (
          filtered.map((c) => (
            <CaseCard
              key={c.id}
              caseData={c}
              isActive={activeCase?.id === c.id}
              onClick={() => onSelectCase(c)}
            />
          ))
        )}
      </div>
    </aside>
  )
}

function CaseCard({ caseData: c, isActive, onClick }) {
  return (
    <div
      className={`${styles.caseCard} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.caseTop}>
        <div className={styles.caseName}>{c.name}</div>
        <span className={`${styles.langBadge} ${styles[`lang_${c.lang}`]}`}>
          {c.langLabel}
        </span>
      </div>
      <div className={styles.caseMeta}>
        {c.court} · {c.year} · {c.section}
      </div>
      <div className={styles.caseTags}>
        {c.tags.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
      <div className={styles.relevanceBar}>
        <span className={styles.relevanceLabel}>Relevance</span>
        <div className={styles.relevanceTrack}>
          <div
            className={styles.relevanceFill}
            style={{ width: `${c.relevance}%` }}
          />
        </div>
        <span className={styles.relevancePct}>{c.relevance}%</span>
      </div>
    </div>
  )
}
