"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

interface WaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  source?: string | null;
  created_at: string;
}

interface FeedbackProfile {
  id: string;
  full_name: string | null;
  profile_picture_url: string | null;
  email?: string | null;
}

interface FeedbackAttachment {
  id: string;
  storage_path: string;
  public_url: string;
  file_name: string;
  file_type: "image" | "video" | "audio" | "document";
  mime_type: string;
  file_size_bytes: number;
}

interface FeedbackComment {
  id: string;
  feedback_id: string;
  user_id: string;
  body: string;
  is_admin_reply: boolean;
  created_at: string;
  profiles: FeedbackProfile | null;
}

interface FeedbackEntry {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  hearts_count: number;
  comments_count: number;
  attachments_count: number;
  created_at: string;
  updated_at: string;
  profiles: FeedbackProfile | null;
  attachments: FeedbackAttachment[];
  comments: FeedbackComment[];
}

type Category = "bug" | "feature" | "improvement" | "question" | "other";
type Priority = "low" | "medium" | "high" | "critical";
type Status = "open" | "in_progress" | "resolved" | "closed" | "wont_fix";
type CategoryFilter = Category | "all";
type StatusFilter = Status | "all";
type SortBy = "newest" | "most_liked";

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature Request" },
  { value: "improvement", label: "Improvement" },
  { value: "question", label: "Question" },
  { value: "other", label: "General" },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "open", label: "Pending" },
  { value: "in_progress", label: "In Review" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "wont_fix", label: "Won't fix" },
];

const CATEGORY_LABELS: Record<Category, string> = {
  bug: "Bug",
  feature: "Feature Request",
  improvement: "Improvement",
  question: "Question",
  other: "General",
};

const STATUS_LABELS: Record<Status, string> = {
  open: "Pending",
  in_progress: "In Review",
  resolved: "Resolved",
  closed: "Closed",
  wont_fix: "Won't fix",
};

const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  open: { bg: "rgba(255, 165, 0, 0.15)", text: "#FFA500" },
  in_progress: { bg: "rgba(33, 150, 243, 0.15)", text: "#2196F3" },
  resolved: { bg: "rgba(76, 175, 80, 0.15)", text: "#4CAF50" },
  closed: { bg: "rgba(158, 158, 158, 0.15)", text: "#9E9E9E" },
  wont_fix: { bg: "rgba(244, 67, 54, 0.15)", text: "#F44336" },
};

const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  bug: { bg: "rgba(244, 67, 54, 0.15)", text: "#F44336" },
  feature: { bg: "rgba(33, 150, 243, 0.15)", text: "#2196F3" },
  improvement: { bg: "rgba(255, 193, 7, 0.15)", text: "#FFC107" },
  question: { bg: "rgba(155, 89, 182, 0.15)", text: "#9B59B6" },
  other: { bg: "rgba(158, 158, 158, 0.15)", text: "#9E9E9E" },
};

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Last week";
  if (diffDays <= 30) return "Last month";
  return date.toLocaleDateString();
}

// =============================================================================
// SVG icons matching ionicons style — copied from binate-web
// =============================================================================

function HeartIcon({ filled, className }: { filled?: boolean; className?: string }) {
  if (filled) {
    return (
      <svg className={className} width="16" height="16" viewBox="0 0 512 512" fill="#F44336">
        <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.83 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
      </svg>
    );
  }
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
      <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
      <path d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a42.63 42.63 0 00-2.54-3.8 199.81 199.81 0 01-33-110C48.3 139.17 140.55 48 256 48s207.7 91.17 207.7 203.34-92.25 203.34-207.7 203.34a210.53 210.53 0 01-84.43-17.64 43.83 43.83 0 00-18.22-4.21 43.54 43.54 0 00-14.55 2.58L64.67 459l22.81-79z" />
    </svg>
  );
}

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
      <path d="M216.08 192v143.85a40.08 40.08 0 0080.15 0l.13-188.55a67.94 67.94 0 10-135.87 0v189.82a95.51 95.51 0 10191 0V176.59" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round">
      <path d="M112 184l144 144 144-144" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 512 512" fill="none" stroke="#2196F3" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
      <path d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 256 462 256 462s223.3-92.87 207.1-349.63z" />
      <path d="M192 240l48 48 80-80" stroke="#2196F3" strokeWidth="32" fill="none" />
    </svg>
  );
}

// =============================================================================
// Dropdown components
// =============================================================================

function Dropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-cream/30 transition-colors min-w-[140px] justify-between text-foreground"
      >
        <span>{selected?.label}</span>
        <ChevronDownIcon className={`text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === opt.value
                  ? "bg-brand-orange/10 text-brand-orange font-medium"
                  : "text-foreground hover:bg-cream/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusDropdown({
  value,
  onChange,
}: {
  value: Status;
  onChange: (value: Status) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const color = STATUS_COLORS[value];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-opacity hover:opacity-80"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {STATUS_LABELS[value]}
        <ChevronDownIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden min-w-[140px]">
          {(["open", "in_progress", "resolved", "closed", "wont_fix"] as const).map((st) => {
            const c = STATUS_COLORS[st];
            return (
              <button
                key={st}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(st);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2 ${
                  value === st ? "bg-cream/30" : "hover:bg-cream/30"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.text }} />
                <span style={{ color: c.text }}>{STATUS_LABELS[st]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Main page
// =============================================================================

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"waitlist" | "feedback">("waitlist");

  // Filters
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>("all");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  // Admin comment
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [adminComment, setAdminComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setStoredPassword(password);
        setAuthenticated(true);
        const { data } = await res.json();
        setWaitlist(data || []);
      } else {
        setAuthError("Wrong password");
      }
    } finally {
      setAuthLoading(false);
    }
  }

  const fetchWaitlist = useCallback(async () => {
    if (!storedPassword) return;
    setLoading(true);

    const res = await fetch("/api/admin/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: storedPassword }),
    });

    if (res.ok) {
      const { data } = await res.json();
      setWaitlist(data || []);
    }
    setLoading(false);
  }, [storedPassword]);

  const fetchFeedback = useCallback(async () => {
    if (!storedPassword) return;

    const res = await fetch("/api/admin/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: storedPassword, action: "list" }),
    });

    if (res.ok) {
      const { data } = await res.json();
      setFeedback(data || []);
    }
  }, [storedPassword]);

  useEffect(() => {
    if (authenticated && storedPassword) {
      Promise.resolve().then(() => {
        fetchWaitlist();
        fetchFeedback();
      });
    }
  }, [authenticated, storedPassword, fetchWaitlist, fetchFeedback]);

  const filteredFeedback = useMemo(() => {
    let result = [...feedback];

    if (filterCategory !== "all") result = result.filter((f) => f.category === filterCategory);
    if (filterStatus !== "all") result = result.filter((f) => f.status === filterStatus);

    if (sortBy === "most_liked") {
      result.sort((a, b) => b.hearts_count - a.hearts_count);
    }
    return result;
  }, [feedback, filterCategory, filterStatus, sortBy]);

  async function updateStatus(feedbackId: string, newStatus: Status) {
    const res = await fetch("/api/admin/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: storedPassword,
        action: "update_status",
        feedbackId,
        status: newStatus,
      }),
    });

    if (res.ok) {
      setFeedback((prev) =>
        prev.map((f) => (f.id === feedbackId ? { ...f, status: newStatus } : f)),
      );
    }
  }

  async function submitAdminComment(feedbackId: string) {
    if (!adminComment.trim()) return;
    setSubmitting(true);

    const res = await fetch("/api/admin/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: storedPassword,
        action: "add_comment",
        feedbackId,
        comment: adminComment.trim(),
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      setAdminComment("");
      setCommentingOn(null);
      await fetchFeedback();
    } else {
      alert(json.error || "Failed to send reply");
    }
    setSubmitting(false);
  }

  function exportCSV() {
    const csv = [
      "email,name,joined",
      ...waitlist.map(
        (w) =>
          `${w.email},${w.name || ""},${new Date(w.created_at).toLocaleDateString()}`,
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `happydose-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-background">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-foreground">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-brand-orange transition-colors"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="w-full px-5 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? "Checking..." : "Login"}
            </button>
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-10 bg-background text-foreground">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">HappyDose Admin</h1>
            <p className="text-muted text-sm mt-1">Manage your waitlist and tester feedback</p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Back to site
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-surface rounded-xl w-fit">
          <button
            onClick={() => setTab("waitlist")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "waitlist"
                ? "bg-brand-orange text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            Waitlist ({waitlist.length})
          </button>
          <button
            onClick={() => setTab("feedback")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "feedback"
                ? "bg-brand-orange text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            Feedback ({feedback.length})
          </button>
        </div>

        {/* Waitlist Tab */}
        {tab === "waitlist" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Waitlist Entries</h2>
              <div className="flex gap-3">
                <button
                  onClick={fetchWaitlist}
                  className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-cream/30 transition-colors"
                >
                  Refresh
                </button>
                <button
                  onClick={exportCSV}
                  disabled={waitlist.length === 0}
                  className="text-sm px-4 py-2 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-medium transition-colors disabled:opacity-50"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-muted py-12 text-center">Loading...</div>
            ) : waitlist.length === 0 ? (
              <div className="text-muted py-12 text-center border border-border rounded-2xl">
                No waitlist entries yet.
              </div>
            ) : (
              <div className="border border-border rounded-2xl overflow-hidden bg-surface">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="text-left px-5 py-3 font-medium text-muted">Email</th>
                      <th className="text-left px-5 py-3 font-medium text-muted">Name</th>
                      <th className="text-left px-5 py-3 font-medium text-muted">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-border/50 hover:bg-cream/30 transition-colors"
                      >
                        <td className="px-5 py-3 font-mono text-brand-orange">{entry.email}</td>
                        <td className="px-5 py-3 text-foreground/70">{entry.name || "—"}</td>
                        <td className="px-5 py-3 text-muted">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Feedback Tab */}
        {tab === "feedback" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Feedback</h2>
              <button
                onClick={fetchFeedback}
                className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-cream/30 transition-colors"
              >
                Refresh
              </button>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Dropdown
                value={filterCategory}
                options={CATEGORY_OPTIONS}
                onChange={(v) => setFilterCategory(v as CategoryFilter)}
              />
              <Dropdown
                value={filterStatus}
                options={STATUS_OPTIONS}
                onChange={(v) => setFilterStatus(v as StatusFilter)}
              />
              <div className="flex gap-1 p-1 bg-surface rounded-xl">
                <button
                  onClick={() => setSortBy("newest")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    sortBy === "newest"
                      ? "bg-brand-orange text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy("most_liked")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    sortBy === "most_liked"
                      ? "bg-brand-orange text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Most Liked
                </button>
              </div>

              {(filterCategory !== "all" || filterStatus !== "all") && (
                <span className="text-xs text-muted ml-auto">
                  {filteredFeedback.length} of {feedback.length}
                </span>
              )}
            </div>

            {feedback.length === 0 ? (
              <div className="text-muted py-12 text-center border border-border rounded-2xl">
                No feedback from testers yet.
              </div>
            ) : filteredFeedback.length === 0 ? (
              <div className="text-muted py-12 text-center border border-border rounded-2xl">
                No feedback matching filters.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedback.map((f) => {
                  const statusColor = STATUS_COLORS[f.status];
                  const categoryColor = CATEGORY_COLORS[f.category];
                  const isExpanded = expandedFeedback === f.id;

                  return (
                    <div key={f.id} className="rounded-3xl bg-cream/40 p-1.5">
                      {/* Card */}
                      <div className="rounded-2xl bg-surface p-5">
                        {/* Title */}
                        <button
                          onClick={() => setExpandedFeedback(isExpanded ? null : f.id)}
                          className="w-full text-left"
                        >
                          <h3 className="text-base font-semibold mb-1.5 leading-snug text-foreground">
                            {f.title}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                            {f.description}
                          </p>
                        </button>

                        {/* Attachments preview row */}
                        {f.attachments.length > 0 && (
                          <div className="flex gap-2 mb-4">
                            {f.attachments.map((a) => (
                              <a
                                key={a.id}
                                href={a.public_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-lg bg-background flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
                              >
                                {a.file_type === "image" ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={a.public_url}
                                    alt={a.file_name}
                                    className="w-12 h-12 object-cover"
                                  />
                                ) : (
                                  <PaperclipIcon className="text-brand-orange" />
                                )}
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Bottom row: user info left | status + meta right */}
                        <div className="flex items-center justify-between">
                          {/* Left: avatar + name + date */}
                          <div className="flex items-center gap-3">
                            {f.profiles?.profile_picture_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={f.profiles.profile_picture_url}
                                alt={f.profiles.full_name || "User"}
                                className="w-9 h-9 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                                style={{ backgroundColor: "var(--brand-orange, #FF6915)" }}
                              >
                                {(f.profiles?.full_name?.charAt(0) || "?").toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium leading-tight text-foreground">
                                {f.profiles?.full_name || "Unknown"}
                              </p>
                              <p className="text-xs text-muted leading-tight">
                                {formatRelativeDate(f.created_at)}
                              </p>
                            </div>
                          </div>

                          {/* Right: category, status, comments, hearts */}
                          <div className="flex items-center gap-2.5">
                            <span
                              className="px-2 py-1 rounded-full text-[11px] font-medium hidden sm:inline-block"
                              style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
                            >
                              {CATEGORY_LABELS[f.category]}
                            </span>

                            {isExpanded ? (
                              <StatusDropdown value={f.status} onChange={(st) => updateStatus(f.id, st)} />
                            ) : (
                              <span
                                className="px-2 py-1 rounded-full text-[11px] font-medium"
                                style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                              >
                                {STATUS_LABELS[f.status]}
                              </span>
                            )}

                            <span className="flex items-center gap-1 text-muted">
                              <ChatIcon />
                              <span className="text-xs">{f.comments_count}</span>
                            </span>

                            <span className="flex items-center gap-1">
                              <HeartIcon filled={f.hearts_count > 0} />
                              <span className="text-xs text-muted">{f.hearts_count}</span>
                            </span>

                            <span
                              className={`text-muted transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            >
                              <ChevronDownIcon />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded section */}
                      {isExpanded && (
                        <div className="mt-1.5 rounded-2xl bg-surface p-5 space-y-4">
                          <div>
                            <p className="text-xs text-muted font-medium mb-1">Full Details</p>
                            <p className="text-sm whitespace-pre-wrap text-foreground">
                              {f.description}
                            </p>
                          </div>

                          <div className="border-t border-border" />

                          {/* Conversation Thread */}
                          <div>
                            <p className="text-xs text-muted font-medium mb-3">
                              Conversation ({f.comments.length})
                            </p>

                            {f.comments.length > 0 && (
                              <div className="space-y-2.5 mb-4">
                                {f.comments.map((c) => (
                                  <div
                                    key={c.id}
                                    className={`rounded-2xl p-4 ${
                                      c.is_admin_reply
                                        ? "border border-[#2196F3]/20"
                                        : "bg-background"
                                    }`}
                                    style={
                                      c.is_admin_reply
                                        ? { backgroundColor: "rgba(33, 150, 243, 0.08)" }
                                        : undefined
                                    }
                                  >
                                    <div className="flex items-center gap-2 mb-1.5">
                                      {c.is_admin_reply ? (
                                        <div className="w-7 h-7 rounded-full bg-[#2196F3] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                          A
                                        </div>
                                      ) : c.profiles?.profile_picture_url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                          src={c.profiles.profile_picture_url}
                                          alt={c.profiles.full_name || "User"}
                                          className="w-7 h-7 rounded-full object-cover shrink-0"
                                        />
                                      ) : (
                                        <div
                                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                          style={{ backgroundColor: "var(--brand-orange, #FF6915)" }}
                                        >
                                          {(c.profiles?.full_name?.charAt(0) || "?").toUpperCase()}
                                        </div>
                                      )}
                                      <span className="text-sm font-medium text-foreground">
                                        {c.is_admin_reply
                                          ? "HappyDose Team"
                                          : c.profiles?.full_name || "Unknown"}
                                      </span>
                                      {c.is_admin_reply && (
                                        <span className="flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md bg-[#2196F3]/15 text-[#2196F3] font-medium">
                                          <ShieldIcon className="w-3 h-3" />
                                          Admin
                                        </span>
                                      )}
                                      <span className="text-xs text-muted ml-auto">
                                        {formatRelativeDate(c.created_at)}
                                      </span>
                                    </div>
                                    <p className="text-sm whitespace-pre-wrap pl-9 text-foreground">
                                      {c.body}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Admin reply input */}
                            {commentingOn === f.id ? (
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <div className="w-7 h-7 rounded-full bg-[#2196F3] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">
                                    A
                                  </div>
                                  <textarea
                                    value={adminComment}
                                    onChange={(e) => setAdminComment(e.target.value)}
                                    placeholder="Write your reply..."
                                    rows={3}
                                    className="flex-1 px-4 py-3 rounded-2xl bg-background border border-border text-sm placeholder:text-muted focus:outline-none focus:border-brand-orange transition-colors resize-none text-foreground"
                                    autoFocus
                                  />
                                </div>
                                <div className="flex gap-2 pl-10">
                                  <button
                                    onClick={() => submitAdminComment(f.id)}
                                    disabled={!adminComment.trim() || submitting}
                                    className="text-sm px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-medium transition-colors disabled:opacity-50"
                                  >
                                    {submitting ? "Sending..." : "Send"}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setCommentingOn(null);
                                      setAdminComment("");
                                    }}
                                    className="text-sm px-4 py-2 rounded-xl border border-border hover:bg-background text-muted transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setCommentingOn(f.id)}
                                className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-border hover:bg-background text-muted hover:text-foreground transition-colors"
                              >
                                <ShieldIcon className="w-4 h-4" />
                                Reply
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
