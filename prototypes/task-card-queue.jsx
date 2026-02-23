/*
---
id: "proto-task-card-queue"
type: prototype
title: "Task Card Queue"
status: active
owner: ux-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  related: [dp07]
tags: [prototype]
---
*/

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const EPICS = {
  e1: { id: "e1", title: "Inbox Zero Sprint", color: "#E8B931", icon: "📧" },
  e2: { id: "e2", title: "Q1 Product Launch", color: "#4A9BD9", icon: "🚀" },
  e3: { id: "e3", title: "Home Renovation", color: "#5BBD72", icon: "🏠" },
};

const ALL_TASKS = [
  { id: "t1", title: "Review proposal from Acme Corp", source: "gmail", from: "sarah@acme.co", snippet: "Hi, please find attached the revised partnership proposal for Q2...", epic: "e2", status: "pending", actions: ["Reply", "Create Project", "Archive"], aiSuggestion: "Reply", aiConfidence: 0.72, dependsOn: [], creates: ["t8"] },
  { id: "t2", title: "Unsubscribe from marketing digest", source: "gmail", from: "noreply@digest.io", snippet: "Your weekly marketing trends roundup is here! Top stories this week...", epic: null, status: "pending", actions: ["Unsubscribe", "Archive", "Keep"], aiSuggestion: "Unsubscribe", aiConfidence: 0.95, dependsOn: [], creates: [] },
  { id: "t3", title: "Schedule contractor walkthrough", source: "gmail", from: "mike@buildright.com", snippet: "Hey! I'm available next Tuesday or Thursday for the kitchen walkthrough...", epic: "e3", status: "pending", actions: ["Reply with Tuesday", "Reply with Thursday", "Propose new time"], aiSuggestion: "Reply with Tuesday", aiConfidence: 0.61, dependsOn: [], creates: ["t9"] },
  { id: "t4", title: "Approve design mockups", source: "gmail", from: "design@team.internal", snippet: "The final mockups for the landing page are ready for your review...", epic: "e2", status: "pending", actions: ["Approve", "Request changes", "Forward to team"], aiSuggestion: "Approve", aiConfidence: 0.84, dependsOn: [], creates: ["t10"] },
  { id: "t5", title: "Pay electricity bill", source: "gmail", from: "billing@utility.com", snippet: "Your monthly bill of $142.50 is due by Feb 15th. Pay online now...", epic: null, status: "pending", actions: ["Pay now", "Snooze to Feb 14", "Add to budget"], aiSuggestion: "Pay now", aiConfidence: 0.91, dependsOn: [], creates: [] },
  { id: "t6", title: "Review kitchen cabinet options", source: "note", from: null, snippet: "Voice memo: Need to compare the walnut vs white oak options Mike sent over. Budget is around 8k...", epic: "e3", status: "pending", actions: ["Research options", "Message Mike", "Add to project"], aiSuggestion: null, aiConfidence: 0, dependsOn: ["t3"], creates: [] },
  { id: "t7", title: "Draft launch announcement", source: "task", from: null, snippet: "Write the product launch blog post and social media copy for Q1 launch...", epic: "e2", status: "pending", actions: ["Start draft", "Delegate", "Set deadline"], aiSuggestion: "Start draft", aiConfidence: 0.55, dependsOn: ["t4"], creates: [] },
  { id: "t8", title: "Follow up on Acme proposal terms", source: "auto", from: null, snippet: "AI-created: After replying to Acme, schedule a follow-up to discuss contract terms...", epic: "e2", status: "queued", actions: ["Schedule call", "Draft follow-up email", "Dismiss"], aiSuggestion: "Schedule call", aiConfidence: 0.68, dependsOn: ["t1"], creates: [] },
  { id: "t9", title: "Prepare walkthrough checklist", source: "auto", from: null, snippet: "AI-created: Before the contractor visit, prepare a list of questions and measurements needed...", epic: "e3", status: "queued", actions: ["Create checklist", "Add photos", "Dismiss"], aiSuggestion: "Create checklist", aiConfidence: 0.77, dependsOn: ["t3"], creates: ["t6"] },
  { id: "t10", title: "Set up staging environment", source: "auto", from: null, snippet: "AI-created: After design approval, deploy mockups to staging for team review...", epic: "e2", status: "queued", actions: ["Deploy", "Assign to dev", "Dismiss"], aiSuggestion: "Assign to dev", aiConfidence: 0.82, dependsOn: ["t4"], creates: ["t7"] },
];

