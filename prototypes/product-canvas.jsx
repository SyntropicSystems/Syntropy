/*
---
id: "proto-product-canvas"
type: prototype
title: "Product Canvas"
status: active
owner: ux-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  related: [dp07]
tags: [prototype]
---
*/

import { useState, useEffect, useCallback } from "react";

const CATEGORIES = [
  { id: "features", label: "Features", icon: "◆", color: "#E8B931" },
  { id: "usecases", label: "Use Cases", icon: "◎", color: "#4A9BD9" },
  { id: "stories", label: "User Stories", icon: "◈", color: "#D94A6B" },
  { id: "jtbd", label: "Jobs to Be Done", icon: "▸", color: "#5BBD72" },
];

const PRIORITY_LABELS = { high: "P0", medium: "P1", low: "P2" };
const PRIORITY_COLORS = { high: "#D94A6B", medium: "#E8B931", low: "#7A8A99" };

const INITIAL_DATA = {
  features: [
    { id: "f1", title: "Task Card System", description: "Core card-based task interface. Tasks can be created manually or auto-created. Work through them card-by-card with swipe/action UX.", tags: ["core", "mvp"], priority: "high", status: "defining" },
    { id: "f2", title: "Recursive Task Hierarchy", description: "Tasks can have sub-tasks in a recursive structure. Any task can become a parent/epic/project. Supports dependency graphs between tasks.", tags: ["core", "architecture"], priority: "high", status: "defining" },
    { id: "f3", title: "Gmail / Google Workspace Integration", description: "Connect Gmail so every email becomes a task card. Standard actions: reply, archive, unsubscribe, snooze. AI-generated custom actions per email context.", tags: ["integration", "mvp"], priority: "high", status: "defining" },
    { id: "f4", title: "AI Action Engine", description: "AI analyzes tasks and suggests or auto-executes actions. High confidence → auto-act. Low confidence → hand off to human for confirmation. Roles: personal assistant, project manager, domain-specific agents.", tags: ["ai", "core"], priority: "high", status: "exploring" },
    { id: "f5", title: "Quick Capture (Notes → Tasks)", description: "Create notes via voice, voice memo, text, photo, or multimodal combo. Notes can be converted to structured tasks with AI assistance.", tags: ["capture", "ux"], priority: "medium", status: "defining" },
    { id: "f6", title: "Event Sourcing & Audit Trail", description: "Every action is event-sourced with full ledger. Complete audit trail for all system and user actions. Foundation for learning and training.", tags: ["architecture", "core"], priority: "high", status: "defining" },
    { id: "f7", title: "Self-Learning System", description: "System learns from user behavior, refines suggestions, evolves over time. Trainable by user corrections and preferences. Continuous personalization.", tags: ["ai", "personalization"], priority: "medium", status: "exploring" },
    { id: "f8", title: "Cross-Platform (React Native + Web)", description: "Mobile app built with React Native. Web surface for desktop use. Shared core logic and consistent UX across platforms.", tags: ["platform", "tech"], priority: "high", status: "defining" },
    { id: "f9", title: "Email-to-Project Workflow", description: "Create an epic/project/parent task directly from an email. Email thread becomes linked context. Actions propagate to connected tasks.", tags: ["integration", "workflow"], priority: "medium", status: "exploring" },
    { id: "f10", title: "Confidence-Based AI Handoff", description: "AI actions are gated by confidence scoring. Auto-execute above threshold, queue for review below. User can adjust thresholds per action type.", tags: ["ai", "trust"], priority: "high", status: "defining" },
  ],
  usecases: [
    { id: "u1", title: "Email Triage", description: "User opens app and sees email-derived task cards. Swipes through them taking actions (reply, archive, snooze, create project). AI pre-suggests actions.", tags: ["email", "daily"], priority: "high", status: "defining" },
    { id: "u2", title: "Voice Note to Task", description: "User records a voice memo while walking. AI transcribes, extracts action items, creates structured tasks, optionally links to existing projects.", tags: ["capture", "mobile"], priority: "medium", status: "exploring" },
    { id: "u3", title: "AI Auto-Managing Inbox", description: "AI automatically archives newsletters, categorizes emails into projects, drafts replies for routine messages, and surfaces only what needs human attention.", tags: ["ai", "email"], priority: "high", status: "exploring" },
    { id: "u4", title: "Project Overview from Tasks", description: "User views a project/epic and sees all connected task cards, their status, dependencies, and AI-suggested next actions across the project.", tags: ["project", "overview"], priority: "medium", status: "defining" },
  ],
  stories: [
    { id: "s1", title: "As a busy professional, I want my emails auto-categorized into actionable tasks so I spend less time triaging my inbox.", description: "", tags: ["email", "ai"], priority: "high", status: "defining" },
    { id: "s2", title: "As a user, I want to capture thoughts via voice while on the go and have them become structured tasks without manual effort.", description: "", tags: ["capture"], priority: "medium", status: "exploring" },
    { id: "s3", title: "As a user, I want to see AI-suggested actions on each task card so I can make decisions faster with less cognitive load.", description: "", tags: ["ai", "ux"], priority: "high", status: "defining" },
    { id: "s4", title: "As a user, I want to trust the AI to auto-handle routine tasks while escalating important decisions to me.", description: "", tags: ["ai", "trust"], priority: "high", status: "defining" },
    { id: "s5", title: "As a user, I want a full audit trail so I can review what the AI did and correct its behavior over time.", description: "", tags: ["trust", "learning"], priority: "medium", status: "defining" },
  ],
  jtbd: [
    { id: "j1", title: "Remove mental overhead from daily life", description: "When I'm overwhelmed by tasks, emails, and commitments, I want a system that handles the cognitive load so I can focus on what matters.", tags: ["core"], priority: "high", status: "defining" },
    { id: "j2", title: "Never lose track of commitments", description: "When someone emails me or I have an idea, I want it automatically captured and tracked so nothing falls through the cracks.", tags: ["capture", "trust"], priority: "high", status: "defining" },
    { id: "j3", title: "Automate myself where possible", description: "When there are repetitive or predictable tasks, I want an AI to learn my patterns and handle them autonomously.", tags: ["ai", "automation"], priority: "high", status: "exploring" },
    { id: "j4", title: "Maintain control while delegating to AI", description: "When AI acts on my behalf, I want transparency and the ability to course-correct so I stay in control.", tags: ["trust", "ai"], priority: "high", status: "defining" },
  ],
};

