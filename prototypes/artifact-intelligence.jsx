/*
---
id: "proto-artifact-intelligence"
type: prototype
title: "Artifact Intelligence"
status: active
owner: ux-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  related: [dp07]
tags: [prototype]
---
*/

import { useState, useEffect } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const DEMO_ARTIFACTS = [
  {
    id: "demo-receipt",
    filename: "kitchen_countertop_quote.pdf",
    fileType: "pdf",
    fileSize: "342 KB",
    thumbnailEmoji: "📄",
    stage: "review", // upload → processing → review → saved
    aiExtraction: {
      title: "Countertop Quote — GraniteWorks",
      summary: "Quote from GraniteWorks for kitchen countertop replacement. Calacatta quartz, L-shaped layout (96\" × 25.5\" main run + 48\" return). Includes demolition of existing laminate, templating, fabrication, and installation.",
      keyFacts: [
        { label: "Vendor", value: "GraniteWorks Inc.", type: "contact" },
        { label: "Material", value: "Calacatta quartz, 3cm thickness", type: "spec" },
        { label: "Main run", value: "96\" × 25.5\"", type: "measurement" },
        { label: "Return", value: "48\" × 25.5\"", type: "measurement" },
        { label: "Total sqft", value: "24.7 sq ft", type: "measurement" },
        { label: "Quote total", value: "$4,280 (materials + labor)", type: "cost" },
        { label: "Deposit", value: "$1,284 (30%) due at signing", type: "cost" },
        { label: "Lead time", value: "3-4 weeks from template", type: "timeline" },
        { label: "Valid until", value: "March 15, 2025", type: "timeline" },
      ],
      suggestedActions: [
        { action: "Save measurements to Condo → Kitchen info", confidence: 94 },
        { action: "Create task: Schedule countertop templating", confidence: 87 },
        { action: "Create task: Pay deposit $1,284 by March 15", confidence: 82 },
      ],
      suggestedLinks: {
        domains: [{ id: "d1", name: "Condo", icon: "🏠", confidence: 97 }],
        projects: [{ id: "p1", name: "Kitchen Renovation", icon: "🔨", confidence: 95 }],
        tasks: [{ id: "t1", name: "Get countertop quotes", icon: "☑", confidence: 91 }],
      },
      confidence: 94,
    },
  },
  {
    id: "demo-photo",
    filename: "IMG_2847.heic",
    fileType: "photo",
    fileSize: "4.2 MB",
    thumbnailEmoji: "🖼",
    stage: "review",
    aiExtraction: {
      title: "Bathroom Tile Samples — Showroom Visit",
      summary: "Photo of 4 tile samples at the showroom. Subway-style ceramic tiles in matte white, warm grey, sage green, and navy. Each tile approximately 3\" × 12\". Price tags visible.",
      keyFacts: [
        { label: "White matte", value: "$4.50/sq ft — \"Arctic Matte\" by Daltile", type: "spec" },
        { label: "Warm grey", value: "$5.20/sq ft — \"Fog\" by Bedrosians", type: "spec" },
        { label: "Sage green", value: "$6.80/sq ft — \"Fern\" by Clé Tile", type: "spec" },
        { label: "Navy", value: "$7.40/sq ft — \"Midnight\" by Fireclay", type: "spec" },
        { label: "Tile size", value: "3\" × 12\" subway", type: "measurement" },
        { label: "Showroom", value: "TileBar SF — 220 Potrero Ave", type: "contact" },
      ],
      suggestedActions: [
        { action: "Save tile options to Condo → Bathroom info", confidence: 88 },
        { action: "Create task: Decide on bathroom tile color", confidence: 79 },
      ],
      suggestedLinks: {
        domains: [{ id: "d1", name: "Condo", icon: "🏠", confidence: 95 }],
        projects: [{ id: "p2", name: "Bathroom Retile", icon: "🪣", confidence: 92 }],
        tasks: [],
      },
      confidence: 88,
    },
  },
  {
    id: "demo-voice",
    filename: "Voice Note — Feb 6, 3:42 PM",
    fileType: "voice",
    fileSize: "1.1 MB (47s)",
    thumbnailEmoji: "🎤",
    stage: "review",
    aiExtraction: {
      title: "Contractor Call Notes — Mike @ BuildRight",
      summary: "Notes from phone call with Mike about kitchen renovation timeline. Cabinets will arrive March 12. Demolition can start March 14 — needs 2 days. Plumbing rough-in scheduled for March 17. Mike needs decision on cabinet hardware by end of week.",
      keyFacts: [
        { label: "Cabinet delivery", value: "March 12, 2025", type: "timeline" },
        { label: "Demolition start", value: "March 14 (2 days)", type: "timeline" },
        { label: "Plumbing rough-in", value: "March 17", type: "timeline" },
        { label: "Decision needed", value: "Cabinet hardware — by Feb 8", type: "action" },
        { label: "Mike's cell", value: "(415) 555-0198", type: "contact" },
      ],
      suggestedActions: [
        { action: "Create task: Choose cabinet hardware (due Feb 8)", confidence: 95 },
        { action: "Update project timeline: Kitchen Renovation", confidence: 88 },
        { action: "Save Mike's number to Condo → Contacts", confidence: 76 },
      ],
      suggestedLinks: {
        domains: [{ id: "d1", name: "Condo", icon: "🏠", confidence: 96 }],
        projects: [{ id: "p1", name: "Kitchen Renovation", icon: "🔨", confidence: 97 }],
        tasks: [
          { id: "t2", name: "Schedule contractor walkthrough", icon: "☑", confidence: 72 },
          { id: "t3", name: "Finalize cabinet selection", icon: "☐", confidence: 84 },
        ],
      },
      confidence: 91,
    },
  },
  {
    id: "demo-doc",
    filename: "HOA_Rules_Renovation_Section.pdf",
    fileType: "pdf",
    fileSize: "890 KB",
    thumbnailEmoji: "📄",
    stage: "review",
    aiExtraction: {
      title: "HOA Renovation Rules — Key Requirements",
      summary: "Excerpt from HOA bylaws covering renovation guidelines. Requires: written approval from board (30-day notice), licensed & insured contractors only, work hours Mon–Fri 9am–5pm and Sat 10am–4pm, no work Sundays. Noise restrictions apply. Must use building-approved dumpster service. Deposit of $2,000 required before work begins.",
      keyFacts: [
        { label: "Board approval", value: "30-day written notice required", type: "timeline" },
        { label: "Work hours (weekday)", value: "Mon–Fri 9:00 AM – 5:00 PM", type: "spec" },
        { label: "Work hours (Sat)", value: "10:00 AM – 4:00 PM", type: "spec" },
        { label: "Sunday work", value: "Not permitted", type: "spec" },
        { label: "Contractor req", value: "Licensed & insured, proof required", type: "spec" },
        { label: "Dumpster", value: "Must use WasteCo — contact HOA office", type: "spec" },
        { label: "Deposit", value: "$2,000 refundable renovation deposit", type: "cost" },
        { label: "HOA contact", value: "Lisa K. — hoa@123main.com", type: "contact" },
      ],
      suggestedActions: [
        { action: "Create task: Submit HOA renovation approval (30 days before work)", confidence: 93 },
        { action: "Create task: Get contractor insurance certificate for HOA", confidence: 89 },
        { action: "Save work hours to Condo → Key Info", confidence: 85 },
        { action: "Create task: Pay HOA renovation deposit $2,000", confidence: 81 },
      ],
      suggestedLinks: {
        domains: [{ id: "d1", name: "Condo", icon: "🏠", confidence: 98 }],
        projects: [
          { id: "p1", name: "Kitchen Renovation", icon: "🔨", confidence: 90 },
          { id: "p2", name: "Bathroom Retile", icon: "🪣", confidence: 85 },
        ],
        tasks: [],
      },
      confidence: 92,
    },
  },
];

