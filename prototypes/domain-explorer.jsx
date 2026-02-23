/*
---
id: "proto-domain-explorer"
type: prototype
title: "Domain Explorer"
status: active
owner: ux-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  related: [dp07]
tags: [prototype]
---
*/

import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const DOMAINS = [
  { id: "d1", name: "Condo", icon: "🏠", color: "#5BBD72", description: "123 Main St, Unit 4B" },
  { id: "d2", name: "Career", icon: "💼", color: "#4A9BD9", description: "Product @ Acme Corp" },
  { id: "d3", name: "Health", icon: "❤️", color: "#D94A6B", description: "Fitness, medical, wellness" },
  { id: "d4", name: "Finances", icon: "💰", color: "#E8B931", description: "Banking, investments, budget" },
];

const CONDO_DATA = {
  quickRef: [
    { id: "q1", label: "Living Room", items: [
      { key: "Width", value: "14' 2\"" },
      { key: "Length", value: "18' 8\"" },
      { key: "Ceiling", value: "9' 4\"" },
      { key: "Windows", value: "3 × 48\" × 60\"" },
    ]},
    { id: "q2", label: "Kitchen", items: [
      { key: "Width", value: "11' 6\"" },
      { key: "Length", value: "13' 2\"" },
      { key: "Counter depth", value: "25.5\"" },
      { key: "Cabinet height", value: "34.5\"" },
      { key: "Backsplash area", value: "28 sq ft" },
    ]},
    { id: "q3", label: "Master Bedroom", items: [
      { key: "Width", value: "12' 0\"" },
      { key: "Length", value: "14' 4\"" },
      { key: "Closet", value: "6' × 3' walk-in" },
    ]},
    { id: "q4", label: "Contacts", items: [
      { key: "Building super", value: "Tony M. — 555-0142" },
      { key: "Contractor", value: "Mike @ BuildRight — 555-0198" },
      { key: "Plumber", value: "Dave's Plumbing — 555-0267" },
      { key: "HOA Manager", value: "Lisa K. — hoa@123main.com" },
      { key: "Insurance", value: "State Farm #CF-449201" },
    ]},
    { id: "q5", label: "Key Info", items: [
      { key: "Unit", value: "4B, 3rd floor" },
      { key: "Sqft", value: "1,180" },
      { key: "Purchased", value: "March 2021" },
      { key: "HOA monthly", value: "$485" },
      { key: "Parking", value: "Spot #27, Level B1" },
    ]},
  ],
  projects: [
    { id: "p1", name: "Kitchen Renovation", status: "active", color: "#E8B931", icon: "🔨",
      progress: 3, total: 8, tasks: [
        { id: "pt1", title: "Compare cabinet options (walnut vs white oak)", status: "done" },
        { id: "pt2", title: "Schedule contractor walkthrough", status: "done" },
        { id: "pt3", title: "Get countertop quotes", status: "done" },
        { id: "pt4", title: "Finalize cabinet selection", status: "active" },
        { id: "pt5", title: "Order cabinets (8-week lead time)", status: "blocked" },
        { id: "pt6", title: "Schedule demolition", status: "blocked" },
        { id: "pt7", title: "Plumbing rough-in", status: "blocked" },
        { id: "pt8", title: "Final inspection", status: "blocked" },
      ]
    },
    { id: "p2", name: "Fix Bathroom Leak", status: "active", color: "#D97A4A", icon: "🔧",
      progress: 1, total: 3, tasks: [
        { id: "pt9", title: "Call Dave's Plumbing", status: "done" },
        { id: "pt10", title: "Plumber visit - diagnose leak", status: "active" },
        { id: "pt11", title: "Repair & verify fix", status: "blocked" },
      ]
    },
    { id: "p3", name: "Annual Deep Clean", status: "upcoming", color: "#7A5AF5", icon: "✨",
      progress: 0, total: 5, tasks: [
        { id: "pt12", title: "Schedule cleaning service", status: "pending" },
        { id: "pt13", title: "Declutter storage closet", status: "pending" },
        { id: "pt14", title: "Steam clean carpets", status: "pending" },
        { id: "pt15", title: "Window washing (exterior)", status: "pending" },
        { id: "pt16", title: "HVAC filter replacement", status: "pending" },
      ]
    },
    { id: "p4", name: "Move-In Setup", status: "completed", color: "#5A6A7A", icon: "📦",
      progress: 6, total: 6, tasks: [
        { id: "pt17", title: "Change locks", status: "done" },
        { id: "pt18", title: "Set up internet", status: "done" },
        { id: "pt19", title: "Register parking", status: "done" },
        { id: "pt20", title: "Update address everywhere", status: "done" },
        { id: "pt21", title: "Meet building super", status: "done" },
        { id: "pt22", title: "Get renter's insurance", status: "done" },
      ]
    },
  ],
  artifacts: [
    { id: "a1", name: "Floor Plan (annotated)", type: "image", date: "2021-03-15", project: null },
    { id: "a2", name: "HOA Rules & Bylaws", type: "pdf", date: "2021-03-20", project: null },
    { id: "a3", name: "Purchase Agreement", type: "pdf", date: "2021-03-01", project: null },
    { id: "a4", name: "Kitchen Reno Mood Board", type: "image", date: "2025-01-10", project: "p1" },
    { id: "a5", name: "Cabinet Comparison Sheet", type: "doc", date: "2025-01-18", project: "p1" },
    { id: "a6", name: "Countertop Quotes (3 vendors)", type: "doc", date: "2025-01-25", project: "p1" },
    { id: "a7", name: "Plumbing Inspection Report", type: "pdf", date: "2024-12-01", project: "p2" },
    { id: "a8", name: "Home Insurance Policy", type: "pdf", date: "2024-01-15", project: null },
    { id: "a9", name: "Appliance Warranties", type: "doc", date: "2021-04-10", project: null },
    { id: "a10", name: "Paint Colors (per room)", type: "note", date: "2021-04-02", project: null },
  ],
  timeline: [
    { id: "e1", date: "2025-02-04", text: "Received countertop quotes from 3 vendors", type: "task", project: "p1" },
    { id: "e2", date: "2025-02-01", text: "Called Dave's Plumbing about bathroom leak", type: "task", project: "p2" },
    { id: "e3", date: "2025-01-28", text: "AI auto-filed HOA monthly assessment email", type: "ai", project: null },
    { id: "e4", date: "2025-01-25", text: "Compared cabinet options: leaning walnut", type: "task", project: "p1" },
    { id: "e5", date: "2025-01-20", text: "Contractor walkthrough completed with Mike", type: "task", project: "p1" },
    { id: "e6", date: "2025-01-15", text: "Started kitchen renovation project", type: "project", project: "p1" },
    { id: "e7", date: "2024-12-01", text: "Annual plumbing inspection — minor leak noted", type: "artifact", project: "p2" },
    { id: "e8", date: "2024-11-15", text: "HOA special assessment notice received", type: "email", project: null },
    { id: "e9", date: "2024-06-10", text: "HVAC serviced — filter replaced", type: "task", project: null },
    { id: "e10", date: "2021-03-15", text: "Moved in! All setup tasks completed.", type: "project", project: "p4" },
  ],
};

