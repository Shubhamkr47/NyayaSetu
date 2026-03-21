import React from 'react'
import styles from './StatsBar.module.css'

const STATS = [
  { icon: '🗄️', label: 'Indexed', value: '4,65,00,000 cases' },
  { icon: '🌐', label: 'Languages', value: '22' },
  { icon: '🏛️', label: 'Courts', value: '25+ systems' },
  { icon: '✅', label: 'Accuracy', value: '99.2%' },
  { icon: '⚡', label: 'Avg search', value: '1.8s' },
]

export default function StatsBar() {
  return (
    <div className={styles.statsBar}>
      {STATS.map((s) => (
        <div key={s.label} className={styles.stat}>
          {s.icon} {s.label}: <strong>{s.value}</strong>
        </div>
      ))}
    </div>
  )
}