const SOURCE_ICONS = { gmail: "✉", note: "✎", task: "☐", auto: "⚡" };
const SOURCE_LABELS = { gmail: "Gmail", note: "Voice Note", task: "Manual", auto: "AI Created" };

// ─── Confidence Meter ────────────────────────────────────────────────────────

function ConfidenceMeter({ confidence }) {
  const pct = Math.round(confidence * 100);
  const color = confidence > 0.8 ? "#5BBD72" : confidence > 0.6 ? "#E8B931" : "#D97A4A";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 48, height: 4, background: "#22252B", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 11, color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{pct}%</span>
    </div>
  );
}

// ─── Queue Chip ──────────────────────────────────────────────────────────────

function QueueChip({ task, isActive, isDone, onClick, epic }) {
  const chipColor = isDone ? "#2A3A2A" : isActive ? "#E8B931" : "#1A1D23";
  const borderColor = isDone ? "#3A4A3A" : isActive ? "#E8B931" : "#22252B";
  const textColor = isDone ? "#5A7A5A" : isActive ? "#E8B931" : "#6A7A8A";

  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        background: chipColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 10,
        padding: "8px 14px",
        cursor: "pointer",
        minWidth: 140,
        maxWidth: 200,
        textAlign: "left",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {isDone && (
        <div style={{ position: "absolute", top: 6, right: 8, fontSize: 10, color: "#5BBD72" }}>✓</div>
      )}
      <div style={{ fontSize: 10, color: isDone ? "#4A6A4A" : "#5A6A7A", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
        <span>{SOURCE_ICONS[task.source]}</span>
        {epic && <span style={{ color: epic.color, opacity: 0.7 }}>{epic.icon}</span>}
      </div>
      <div style={{
        fontSize: 12,
        color: textColor,
        fontWeight: isActive ? 600 : 400,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textDecoration: isDone ? "line-through" : "none",
        lineHeight: 1.3,
      }}>
        {task.title}
      </div>
    </button>
  );
}

// ─── Main Active Card ────────────────────────────────────────────────────────

function ActiveCard({ task, epic, onAction, onEpicClick, isBlocked }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    setSelectedAction(null);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [task.id]);

  const handleAction = (action) => {
    setSelectedAction(action);
    setAnimating(true);
    setTimeout(() => {
      onAction(task.id, action);
      setAnimating(false);
    }, 400);
  };

  const blocked = isBlocked;
  const blockerNames = blocked ? task.dependsOn : [];

  return (
    <div style={{
      width: "100%",
      maxWidth: 480,
      opacity: visible ? 1 : 0,
      transform: visible ? (animating ? "translateX(120%) scale(0.9)" : "translateX(0) scale(1)") : "translateX(-40px) scale(0.97)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{
        background: "linear-gradient(165deg, #1E2128 0%, #181B20 100%)",
        borderRadius: 20,
        border: "1px solid #2A2D35",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}>
        {/* Card Header */}
        <div style={{ padding: "20px 22px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{SOURCE_ICONS[task.source]}</span>
              <span style={{ fontSize: 11, color: "#6A7A8A", fontWeight: 500, letterSpacing: "0.05em" }}>
                {SOURCE_LABELS[task.source]}
              </span>
            </div>
            {epic && (
              <button
                onClick={() => onEpicClick(epic.id)}
                style={{
                  background: `${epic.color}15`,
                  border: `1px solid ${epic.color}33`,
                  borderRadius: 8,
                  padding: "5px 12px",
                  color: epic.color,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${epic.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${epic.color}15`; }}
              >
                <span>{epic.icon}</span>
                {epic.title}
                <span style={{ fontSize: 10, opacity: 0.6 }}>→</span>
              </button>
            )}
          </div>

          {task.from && (
            <div style={{ fontSize: 12, color: "#5A6A7A", marginBottom: 6 }}>
              from <span style={{ color: "#8A9AAA" }}>{task.from}</span>
            </div>
          )}

          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#E8E6E1", margin: "0 0 10px", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
            {task.title}
          </h2>

          <p style={{ fontSize: 14, color: "#7A8A99", lineHeight: 1.65, margin: "0 0 18px" }}>
            {task.snippet}
          </p>

          {blocked && (
            <div style={{
              background: "#D97A4A12",
              border: "1px solid #D97A4A33",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ fontSize: 14 }}>⏳</span>
              <span style={{ fontSize: 12, color: "#D97A4A" }}>
                Blocked by {blockerNames.length} task{blockerNames.length > 1 ? "s" : ""} — complete dependencies first
              </span>
            </div>
          )}
        </div>

        {/* AI Suggestion */}
        {task.aiSuggestion && (
          <div style={{ padding: "0 22px 16px" }}>
            <div style={{
              background: "linear-gradient(135deg, #E8B93108 0%, #E8B93103 100%)",
              border: "1px solid #E8B93120",
              borderRadius: 12,
              padding: "12px 16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontSize: 10, color: "#E8B931", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  AI Suggestion
                </div>
                <ConfidenceMeter confidence={task.aiConfidence} />
              </div>
              <div style={{ fontSize: 13, color: "#C8B871", fontWeight: 500 }}>
                → {task.aiSuggestion}
                {task.aiConfidence > 0.9 && (
                  <span style={{ fontSize: 10, color: "#5BBD72", marginLeft: 8, fontWeight: 400 }}>would auto-execute</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ padding: "0 22px 22px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {task.actions.map((action) => {
              const isAI = action === task.aiSuggestion;
              const isSelected = action === selectedAction;
              return (
                <button
                  key={action}
                  onClick={() => !blocked && handleAction(action)}
                  disabled={blocked}
                  style={{
                    background: isSelected ? "#E8B931" : isAI ? "#E8B93118" : "#22252B",
                    border: `1px solid ${isSelected ? "#E8B931" : isAI ? "#E8B93140" : "#2A2D35"}`,
                    borderRadius: 10,
                    padding: "10px 18px",
                    color: isSelected ? "#12141A" : isAI ? "#E8B931" : "#8A9AAA",
                    fontSize: 13,
                    fontWeight: isAI ? 600 : 400,
                    cursor: blocked ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                    opacity: blocked ? 0.4 : 1,
                  }}
                >
                  {isAI && !isSelected && "⚡ "}{action}
                </button>
              );
            })}
          </div>
        </div>

        {/* Task creates follow-ups indicator */}
        {task.creates.length > 0 && (
          <div style={{ padding: "0 22px 16px" }}>
            <div style={{ fontSize: 11, color: "#4A6A8A", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13 }}>⚡</span>
              Completing this will queue {task.creates.length} follow-up task{task.creates.length > 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Epic Header Bar ─────────────────────────────────────────────────────────

function EpicHeader({ epic, taskCounts, onExit }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 18px",
      background: `${epic.color}08`,
      borderBottom: `1px solid ${epic.color}22`,
      marginBottom: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>{epic.icon}</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: epic.color }}>{epic.title}</div>
          <div style={{ fontSize: 11, color: "#5A6A7A" }}>
            {taskCounts.done}/{taskCounts.total} completed · {taskCounts.blocked} blocked
          </div>
        </div>
      </div>
      <button
        onClick={onExit}
        style={{
          background: "#22252B",
          border: "1px solid #2A2D35",
          borderRadius: 8,
          padding: "6px 14px",
          color: "#8A9AAA",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        ← Back to Queue
      </button>
    </div>
  );
}

// ─── Create Follow-Up Modal ──────────────────────────────────────────────────

function CreateFollowUp({ epicId, onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const epic = epicId ? EPICS[epicId] : null;

  return (
    <div style={{
      background: "#1A1D23",
      border: "1px dashed #E8B93144",
      borderRadius: 16,
      padding: 22,
      width: "100%",
      maxWidth: 480,
    }}>
      <div style={{ fontSize: 12, color: "#E8B931", fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em" }}>
        + Create Follow-Up Task {epic && <span style={{ color: epic.color }}>in {epic.title}</span>}
      </div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What needs to happen next?"
        autoFocus
        style={{
          width: "100%",
          background: "#12141A",
          border: "1px solid #2A2D35",
          borderRadius: 10,
          padding: "12px 16px",
          color: "#E8E6E1",
          fontSize: 14,
          boxSizing: "border-box",
          fontFamily: "inherit",
          marginBottom: 12,
        }}
        onKeyDown={e => { if (e.key === "Enter" && title.trim()) { onAdd(title.trim()); setTitle(""); }}}
      />
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ background: "transparent", border: "1px solid #2A2D35", borderRadius: 8, padding: "7px 14px", color: "#6A7A8A", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Cancel</button>
        <button
          onClick={() => { if (title.trim()) { onAdd(title.trim()); setTitle(""); }}}
          style={{ background: "#E8B931", border: "none", borderRadius: 8, padding: "7px 14px", color: "#12141A", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", opacity: title.trim() ? 1 : 0.4 }}
        >Add Task</button>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function TaskCardQueue() {
  const [tasks, setTasks] = useState(ALL_TASKS);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const [epicFilter, setEpicFilter] = useState(null); // null = priority queue, "e1" = epic view
  const [showCreateFollowUp, setShowCreateFollowUp] = useState(false);
  const queueRef = useRef(null);
  const activeChipRef = useRef(null);

  // Derive the visible queue
  const queue = epicFilter
    ? tasks.filter(t => t.epic === epicFilter).sort((a, b) => {
        // Dependency order: tasks with no deps first, then by dep chain
        const aBlocked = a.dependsOn.some(d => !completedIds.has(d));
        const bBlocked = b.dependsOn.some(d => !completedIds.has(d));
        if (aBlocked !== bBlocked) return aBlocked ? 1 : -1;
        return 0;
      })
    : tasks.filter(t => t.status !== "queued" || completedIds.has(t.dependsOn[0]));

  const activeTask = queue[activeIndex];

  // Scroll active chip into view
  useEffect(() => {
    if (activeChipRef.current && queueRef.current) {
      const container = queueRef.current;
      const chip = activeChipRef.current;
      const chipLeft = chip.offsetLeft;
      const chipWidth = chip.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTarget = chipLeft - containerWidth / 2 + chipWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, [activeIndex, epicFilter]);

  const handleAction = useCallback((taskId, action) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.add(taskId);
      return next;
    });

    // Check if completing this task unlocks queued follow-ups
    const task = tasks.find(t => t.id === taskId);
    if (task?.creates.length > 0) {
      setTasks(prev => prev.map(t =>
        task.creates.includes(t.id) ? { ...t, status: "pending" } : t
      ));
    }

    // Move to next uncompleted task
    setTimeout(() => {
      setActiveIndex(prev => {
        const nextQueue = epicFilter
          ? tasks.filter(t => t.epic === epicFilter)
          : tasks;
        for (let i = prev + 1; i < nextQueue.length; i++) {
          const t = nextQueue[i];
          if (!completedIds.has(t.id) && t.id !== taskId) return i;
        }
        // Wrap around
        for (let i = 0; i <= prev; i++) {
          const t = nextQueue[i];
          if (!completedIds.has(t.id) && t.id !== taskId) return i;
        }
        return prev;
      });
    }, 100);
  }, [tasks, completedIds, epicFilter]);

  const handleEpicClick = (epicId) => {
    setEpicFilter(epicId);
    setActiveIndex(0);
    setShowCreateFollowUp(false);
  };

  const handleExitEpic = () => {
    setEpicFilter(null);
    setActiveIndex(0);
    setShowCreateFollowUp(false);
  };

  const handleAddFollowUp = (title) => {
    const newTask = {
      id: `t${Date.now()}`,
      title,
      source: "task",
      from: null,
      snippet: "Manually created follow-up task",
      epic: epicFilter,
      status: "pending",
      actions: ["Complete", "Delegate", "Defer"],
      aiSuggestion: null,
      aiConfidence: 0,
      dependsOn: [],
      creates: [],
    };
    setTasks(prev => [...prev, newTask]);
    setShowCreateFollowUp(false);
  };

  const allDoneInView = queue.every(t => completedIds.has(t.id));
  const epic = epicFilter ? EPICS[epicFilter] : null;
  const epicTaskCounts = epic ? {
    total: queue.length,
    done: queue.filter(t => completedIds.has(t.id)).length,
    blocked: queue.filter(t => t.dependsOn.some(d => !completedIds.has(d))).length,
  } : null;

  return (
    <div style={{ minHeight: "100vh", background: "#12141A", fontFamily: "'DM Sans', sans-serif", color: "#E8E6E1", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top Bar */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1E2128", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, color: "#4A5A6A", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>TaskCard</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1", marginTop: 2 }}>
            {epicFilter ? "Epic View" : "Priority Queue"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#5A6A7A" }}>
            <span style={{ color: "#5BBD72", fontWeight: 600 }}>{completedIds.size}</span>
            <span style={{ margin: "0 3px" }}>/</span>
            <span>{queue.length}</span>
          </div>
          {/* Progress ring */}
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="11" fill="none" stroke="#22252B" strokeWidth="2.5" />
            <circle
              cx="14" cy="14" r="11" fill="none" stroke="#5BBD72" strokeWidth="2.5"
              strokeDasharray={`${(completedIds.size / Math.max(queue.length, 1)) * 69.1} 69.1`}
              strokeLinecap="round"
              transform="rotate(-90 14 14)"
              style={{ transition: "stroke-dasharray 0.5s ease" }}
            />
          </svg>
        </div>
      </div>

      {/* Epic Header */}
      {epic && <EpicHeader epic={epic} taskCounts={epicTaskCounts} onExit={handleExitEpic} />}

      {/* Main Card Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px", gap: 20 }}>
        {allDoneInView ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#E8E6E1", marginBottom: 8 }}>
              {epicFilter ? "Epic Complete!" : "All Clear!"}
            </div>
            <div style={{ fontSize: 14, color: "#5A6A7A", marginBottom: 20 }}>
              {epicFilter ? "All tasks in this epic are done." : "No more tasks in your queue."}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {epicFilter && (
                <button onClick={handleExitEpic} style={{ background: "#22252B", border: "1px solid #2A2D35", borderRadius: 10, padding: "10px 20px", color: "#8A9AAA", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                  ← Back to Queue
                </button>
              )}
              <button
                onClick={() => setShowCreateFollowUp(true)}
                style={{ background: "#E8B93118", border: "1px solid #E8B93140", borderRadius: 10, padding: "10px 20px", color: "#E8B931", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}
              >
                + Add Follow-Up
              </button>
            </div>
          </div>
        ) : showCreateFollowUp ? (
          <CreateFollowUp epicId={epicFilter} onAdd={handleAddFollowUp} onClose={() => setShowCreateFollowUp(false)} />
        ) : activeTask ? (
          <>
            {/* Nav hint */}
            <div style={{ fontSize: 11, color: "#3A4A5A", display: "flex", alignItems: "center", gap: 16 }}>
              <span>{activeIndex + 1} of {queue.length}</span>
              {activeTask.dependsOn.length > 0 && (
                <span style={{ color: "#D97A4A88" }}>
                  {activeTask.dependsOn.filter(d => !completedIds.has(d)).length > 0 ? "● blocked" : "● unblocked"}
                </span>
              )}
            </div>
            <ActiveCard
              task={activeTask}
              epic={activeTask.epic ? EPICS[activeTask.epic] : null}
              onAction={handleAction}
              onEpicClick={handleEpicClick}
              isBlocked={activeTask.dependsOn.some(d => !completedIds.has(d))}
            />
            {/* Inline follow-up creation */}
            {!showCreateFollowUp && (
              <button
                onClick={() => setShowCreateFollowUp(true)}
                style={{
                  background: "transparent",
                  border: "1px dashed #2A2D35",
                  borderRadius: 10,
                  padding: "8px 16px",
                  color: "#3A4A5A",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#E8B93144"; e.currentTarget.style.color = "#E8B93188"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A2D35"; e.currentTarget.style.color = "#3A4A5A"; }}
              >
                + Create follow-up task
              </button>
            )}
            {showCreateFollowUp && (
              <CreateFollowUp epicId={epicFilter} onAdd={handleAddFollowUp} onClose={() => setShowCreateFollowUp(false)} />
            )}
          </>
        ) : null}
      </div>

      {/* Bottom Queue */}
      <div style={{
        borderTop: "1px solid #1E2128",
        background: "linear-gradient(180deg, #14161C 0%, #12141A 100%)",
        padding: "14px 0",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#3A4A5A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {epicFilter ? `${EPICS[epicFilter].icon} ${EPICS[epicFilter].title}` : "Queue"}
          </div>
          {!epicFilter && (
            <div style={{ display: "flex", gap: 6 }}>
              {Object.values(EPICS).map(e => {
                const count = tasks.filter(t => t.epic === e.id).length;
                return (
                  <button
                    key={e.id}
                    onClick={() => handleEpicClick(e.id)}
                    style={{
                      background: `${e.color}10`,
                      border: `1px solid ${e.color}22`,
                      borderRadius: 6,
                      padding: "3px 10px",
                      color: e.color,
                      fontSize: 10,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {e.icon} {count}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div
          ref={queueRef}
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            padding: "0 20px 6px",
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {queue.map((task, idx) => (
            <div key={task.id} ref={idx === activeIndex ? activeChipRef : null}>
              <QueueChip
                task={task}
                isActive={idx === activeIndex && !allDoneInView}
                isDone={completedIds.has(task.id)}
                onClick={() => { if (!completedIds.has(task.id)) setActiveIndex(idx); }}
                epic={task.epic ? EPICS[task.epic] : null}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