const ALL_DOMAINS = [
  { id: "d1", name: "Condo", icon: "🏠" },
  { id: "d2", name: "Career", icon: "💼" },
  { id: "d3", name: "Health", icon: "❤️" },
  { id: "d4", name: "Finances", icon: "💰" },
];

const ALL_PROJECTS = [
  { id: "p1", name: "Kitchen Renovation", icon: "🔨", domainId: "d1" },
  { id: "p2", name: "Bathroom Retile", icon: "🪣", domainId: "d1" },
  { id: "p3", name: "Q1 Launch", icon: "🚀", domainId: "d2" },
];

const TYPE_META = {
  pdf:   { icon: "📄", color: "#D94A6B", label: "PDF" },
  photo: { icon: "🖼", color: "#5BBD72", label: "Photo" },
  voice: { icon: "🎤", color: "#7A5AF5", label: "Voice" },
  doc:   { icon: "📝", color: "#4A9BD9", label: "Document" },
  note:  { icon: "📌", color: "#E8B931", label: "Note" },
};

const FACT_COLORS = {
  measurement: "#4A9BD9",
  cost: "#5BBD72",
  timeline: "#E8B931",
  contact: "#D94A6B",
  spec: "#7A5AF5",
  action: "#E8B931",
};

// ─── Components ──────────────────────────────────────────────────────────────

