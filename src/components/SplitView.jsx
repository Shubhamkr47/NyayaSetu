import React from 'react'
import styles from './SplitView.module.css'

export default function SplitView({ activeCase }) {
  if (!activeCase) {
    return (
      <div className={styles.splitView}>
        <div className={`${styles.pane} ${styles.paneLeft}`}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📜</div>
            <div className={styles.emptyTitle}>Select a case</div>
            <div className={styles.emptyText}>
              Choose a judgment from the library to view the original text alongside the AI-structured summary.
            </div>
          </div>
        </div>
        <div className={styles.pane}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🤖</div>
            <div className={styles.emptyTitle}>Structured summary appears here</div>
            <div className={styles.emptyText}>
              AI extracts legal issues, applicable sections, judge's reasoning and verdict — all verified and translated to English.
            </div>
          </div>
        </div>
      </div>
    )
  }

  const c = activeCase

  return (
    <div className={styles.splitView}>
      {/* LEFT: Original */}
      <div className={`${styles.pane} ${styles.paneLeft}`}>
        <div className={styles.paneHeader}>
          <span className={styles.paneLabel}>Original Judgment</span>
          <div className={styles.paneActions}>
            <button className={styles.iconBtn} title="Copy">📋</button>
            <button className={styles.iconBtn} title="Download">⬇</button>
          </div>
        </div>
        <div className={styles.originalLabel}>🌐 {c.langLabel} · Original Text</div>
        <div className={styles.judgmentOriginal}>
          <div className={styles.jTitle}>{c.name}</div>
          {c.originalText.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      {/* RIGHT: Summary */}
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span className={styles.paneLabel}>AI Structured Summary</span>
          <div className={styles.paneActions}>
            <span className={styles.verified}>✅ Verified</span>
            <button className={styles.iconBtn} title="Export">📤</button>
          </div>
        </div>

        {/* Case Info */}
        <Section icon="📋" iconClass="iconBlue" title="Case Information">
          <div className={styles.infoCard}>
            <div className={styles.metaGrid}>
              <MetaItem label="Court" value={c.court} />
              <MetaItem label="Year" value={c.year} />
              <MetaItem label="Primary Section" value={c.section} />
              <MetaItem label="Source Language" value={c.langLabel} />
            </div>
          </div>
        </Section>

        {/* Legal Issues */}
        <Section icon="❓" iconClass="iconOrange" title="Legal Issues">
          <div className={styles.infoCard}>
            <ul className={styles.issueList}>
              {c.issues.map((iss, i) => (
                <li key={i}>
                  <span className={styles.issueNum}>{i + 1}</span>
                  {iss}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Sections Applied */}
        <Section icon="📖" iconClass="iconGold" title="Sections Applied">
          <div>
            {c.sections.map((s) => (
              <span key={s} className={styles.sectionTag}>§ {s}</span>
            ))}
          </div>
        </Section>

        {/* Reasoning */}
        <Section icon="🧠" iconClass="iconBlue" title="Judge's Reasoning">
          <div className={styles.infoCard} style={{ fontSize: '13px', lineHeight: 1.7 }}>
            {c.reasoning}
          </div>
        </Section>

        {/* Verdict */}
        <Section icon="⚖️" iconClass="iconGreen" title="Verdict & Order">
          <div className={styles.verdictBox}>
            <div className={styles.verdictLabel}>Final Order</div>
            <div className={styles.verdictText}>{c.verdict}</div>
            <div className={styles.confidenceRow}>
              <span className={styles.confLabel}>AI Confidence</span>
              <div className={styles.confTrack}>
                <div className={styles.confFill} style={{ width: `${c.confidence}%` }} />
              </div>
              <span className={styles.confPct}>{c.confidence}%</span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ icon, iconClass, title, children }) {
  return (
    <div className={styles.summarySection}>
      <div className={styles.sectionHead}>
        <div className={`${styles.sectionIcon} ${styles[iconClass]}`}>{icon}</div>
        <div className={styles.sectionTitle}>{title}</div>
      </div>
      {children}
    </div>
  )
}

function MetaItem({ label, value }) {
  return (
    <div className={styles.metaItem}>
      <label>{label}</label>
      <span>{value}</span>
    </div>
  )
}