const STATUS_OPTIONS = ["exploring", "defining", "specified", "building", "shipped"];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function ItemCard({ item, category, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(item);
  const cat = CATEGORIES.find((c) => c.id === category);

  const save = () => {
    onUpdate({ ...editData, tags: typeof editData.tags === "string" ? editData.tags.split(",").map((t) => t.trim()).filter(Boolean) : editData.tags });
    setEditing(false);
  };

  if (editing) {
    return (
      <div style={{ background: "#1A1D23", borderRadius: 12, padding: 20, border: `1px solid ${cat.color}33`, marginBottom: 10 }}>
        <input
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          placeholder="Title"
          style={{ width: "100%", background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "10px 14px", color: "#E8E6E1", fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit" }}
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          placeholder="Description"
          rows={3}
          style={{ width: "100%", background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
        />
        <input
          value={Array.isArray(editData.tags) ? editData.tags.join(", ") : editData.tags}
          onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
          placeholder="Tags (comma separated)"
          style={{ width: "100%", background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit" }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <select value={editData.priority} onChange={(e) => setEditData({ ...editData, priority: e.target.value })} style={{ background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "8px 12px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit" }}>
            <option value="high">P0 - High</option>
            <option value="medium">P1 - Medium</option>
            <option value="low">P2 - Low</option>
          </select>
          <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} style={{ background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "8px 12px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit" }}>
            {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
          <button onClick={() => setEditing(false)} style={{ background: "transparent", border: "1px solid #2A2D35", borderRadius: 8, padding: "7px 16px", color: "#7A8A99", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Cancel</button>
          <button onClick={save} style={{ background: cat.color, border: "none", borderRadius: 8, padding: "7px 16px", color: "#12141A", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ background: "#1A1D23", borderRadius: 12, padding: "16px 18px", border: "1px solid #22252B", marginBottom: 8, cursor: "pointer", transition: "all 0.2s ease", borderLeft: `3px solid ${cat.color}44` }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cat.color}55`; e.currentTarget.style.borderLeftColor = cat.color; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#22252B"; e.currentTarget.style.borderLeftColor = `${cat.color}44`; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: "#E8E6E1", lineHeight: 1.5, fontWeight: 500 }}>{item.title}</div>
          {expanded && item.description && (
            <div style={{ fontSize: 13, color: "#8A8F99", lineHeight: 1.6, marginTop: 8 }}>{item.description}</div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[item.priority], background: `${PRIORITY_COLORS[item.priority]}18`, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>
              {PRIORITY_LABELS[item.priority]}
            </span>
            <span style={{ fontSize: 11, color: "#6A7A8A", background: "#22252B", padding: "2px 8px", borderRadius: 4, textTransform: "capitalize" }}>
              {item.status}
            </span>
            {item.tags.map((t) => (
              <span key={t} style={{ fontSize: 11, color: `${cat.color}CC`, background: `${cat.color}12`, padding: "2px 8px", borderRadius: 4 }}>{t}</span>
            ))}
          </div>
        </div>
        {expanded && (
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setEditData(item); setEditing(true); }} style={{ background: "#22252B", border: "none", borderRadius: 6, width: 30, height: 30, color: "#8A8F99", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }} title="Edit">✎</button>
            <button onClick={() => onDelete(item.id)} style={{ background: "#22252B", border: "none", borderRadius: 6, width: 30, height: 30, color: "#8A8F99", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }} title="Delete">×</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddItemForm({ category, onAdd, onCancel }) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const [data, setData] = useState({ title: "", description: "", tags: "", priority: "medium", status: "exploring" });

  const submit = () => {
    if (!data.title.trim()) return;
    onAdd({
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim(),
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      priority: data.priority,
      status: data.status,
    });
    setData({ title: "", description: "", tags: "", priority: "medium", status: "exploring" });
  };

  return (
    <div style={{ background: "#1A1D23", borderRadius: 12, padding: 20, border: `1px dashed ${cat.color}55`, marginBottom: 10 }}>
      <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder={category === "stories" ? "As a [user], I want [goal] so that [benefit]" : category === "jtbd" ? "When [situation], I want to [motivation] so I can [outcome]" : "Title"} autoFocus style={{ width: "100%", background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "10px 14px", color: "#E8E6E1", fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit" }} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }}} />
      <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder="Description (optional)" rows={2} style={{ width: "100%", background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} />
      <input value={data.tags} onChange={(e) => setData({ ...data, tags: e.target.value })} placeholder="Tags (comma separated)" style={{ width: "100%", background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit" }} />
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <select value={data.priority} onChange={(e) => setData({ ...data, priority: e.target.value })} style={{ background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "8px 12px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit" }}>
          <option value="high">P0 - High</option>
          <option value="medium">P1 - Medium</option>
          <option value="low">P2 - Low</option>
        </select>
        <select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} style={{ background: "#12141A", border: "1px solid #2A2D35", borderRadius: 8, padding: "8px 12px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit" }}>
          {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={{ background: "transparent", border: "1px solid #2A2D35", borderRadius: 8, padding: "7px 16px", color: "#7A8A99", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Cancel</button>
        <button onClick={submit} style={{ background: cat.color, border: "none", borderRadius: 8, padding: "7px 16px", color: "#12141A", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", opacity: data.title.trim() ? 1 : 0.4 }}>Add</button>
      </div>
    </div>
  );
}

function StatsBar({ data }) {
  const allItems = Object.values(data).flat();
  const byStatus = STATUS_OPTIONS.map((s) => ({ status: s, count: allItems.filter((i) => i.status === s).length }));
  const total = allItems.length;

  return (
    <div style={{ display: "flex", gap: 3, height: 6, borderRadius: 3, overflow: "hidden", background: "#1A1D23", marginBottom: 24 }}>
      {byStatus.map(({ status, count }) => {
        if (count === 0) return null;
        const colors = { exploring: "#7A5AF5", defining: "#4A9BD9", specified: "#E8B931", building: "#D97A4A", shipped: "#5BBD72" };
        return <div key={status} style={{ flex: count, background: colors[status], transition: "flex 0.4s ease" }} title={`${status}: ${count}`} />;
      })}
    </div>
  );
}

function ExportPanel({ data, onClose }) {
  const markdown = Object.entries(data).map(([catId, items]) => {
    const cat = CATEGORIES.find((c) => c.id === catId);
    return `## ${cat.icon} ${cat.label}\n\n${items.map((item) => `### ${item.title}\n${item.description ? item.description + "\n" : ""}- **Priority:** ${PRIORITY_LABELS[item.priority]}\n- **Status:** ${item.status}\n- **Tags:** ${item.tags.join(", ")}\n`).join("\n")}`;
  }).join("\n---\n\n");

  const full = `# Product Shape Canvas — TaskCard\n\n${markdown}`;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#12141A", borderRadius: 16, padding: 24, maxWidth: 700, width: "100%", maxHeight: "80vh", overflow: "auto", border: "1px solid #22252B" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: "#E8E6E1", margin: 0, fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>Export as Markdown</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => navigator.clipboard.writeText(full)} style={{ background: "#E8B931", border: "none", borderRadius: 8, padding: "7px 16px", color: "#12141A", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>Copy</button>
            <button onClick={onClose} style={{ background: "#22252B", border: "none", borderRadius: 8, width: 32, height: 32, color: "#8A8F99", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
        </div>
        <pre style={{ background: "#1A1D23", borderRadius: 10, padding: 16, color: "#8A8F99", fontSize: 12, lineHeight: 1.6, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "'JetBrains Mono', monospace", maxHeight: "60vh" }}>{full}</pre>
      </div>
    </div>
  );
}

export default function ProductCanvas() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeCategory, setActiveCategory] = useState("features");
  const [adding, setAdding] = useState(false);
  const [filterPriority, setFilterPriority] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("product-canvas-data");
        if (result && result.value) {
          setData(JSON.parse(result.value));
        }
      } catch (e) {
        // Key doesn't exist, use initial data
      }
      setLoaded(true);
    })();
  }, []);

  // Save to storage on data change
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set("product-canvas-data", JSON.stringify(data));
      } catch (e) {
        console.error("Storage save failed:", e);
      }
    })();
  }, [data, loaded]);

  const updateItem = useCallback((category, updatedItem) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }));
  }, []);

  const deleteItem = useCallback((category, id) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  }, []);

  const addItem = useCallback((category, item) => {
    setData((prev) => ({
      ...prev,
      [category]: [item, ...prev[category]],
    }));
    setAdding(false);
  }, []);

  const resetData = () => {
    if (window.confirm("Reset all data to initial state? This cannot be undone.")) {
      setData(INITIAL_DATA);
    }
  };

  const items = data[activeCategory] || [];
  const filtered = items.filter((item) => {
    if (filterPriority && item.priority !== filterPriority) return false;
    if (filterStatus && item.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.some((t) => t.toLowerCase().includes(q));
    }
    return true;
  });

  const cat = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#12141A", fontFamily: "'DM Sans', sans-serif", color: "#E8E6E1" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "28px 28px 0", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 11, color: "#5A6A7A", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Product Shape Canvas</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #E8E6E1 0%, #8A8F99 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TaskCard</h1>
            <div style={{ fontSize: 13, color: "#5A6A7A", marginTop: 4, lineHeight: 1.5 }}>
              AI-powered task management · Human-AI collaboration · Self-learning system
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setShowExport(true)} style={{ background: "#1A1D23", border: "1px solid #22252B", borderRadius: 8, padding: "8px 14px", color: "#8A8F99", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 500 }}>Export</button>
            <button onClick={resetData} style={{ background: "#1A1D23", border: "1px solid #22252B", borderRadius: 8, padding: "8px 14px", color: "#5A6A7A", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Reset</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
            {STATUS_OPTIONS.map((s) => {
              const colors = { exploring: "#7A5AF5", defining: "#4A9BD9", specified: "#E8B931", building: "#D97A4A", shipped: "#5BBD72" };
              const count = Object.values(data).flat().filter((i) => i.status === s).length;
              return (
                <div key={s} style={{ fontSize: 11, color: count > 0 ? colors[s] : "#3A3D45", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: count > 0 ? colors[s] : "#3A3D45", display: "inline-block" }} />
                  <span style={{ textTransform: "capitalize" }}>{s}</span>
                  <span style={{ opacity: 0.6 }}>{count}</span>
                </div>
              );
            })}
          </div>
          <StatsBar data={data} />
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => {
            const active = c.id === activeCategory;
            const count = data[c.id]?.length || 0;
            return (
              <button
                key={c.id}
                onClick={() => { setActiveCategory(c.id); setAdding(false); }}
                style={{
                  background: active ? `${c.color}18` : "transparent",
                  border: `1px solid ${active ? `${c.color}44` : "#22252B"}`,
                  borderRadius: 10,
                  padding: "10px 16px",
                  color: active ? c.color : "#5A6A7A",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: 14 }}>{c.icon}</span>
                {c.label}
                <span style={{ fontSize: 11, opacity: 0.6, fontWeight: 400, background: active ? `${c.color}22` : "#1A1D23", padding: "1px 7px", borderRadius: 10 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              style={{ width: "100%", background: "#1A1D23", border: "1px solid #22252B", borderRadius: 8, padding: "8px 14px", color: "#E8E6E1", fontSize: 13, boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
          {["high", "medium", "low"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(filterPriority === p ? null : p)}
              style={{
                background: filterPriority === p ? `${PRIORITY_COLORS[p]}22` : "transparent",
                border: `1px solid ${filterPriority === p ? PRIORITY_COLORS[p] : "#22252B"}`,
                borderRadius: 6,
                padding: "6px 10px",
                color: filterPriority === p ? PRIORITY_COLORS[p] : "#5A6A7A",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              {PRIORITY_LABELS[p]}
            </button>
          ))}
          <select
            value={filterStatus || ""}
            onChange={(e) => setFilterStatus(e.target.value || null)}
            style={{ background: "#1A1D23", border: "1px solid #22252B", borderRadius: 6, padding: "6px 10px", color: filterStatus ? "#E8E6E1" : "#5A6A7A", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 28px 40px", maxWidth: 900, margin: "0 auto" }}>
        {/* Add Button */}
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            style={{
              width: "100%",
              background: "transparent",
              border: `1px dashed ${cat.color}33`,
              borderRadius: 12,
              padding: "14px",
              color: `${cat.color}88`,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
              marginBottom: 12,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cat.color}66`; e.currentTarget.style.color = cat.color; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${cat.color}33`; e.currentTarget.style.color = `${cat.color}88`; }}
          >
            + Add {cat.label.slice(0, -1).toLowerCase() === "use case" ? "use case" : cat.label.slice(0, -1).toLowerCase()}
          </button>
        )}

        {adding && <AddItemForm category={activeCategory} onAdd={(item) => addItem(activeCategory, item)} onCancel={() => setAdding(false)} />}

        {/* Items */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#3A3D45", fontSize: 13 }}>
            {items.length === 0 ? "No items yet. Add your first one!" : "No items match your filters."}
          </div>
        ) : (
          filtered.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              category={activeCategory}
              onUpdate={(updated) => updateItem(activeCategory, updated)}
              onDelete={(id) => deleteItem(activeCategory, id)}
            />
          ))
        )}

        {/* Summary footer */}
        <div style={{ marginTop: 28, padding: "16px 18px", background: "#1A1D23", borderRadius: 12, border: "1px solid #22252B" }}>
          <div style={{ fontSize: 11, color: "#5A6A7A", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Canvas Summary</div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: c.color, fontSize: 14 }}>{c.icon}</span>
                <span style={{ fontSize: 13, color: "#8A8F99" }}>{c.label}:</span>
                <span style={{ fontSize: 13, color: "#E8E6E1", fontWeight: 600 }}>{data[c.id]?.length || 0}</span>
              </div>
            ))}
            <div style={{ marginLeft: "auto", fontSize: 13, color: "#5A6A7A" }}>
              Total: <span style={{ color: "#E8E6E1", fontWeight: 600 }}>{Object.values(data).flat().length}</span>
            </div>
          </div>
        </div>
      </div>

      {showExport && <ExportPanel data={data} onClose={() => setShowExport(false)} />}
    </div>
  );
}