function ConfidenceDot({ value }) {
  const color = value >= 90 ? "#5BBD72" : value >= 75 ? "#E8B931" : "#D97A4A";
  return (
    <span style={{ fontSize: 10, color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
      {value}%
    </span>
  );
}

function UploadZone({ onSelect }) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{
        border: "2px dashed #2A2D35", borderRadius: 16, padding: "40px 20px",
        textAlign: "center", cursor: "pointer", transition: "all 0.2s",
        background: "#1A1D2308",
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#E8B93144"; e.currentTarget.style.background = "#E8B93106"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A2D35"; e.currentTarget.style.background = "#1A1D2308"; }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>📎</div>
        <div style={{ fontSize: 14, color: "#8A9AAA", fontWeight: 500, marginBottom: 6 }}>Drop anything here</div>
        <div style={{ fontSize: 12, color: "#4A5A6A", lineHeight: 1.5 }}>
          Photos · Documents · PDFs · Voice notes · Screenshots
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          {["📷 Camera", "🎤 Voice", "📁 Files"].map(label => (
            <button key={label} style={{
              background: "#22252B", border: "1px solid #2A2D35", borderRadius: 10,
              padding: "8px 16px", color: "#8A9AAA", fontSize: 12, cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2A2D35"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#22252B"; }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Demo artifact selector */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
          Demo — Tap to simulate upload
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {DEMO_ARTIFACTS.map(a => {
            const meta = TYPE_META[a.fileType];
            return (
              <button key={a.id} onClick={() => onSelect(a)} style={{
                background: "#1A1D23", border: "1px solid #22252B", borderRadius: 12,
                padding: "14px 16px", cursor: "pointer", fontFamily: "inherit",
                textAlign: "left", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = meta.color + "44"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#22252B"; }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{a.thumbnailEmoji}</div>
                <div style={{ fontSize: 12, color: "#E8E6E1", fontWeight: 500, marginBottom: 2, lineHeight: 1.3 }}>{a.filename}</div>
                <div style={{ fontSize: 10, color: meta.color }}>{meta.label} · {a.fileSize}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProcessingView({ artifact }) {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots(d => d >= 3 ? 1 : d + 1), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 20, animation: "pulse 1.5s ease-in-out infinite" }}>🧠</div>
      <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }`}</style>
      <div style={{ fontSize: 16, color: "#E8E6E1", fontWeight: 600, marginBottom: 8 }}>
        Analyzing{".".repeat(dots)}
      </div>
      <div style={{ fontSize: 13, color: "#5A6A7A", marginBottom: 24 }}>
        {artifact.filename}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280, margin: "0 auto", textAlign: "left" }}>
        {["Extracting content", "Identifying key facts", "Finding connections", "Generating summary"].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i < 2 ? "#5BBD72" : i === 2 ? "#E8B931" : "#2A2D35",
            }} />
            <span style={{ fontSize: 12, color: i <= 2 ? "#8A9AAA" : "#3A4A5A" }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtractionReview({ artifact, onSave, onBack }) {
  const ex = artifact.aiExtraction;
  const meta = TYPE_META[artifact.fileType];
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(ex.title);
  const [editingSummary, setEditingSummary] = useState(false);
  const [summary, setSummary] = useState(ex.summary);
  const [facts, setFacts] = useState(ex.keyFacts.map(f => ({ ...f, accepted: true })));
  const [actions, setActions] = useState(ex.suggestedActions.map(a => ({ ...a, accepted: true })));
  const [links, setLinks] = useState({
    domains: ex.suggestedLinks.domains.map(d => ({ ...d, accepted: true })),
    projects: ex.suggestedLinks.projects.map(p => ({ ...p, accepted: true })),
    tasks: ex.suggestedLinks.tasks.map(t => ({ ...t, accepted: true })),
  });
  const [showAddLink, setShowAddLink] = useState(null);
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <div style={{ fontSize: 18, color: "#5BBD72", fontWeight: 600, marginBottom: 8 }}>Saved & Linked</div>
        <div style={{ fontSize: 13, color: "#6A7A8A", lineHeight: 1.6, maxWidth: 320, margin: "0 auto 24px" }}>
          "{title}" has been saved and linked to {links.domains.filter(d => d.accepted).length} domain(s) and {links.projects.filter(p => p.accepted).length} project(s). 
          {actions.filter(a => a.accepted).length > 0 && ` ${actions.filter(a => a.accepted).length} action(s) queued.`}
        </div>
        <button onClick={onBack} style={{
          background: "#22252B", border: "1px solid #2A2D35", borderRadius: 12,
          padding: "12px 28px", color: "#E8E6E1", fontSize: 13, cursor: "pointer",
          fontFamily: "inherit", fontWeight: 500,
        }}>← Upload another</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#5A6A7A", cursor: "pointer", fontSize: 12, fontFamily: "inherit", padding: 0 }}>← Back</button>
        <span style={{ color: "#2A2D35" }}>·</span>
        <span style={{ fontSize: 10, color: meta.color, background: `${meta.color}15`, padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>{meta.label}</span>
        <span style={{ fontSize: 10, color: "#3A4A5A" }}>{artifact.fileSize}</span>
      </div>

      {/* File preview strip */}
      <div style={{
        background: `${meta.color}08`, border: `1px solid ${meta.color}22`,
        borderRadius: 12, padding: "14px 16px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ fontSize: 28, width: 48, height: 48, background: `${meta.color}15`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {artifact.thumbnailEmoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: "#5A6A7A", marginBottom: 2 }}>{artifact.filename}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "#4A5A6A" }}>AI Confidence:</span>
            <ConfidenceDot value={ex.confidence} />
          </div>
        </div>
        <button style={{ background: "#22252B", border: "1px solid #2A2D35", borderRadius: 8, padding: "6px 12px", color: "#8A9AAA", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>View</button>
      </div>

      {/* Title — editable */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Title</span>
          <button onClick={() => setEditingTitle(!editingTitle)} style={{ background: "none", border: "none", color: "#E8B931", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
            {editingTitle ? "Done" : "Edit"}
          </button>
        </div>
        {editingTitle ? (
          <input value={title} onChange={e => setTitle(e.target.value)} autoFocus style={{
            width: "100%", background: "#1A1D23", border: "1px solid #E8B93133",
            borderRadius: 10, padding: "10px 14px", color: "#E8E6E1", fontSize: 15,
            fontWeight: 600, fontFamily: "inherit", boxSizing: "border-box",
          }} />
        ) : (
          <div style={{ fontSize: 15, fontWeight: 600, color: "#E8E6E1", lineHeight: 1.4 }}>{title}</div>
        )}
      </div>

      {/* Summary — editable */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>AI Summary</span>
          <button onClick={() => setEditingSummary(!editingSummary)} style={{ background: "none", border: "none", color: "#E8B931", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
            {editingSummary ? "Done" : "Edit"}
          </button>
        </div>
        {editingSummary ? (
          <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4} style={{
            width: "100%", background: "#1A1D23", border: "1px solid #E8B93133",
            borderRadius: 10, padding: "10px 14px", color: "#B8B6B1", fontSize: 13,
            fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.6, resize: "vertical",
          }} />
        ) : (
          <div style={{ fontSize: 13, color: "#8A9AAA", lineHeight: 1.6, background: "#1A1D23", borderRadius: 10, padding: "12px 16px", border: "1px solid #22252B" }}>
            {summary}
          </div>
        )}
      </div>

      {/* Extracted Facts */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
          Extracted Facts ({facts.filter(f => f.accepted).length}/{facts.length})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {facts.map((fact, i) => {
            const color = FACT_COLORS[fact.type] || "#5A6A7A";
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                background: fact.accepted ? "#1A1D23" : "#1A1D2366",
                borderRadius: 8, border: "1px solid #22252B",
                opacity: fact.accepted ? 1 : 0.45,
                transition: "all 0.2s",
              }}>
                <button
                  onClick={() => { const n = [...facts]; n[i] = { ...n[i], accepted: !n[i].accepted }; setFacts(n); }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, lineHeight: 1 }}
                >
                  {fact.accepted ? "✓" : "○"}
                </button>
                <span style={{ fontSize: 9, color, background: `${color}15`, padding: "2px 7px", borderRadius: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>
                  {fact.type}
                </span>
                <span style={{ fontSize: 12, color: "#6A7A8A", flexShrink: 0, minWidth: 80 }}>{fact.label}</span>
                <span style={{ fontSize: 12, color: "#E8E6E1", flex: 1, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{fact.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Links — many-to-many */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
          Linked To
        </div>
        <div style={{ background: "#1A1D23", borderRadius: 12, border: "1px solid #22252B", padding: "14px 16px" }}>
          {/* Domains */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "#5A6A7A", marginBottom: 6, fontWeight: 500 }}>Domains</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {links.domains.map((d, i) => (
                <button key={d.id} onClick={() => {
                  const n = { ...links, domains: links.domains.map((x, j) => j === i ? { ...x, accepted: !x.accepted } : x) };
                  setLinks(n);
                }} style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
                  background: d.accepted ? "#5BBD7215" : "#22252B",
                  border: `1px solid ${d.accepted ? "#5BBD7233" : "#2A2D35"}`,
                  borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 13 }}>{d.icon}</span>
                  <span style={{ fontSize: 12, color: d.accepted ? "#E8E6E1" : "#5A6A7A" }}>{d.name}</span>
                  <ConfidenceDot value={d.confidence} />
                </button>
              ))}
              <button onClick={() => setShowAddLink(showAddLink === "domain" ? null : "domain")} style={{
                background: "transparent", border: "1px dashed #2A2D35", borderRadius: 8,
                padding: "5px 12px", color: "#4A5A6A", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              }}>+ Add</button>
            </div>
            {showAddLink === "domain" && (
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {ALL_DOMAINS.filter(d => !links.domains.some(l => l.id === d.id)).map(d => (
                  <button key={d.id} onClick={() => {
                    setLinks({ ...links, domains: [...links.domains, { ...d, confidence: 100, accepted: true }] });
                    setShowAddLink(null);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "4px 10px",
                    background: "#22252B", border: "1px solid #2A2D35", borderRadius: 6,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    <span style={{ fontSize: 12 }}>{d.icon}</span>
                    <span style={{ fontSize: 11, color: "#8A9AAA" }}>{d.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Projects */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "#5A6A7A", marginBottom: 6, fontWeight: 500 }}>Projects</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {links.projects.map((p, i) => (
                <button key={p.id} onClick={() => {
                  const n = { ...links, projects: links.projects.map((x, j) => j === i ? { ...x, accepted: !x.accepted } : x) };
                  setLinks(n);
                }} style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
                  background: p.accepted ? "#E8B93115" : "#22252B",
                  border: `1px solid ${p.accepted ? "#E8B93133" : "#2A2D35"}`,
                  borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 13 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, color: p.accepted ? "#E8E6E1" : "#5A6A7A" }}>{p.name}</span>
                  <ConfidenceDot value={p.confidence} />
                </button>
              ))}
              <button onClick={() => setShowAddLink(showAddLink === "project" ? null : "project")} style={{
                background: "transparent", border: "1px dashed #2A2D35", borderRadius: 8,
                padding: "5px 12px", color: "#4A5A6A", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              }}>+ Add</button>
            </div>
            {showAddLink === "project" && (
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {ALL_PROJECTS.filter(p => !links.projects.some(l => l.id === p.id)).map(p => (
                  <button key={p.id} onClick={() => {
                    setLinks({ ...links, projects: [...links.projects, { ...p, confidence: 100, accepted: true }] });
                    setShowAddLink(null);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "4px 10px",
                    background: "#22252B", border: "1px solid #2A2D35", borderRadius: 6,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    <span style={{ fontSize: 12 }}>{p.icon}</span>
                    <span style={{ fontSize: 11, color: "#8A9AAA" }}>{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tasks */}
          {links.tasks.length > 0 && (
            <div>
              <div style={{ fontSize: 10, color: "#5A6A7A", marginBottom: 6, fontWeight: 500 }}>Tasks</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {links.tasks.map((t, i) => (
                  <button key={t.id} onClick={() => {
                    const n = { ...links, tasks: links.tasks.map((x, j) => j === i ? { ...x, accepted: !x.accepted } : x) };
                    setLinks(n);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
                    background: t.accepted ? "#4A9BD915" : "#22252B",
                    border: `1px solid ${t.accepted ? "#4A9BD933" : "#2A2D35"}`,
                    borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                  }}>
                    <span style={{ fontSize: 12 }}>{t.icon}</span>
                    <span style={{ fontSize: 12, color: t.accepted ? "#E8E6E1" : "#5A6A7A" }}>{t.name}</span>
                    <ConfidenceDot value={t.confidence} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Actions */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
          AI Suggested Actions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {actions.map((action, i) => (
            <button key={i} onClick={() => {
              const n = [...actions]; n[i] = { ...n[i], accepted: !n[i].accepted }; setActions(n);
            }} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              background: action.accepted ? "#E8B93108" : "#1A1D23",
              border: `1px solid ${action.accepted ? "#E8B93125" : "#22252B"}`,
              borderRadius: 10, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{action.accepted ? "⚡" : "○"}</span>
              <span style={{ fontSize: 12, color: action.accepted ? "#E8E6E1" : "#5A6A7A", flex: 1, lineHeight: 1.4 }}>
                {action.action}
              </span>
              <ConfidenceDot value={action.confidence} />
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button onClick={() => setSaved(true)} style={{
        width: "100%", background: "#E8B931", border: "none", borderRadius: 14,
        padding: "14px 20px", color: "#12141A", fontSize: 14, fontWeight: 700,
        cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
        letterSpacing: "-0.01em",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "#F0C843"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#E8B931"; }}
      >
        Save & Execute {actions.filter(a => a.accepted).length} Action{actions.filter(a => a.accepted).length !== 1 ? "s" : ""}
      </button>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#4A5A6A", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          Discard
        </button>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function ArtifactIntelligence() {
  const [selected, setSelected] = useState(null);
  const [stage, setStage] = useState("upload"); // upload | processing | review

  const handleSelect = (artifact) => {
    setSelected(artifact);
    setStage("processing");
    setTimeout(() => setStage("review"), 2200);
  };

  const handleBack = () => {
    setSelected(null);
    setStage("upload");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#12141A", fontFamily: "'DM Sans', sans-serif", color: "#E8E6E1" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "20px 20px 16px" }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>TaskCard</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          {stage === "upload" ? "Add Artifact" : stage === "processing" ? "Analyzing" : "Review Extraction"}
        </h1>
        <p style={{ fontSize: 13, color: "#5A6A7A", margin: 0, lineHeight: 1.5 }}>
          {stage === "upload"
            ? "Upload anything — AI extracts, summarizes, and links it for you."
            : stage === "processing"
            ? "AI is reading and understanding your file..."
            : "Review what AI found. Edit anything, accept or reject facts, and link to your domains."
          }
        </p>
      </div>

      {stage === "upload" && <UploadZone onSelect={handleSelect} />}
      {stage === "processing" && selected && <ProcessingView artifact={selected} />}
      {stage === "review" && selected && <ExtractionReview artifact={selected} onSave={() => {}} onBack={handleBack} />}
    </div>
  );
}