const TYPE_ICONS = { image: "🖼", pdf: "📄", doc: "📝", note: "📌" };
const EVENT_ICONS = { task: "☑", ai: "⚡", project: "◆", email: "✉", artifact: "📎" };
const STATUS_DOT = { done: "#5BBD72", active: "#E8B931", blocked: "#D97A4A", pending: "#5A6A7A", upcoming: "#7A5AF5" };

// ─── Components ──────────────────────────────────────────────────────────────

function DomainSelector({ domains, activeId, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
      {domains.map(d => {
        const active = d.id === activeId;
        return (
          <button key={d.id} onClick={() => onSelect(d.id)} style={{
            flexShrink: 0, background: active ? `${d.color}15` : "transparent",
            border: `1.5px solid ${active ? d.color : "#22252B"}`,
            borderRadius: 12, padding: "10px 16px", cursor: "pointer",
            fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8,
            transition: "all 0.2s ease",
          }}>
            <span style={{ fontSize: 18 }}>{d.icon}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? d.color : "#8A9AAA" }}>{d.name}</div>
              <div style={{ fontSize: 10, color: "#4A5A6A", marginTop: 1 }}>{d.description}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function QuickRefCard({ section, color, expanded, onToggle }) {
  return (
    <div style={{
      background: "#1A1D23", borderRadius: 14, border: "1px solid #22252B",
      overflow: "hidden", transition: "all 0.2s ease",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", background: "transparent", border: "none", padding: "14px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        cursor: "pointer", fontFamily: "inherit",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#E8E6E1" }}>{section.label}</span>
        <span style={{ fontSize: 12, color: "#4A5A6A", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {expanded && (
        <div style={{ padding: "0 16px 14px" }}>
          {section.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "6px 0", borderBottom: i < section.items.length - 1 ? "1px solid #1E2128" : "none",
            }}>
              <span style={{ fontSize: 12, color: "#6A7A8A" }}>{item.key}</span>
              <span style={{ fontSize: 13, color: "#E8E6E1", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const pct = project.total > 0 ? (project.progress / project.total) * 100 : 0;
  return (
    <button onClick={() => onOpen(project.id)} style={{
      width: "100%", background: "#1A1D23", borderRadius: 14,
      border: "1px solid #22252B", padding: "16px 18px", cursor: "pointer",
      fontFamily: "inherit", textAlign: "left", transition: "all 0.2s ease",
      borderLeft: `3px solid ${project.color}66`,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderLeftColor = project.color; }}
      onMouseLeave={e => { e.currentTarget.style.borderLeftColor = `${project.color}66`; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>{project.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1" }}>{project.name}</div>
            <div style={{ fontSize: 11, color: "#5A6A7A", marginTop: 2, textTransform: "capitalize" }}>
              {project.status === "completed" ? "✓ Completed" : `${project.progress}/${project.total} tasks`}
            </div>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "#3A4A5A" }}>→</span>
      </div>
      {project.status !== "completed" && (
        <div style={{ marginTop: 12, height: 4, background: "#22252B", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: project.color, borderRadius: 2, transition: "width 0.5s ease" }} />
        </div>
      )}
    </button>
  );
}

function ProjectDetail({ project, onBack, domainColor }) {
  return (
    <div>
      <button onClick={onBack} style={{
        background: "transparent", border: "none", color: "#6A7A8A", fontSize: 12,
        cursor: "pointer", fontFamily: "inherit", padding: "0 0 14px", display: "flex",
        alignItems: "center", gap: 5,
      }}>
        ← Back to domain
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 28 }}>{project.icon}</span>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#E8E6E1", letterSpacing: "-0.01em" }}>{project.name}</div>
          <div style={{ fontSize: 12, color: "#5A6A7A", marginTop: 2 }}>
            {project.progress}/{project.total} completed · <span style={{ color: project.color, textTransform: "capitalize" }}>{project.status}</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {project.tasks.map(task => (
          <div key={task.id} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
            background: "#1A1D23", borderRadius: 10, border: "1px solid #22252B",
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: STATUS_DOT[task.status] || "#3A4A5A",
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 13, color: task.status === "done" ? "#5A7A5A" : task.status === "blocked" ? "#7A6A5A" : "#E8E6E1",
              textDecoration: task.status === "done" ? "line-through" : "none",
              flex: 1,
            }}>
              {task.title}
            </span>
            <span style={{ fontSize: 10, color: "#4A5A6A", textTransform: "capitalize", flexShrink: 0 }}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
      <button style={{
        width: "100%", marginTop: 12, background: "transparent",
        border: "1px dashed #2A2D35", borderRadius: 10, padding: 12,
        color: "#3A4A5A", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
      }}>
        + Add task to {project.name}
      </button>
    </div>
  );
}

function ArtifactsList({ artifacts }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {artifacts.map(a => (
        <div key={a.id} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
          background: "#1A1D23", borderRadius: 10, border: "1px solid #22252B",
          cursor: "pointer", transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#3A3D45"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#22252B"}
        >
          <span style={{ fontSize: 16 }}>{TYPE_ICONS[a.type]}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "#E8E6E1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
            <div style={{ fontSize: 10, color: "#4A5A6A", marginTop: 2 }}>{a.date}{a.project ? " · linked to project" : ""}</div>
          </div>
          <span style={{ fontSize: 10, color: "#3A4A5A", textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.type}</span>
        </div>
      ))}
    </div>
  );
}

function Timeline({ events }) {
  return (
    <div style={{ position: "relative", paddingLeft: 20 }}>
      <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 1, background: "#22252B" }} />
      {events.map((ev, i) => (
        <div key={ev.id} style={{ display: "flex", gap: 14, marginBottom: 16, position: "relative" }}>
          <div style={{
            width: 11, height: 11, borderRadius: "50%", flexShrink: 0,
            background: "#12141A", border: "2px solid #3A4A5A",
            marginTop: 4, position: "relative", zIndex: 1,
          }} />
          <div>
            <div style={{ fontSize: 10, color: "#4A5A6A", marginBottom: 3, fontFamily: "'JetBrains Mono', monospace" }}>{ev.date}</div>
            <div style={{ fontSize: 13, color: "#B8B6B1", lineHeight: 1.45 }}>
              <span style={{ marginRight: 6 }}>{EVENT_ICONS[ev.type]}</span>
              {ev.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchBar({ query, onQuery }) {
  return (
    <div style={{ position: "relative" }}>
      <input
        value={query}
        onChange={e => onQuery(e.target.value)}
        placeholder="Search this domain... (measurements, contacts, files)"
        style={{
          width: "100%", background: "#1A1D23", border: "1px solid #22252B",
          borderRadius: 12, padding: "12px 16px 12px 38px", color: "#E8E6E1",
          fontSize: 13, boxSizing: "border-box", fontFamily: "inherit",
        }}
      />
      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#3A4A5A" }}>⌕</span>
    </div>
  );
}

function SearchResults({ query, data, domainColor }) {
  const q = query.toLowerCase();
  const results = [];

  // Search quick ref
  data.quickRef.forEach(section => {
    section.items.forEach(item => {
      if (item.key.toLowerCase().includes(q) || item.value.toLowerCase().includes(q)) {
        results.push({ type: "ref", section: section.label, key: item.key, value: item.value });
      }
    });
  });

  // Search artifacts
  data.artifacts.forEach(a => {
    if (a.name.toLowerCase().includes(q)) {
      results.push({ type: "artifact", name: a.name, fileType: a.type, date: a.date });
    }
  });

  // Search projects & tasks
  data.projects.forEach(p => {
    if (p.name.toLowerCase().includes(q)) {
      results.push({ type: "project", name: p.name, icon: p.icon, status: p.status });
    }
    p.tasks.forEach(t => {
      if (t.title.toLowerCase().includes(q)) {
        results.push({ type: "task", title: t.title, project: p.name, status: t.status });
      }
    });
  });

  // Search timeline
  data.timeline.forEach(ev => {
    if (ev.text.toLowerCase().includes(q)) {
      results.push({ type: "event", text: ev.text, date: ev.date });
    }
  });

  if (results.length === 0) {
    return <div style={{ padding: 20, textAlign: "center", color: "#3A4A5A", fontSize: 13 }}>No results for "{query}"</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {results.slice(0, 12).map((r, i) => (
        <div key={i} style={{
          padding: "10px 14px", background: "#1A1D23", borderRadius: 10,
          border: "1px solid #22252B", display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 12, color: "#4A5A6A", width: 40, flexShrink: 0, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em", fontFamily: "'JetBrains Mono', monospace" }}>
            {r.type === "ref" ? "REF" : r.type === "artifact" ? "FILE" : r.type === "project" ? "PROJ" : r.type === "task" ? "TASK" : "LOG"}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            {r.type === "ref" && (
              <div style={{ fontSize: 13, color: "#E8E6E1" }}>
                <span style={{ color: "#6A7A8A" }}>{r.section} → </span>{r.key}: <span style={{ color: domainColor, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{r.value}</span>
              </div>
            )}
            {r.type === "artifact" && (
              <div style={{ fontSize: 13, color: "#E8E6E1" }}>{TYPE_ICONS[r.fileType]} {r.name} <span style={{ color: "#4A5A6A", fontSize: 11 }}>· {r.date}</span></div>
            )}
            {r.type === "project" && (
              <div style={{ fontSize: 13, color: "#E8E6E1" }}>{r.icon} {r.name} <span style={{ color: "#4A5A6A", fontSize: 11 }}>· {r.status}</span></div>
            )}
            {r.type === "task" && (
              <div style={{ fontSize: 13, color: "#E8E6E1" }}>{r.title} <span style={{ color: "#4A5A6A", fontSize: 11 }}>· {r.project}</span></div>
            )}
            {r.type === "event" && (
              <div style={{ fontSize: 13, color: "#E8E6E1" }}>{r.text} <span style={{ color: "#4A5A6A", fontSize: 11 }}>· {r.date}</span></div>
            )}
          </div>
        </div>
      ))}
      {results.length > 12 && (
        <div style={{ textAlign: "center", color: "#4A5A6A", fontSize: 11, padding: 8 }}>
          + {results.length - 12} more results
        </div>
      )}
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview", icon: "◉" },
  { id: "reference", label: "Reference", icon: "◈" },
  { id: "projects", label: "Projects", icon: "◆" },
  { id: "artifacts", label: "Files", icon: "◇" },
  { id: "timeline", label: "Timeline", icon: "◷" },
];

// ─── Main ────────────────────────────────────────────────────────────────────

export default function DomainExplorer() {
  const [activeDomain, setActiveDomain] = useState("d1");
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedRefs, setExpandedRefs] = useState(new Set(["q1", "q5"]));
  const [openProject, setOpenProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const domain = DOMAINS.find(d => d.id === activeDomain);
  const data = CONDO_DATA; // In real app, data would switch per domain

  const toggleRef = (id) => {
    setExpandedRefs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeProjects = data.projects.filter(p => p.status === "active");
  const totalActiveTasks = activeProjects.reduce((sum, p) => sum + p.total - p.progress, 0);

  const isSearching = searchQuery.length > 1;

  return (
    <div style={{ minHeight: "100vh", background: "#12141A", fontFamily: "'DM Sans', sans-serif", color: "#E8E6E1" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top Bar */}
      <div style={{ padding: "16px 20px 14px", borderBottom: "1px solid #1E2128" }}>
        <div style={{ fontSize: 10, color: "#4A5A6A", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>TaskCard</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#E8E6E1", letterSpacing: "-0.01em" }}>Domains</div>
      </div>

      {/* Domain Selector */}
      <div style={{ padding: "14px 0", borderBottom: "1px solid #1E2128" }}>
        <DomainSelector domains={DOMAINS} activeId={activeDomain} onSelect={id => { setActiveDomain(id); setActiveTab("overview"); setOpenProject(null); setSearchQuery(""); }} />
      </div>

      {/* Domain Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 26,
            background: `${domain.color}12`, border: `1.5px solid ${domain.color}33`,
          }}>
            {domain.icon}
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#E8E6E1", letterSpacing: "-0.01em" }}>{domain.name}</h1>
            <div style={{ fontSize: 12, color: "#5A6A7A", marginTop: 3 }}>{domain.description}</div>
          </div>
        </div>

        {/* Search */}
        <SearchBar query={searchQuery} onQuery={setSearchQuery} />

        {/* Quick Stats */}
        {!isSearching && (
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {[
              { label: "Active Projects", value: activeProjects.length, color: "#E8B931" },
              { label: "Open Tasks", value: totalActiveTasks, color: "#4A9BD9" },
              { label: "Files", value: data.artifacts.length, color: "#7A5AF5" },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: "#1A1D23", borderRadius: 10, padding: "10px 12px",
                border: "1px solid #22252B",
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#4A5A6A", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Results */}
      {isSearching ? (
        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: "#4A5A6A", marginBottom: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Search Results
          </div>
          <SearchResults query={searchQuery} data={data} domainColor={domain.color} />
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, padding: "16px 20px 0", borderBottom: "1px solid #1E2128", marginTop: 4 }}>
            {TABS.map(tab => {
              const active = tab.id === activeTab;
              return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setOpenProject(null); }} style={{
                  background: "transparent", border: "none",
                  borderBottom: `2px solid ${active ? domain.color : "transparent"}`,
                  padding: "8px 14px 12px", cursor: "pointer", fontFamily: "inherit",
                  color: active ? domain.color : "#4A5A6A", fontSize: 12, fontWeight: active ? 600 : 400,
                  transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{ fontSize: 11 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ padding: "20px" }}>
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Active Projects */}
                <div>
                  <div style={{ fontSize: 11, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Active Projects</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {activeProjects.map(p => <ProjectCard key={p.id} project={p} onOpen={() => { setActiveTab("projects"); setOpenProject(p.id); }} />)}
                  </div>
                </div>
                {/* Quick Reference preview */}
                <div>
                  <div style={{ fontSize: 11, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Quick Reference</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {data.quickRef.slice(0, 3).map(s => (
                      <QuickRefCard key={s.id} section={s} color={domain.color} expanded={expandedRefs.has(s.id)} onToggle={() => toggleRef(s.id)} />
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("reference")} style={{
                    width: "100%", marginTop: 8, background: "transparent", border: "1px dashed #22252B",
                    borderRadius: 10, padding: 10, color: "#4A5A6A", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                  }}>View all reference data →</button>
                </div>
                {/* Recent Activity */}
                <div>
                  <div style={{ fontSize: 11, color: "#4A5A6A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Recent Activity</div>
                  <Timeline events={data.timeline.slice(0, 5)} />
                  <button onClick={() => setActiveTab("timeline")} style={{
                    width: "100%", marginTop: 4, background: "transparent", border: "1px dashed #22252B",
                    borderRadius: 10, padding: 10, color: "#4A5A6A", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                  }}>View full timeline →</button>
                </div>
              </div>
            )}

            {activeTab === "reference" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.quickRef.map(s => (
                  <QuickRefCard key={s.id} section={s} color={domain.color} expanded={expandedRefs.has(s.id)} onToggle={() => toggleRef(s.id)} />
                ))}
                <button style={{
                  width: "100%", marginTop: 4, background: "transparent",
                  border: `1px dashed ${domain.color}33`, borderRadius: 10, padding: 12,
                  color: `${domain.color}88`, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                }}>+ Add reference section</button>
              </div>
            )}

            {activeTab === "projects" && (
              openProject ? (
                <ProjectDetail
                  project={data.projects.find(p => p.id === openProject)}
                  onBack={() => setOpenProject(null)}
                  domainColor={domain.color}
                />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {data.projects.map(p => <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />)}
                  <button style={{
                    width: "100%", marginTop: 4, background: "transparent",
                    border: `1px dashed ${domain.color}33`, borderRadius: 10, padding: 12,
                    color: `${domain.color}88`, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                  }}>+ Create project</button>
                </div>
              )
            )}

            {activeTab === "artifacts" && (
              <div>
                <ArtifactsList artifacts={data.artifacts} />
                <button style={{
                  width: "100%", marginTop: 10, background: "transparent",
                  border: `1px dashed ${domain.color}33`, borderRadius: 10, padding: 12,
                  color: `${domain.color}88`, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                }}>+ Add file or note</button>
              </div>
            )}

            {activeTab === "timeline" && (
              <Timeline events={data.timeline} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
