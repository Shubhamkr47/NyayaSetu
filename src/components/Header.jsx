import React from 'react'
import styles from './Header.module.css'

export default function Header({ activeNav, onNavChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>⚖️</div>
        <div>
          <div className={styles.logoText}>NyayaSetu</div>
          <div className={styles.logoSub}>AI Legal Research · India</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {['Research', 'Upload Judgment', 'Analytics'].map((item) => (
          <button
            key={item}
            className={`${styles.navBtn} ${activeNav === item ? styles.active : ''}`}
            onClick={() => onNavChange(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className={styles.statusPill}>
        <span className={styles.statusDot} />
        AI Active · 4.65Cr cases indexed
      </div>
    </header>
  )
}
