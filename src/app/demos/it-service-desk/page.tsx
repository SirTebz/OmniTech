"use client";

import React, { useState, useEffect } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import {
  initialHelpdeskTickets,
  SupportTicket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  sampleTechnicians,
} from "@/data/demo/helpdesk/initialTickets";
import {
  Headphones,
  Search,
  PlusCircle,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Send,
  MessageSquare,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const STORAGE_KEY = "omnitech_demo_helpdesk_v1";

export default function ITServiceDeskPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialHelpdeskTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("ticket-001");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // New Ticket Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<TicketCategory>("Hardware");
  const [newPriority, setNewPriority] = useState<TicketPriority>("Medium");
  const [newReporter, setNewReporter] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Comment State
  const [newComment, setNewComment] = useState("");

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTickets(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save on state change
  const saveTickets = (updated: SupportTicket[]) => {
    setTickets(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    saveTickets(initialHelpdeskTickets);
    setSelectedTicketId(initialHelpdeskTickets[0].id);
  };

  // Filtered tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === "All" || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  // Ticket actions
  const handleStatusChange = (newStatus: TicketStatus) => {
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    saveTickets(updated);
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            priority: newPriority,
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    saveTickets(updated);
  };

  const handleAssignTechnician = (tech: string) => {
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            assignedTechnician: tech,
            status: t.status === "Open" ? "Assigned" : t.status,
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    saveTickets(updated);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: `c-${Date.now()}`,
      author: "Tebogo Z. (Senior Support Specialist)",
      authorRole: "Technician" as const,
      timestamp: new Date().toISOString(),
      message: newComment.trim(),
    };

    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            comments: [...t.comments, comment],
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    saveTickets(updated);
    setNewComment("");
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim() || !newReporter.trim()) return;

    const newTicket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: newCategory,
      priority: newPriority,
      status: "Open",
      reporterName: newReporter.trim(),
      reporterEmail: newEmail.trim() || "support.request@client.co.za",
      assignedTechnician: "Tebogo Z. (Senior Support Specialist)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slaDueHours: newPriority === "Critical" ? 2 : newPriority === "High" ? 4 : 8,
      comments: [
        {
          id: `c-${Date.now()}`,
          author: newReporter.trim(),
          authorRole: "User",
          timestamp: new Date().toISOString(),
          message: "Ticket submitted via OmniDesk portal.",
        },
      ],
    };

    const updated = [newTicket, ...tickets];
    saveTickets(updated);
    setSelectedTicketId(newTicket.id);
    setIsModalOpen(false);

    // Reset fields
    setNewTitle("");
    setNewDesc("");
    setNewReporter("");
    setNewEmail("");
  };

  // Metrics
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open" || t.status === "Assigned").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length;
  const criticalCount = tickets.filter((t) => t.priority === "Critical" && t.status !== "Resolved" && t.status !== "Closed").length;

  return (
    <DemoShell
      title="OmniDesk — IT Service Desk"
      badge="IT Support & Helpdesk"
      category="IT Support"
      description="An interactive IT service desk simulation demonstrating ticket lifecycle triage, technician workload assignment, priority escalation, and troubleshooting resolution notes."
      onReset={handleReset}
    >
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Total Tickets</span>
            <Headphones className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{totalCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Open & Queue</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-500">{openCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">In Progress</span>
            <UserCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-500">{inProgressCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Critical Triage</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-500">{criticalCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Resolved / Closed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">{resolvedCount}</div>
        </div>
      </div>

      {/* Main Workspace: Left Ticket List, Right Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search, Filters, and Ticket Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search ticket #, subject, reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Log Ticket</span>
              </button>
            </div>

            {/* Filter selectors */}
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1.5 rounded-md bg-background border border-border text-foreground"
              >
                <option value="All">Status: All</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-2 py-1.5 rounded-md bg-background border border-border text-foreground"
              >
                <option value="All">Priority: All</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2 py-1.5 rounded-md bg-background border border-border text-foreground"
              >
                <option value="All">Category: All</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Email / Microsoft 365">M365</option>
                <option value="Printer">Printer</option>
              </select>
            </div>
          </div>

          {/* Ticket Feed */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-card border border-border text-muted-foreground text-xs">
                No tickets match the selected filters.
              </div>
            ) : (
              filteredTickets.map((ticket) => {
                const isSelected = ticket.id === selectedTicket?.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-accent/70 border-blue-500 shadow-sm"
                        : "bg-card border-border hover:border-neutral-400 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-foreground">
                        {ticket.ticketNumber}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            ticket.priority === "Critical"
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              : ticket.priority === "High"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : "bg-neutral-500/10 text-muted-foreground border border-neutral-500/20"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            ticket.status === "Resolved" || ticket.status === "Closed"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : ticket.status === "In Progress"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 mb-1">
                      {ticket.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                      <span>{ticket.category}</span>
                      <span>{ticket.reporterName.split(" ")[0]}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Ticket Detail Workspace */}
        {selectedTicket && (
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 sm:p-6 rounded-xl bg-card border border-border space-y-5">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-500">
                      {selectedTicket.ticketNumber}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      Logged {new Date(selectedTicket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    {selectedTicket.title}
                  </h2>
                </div>

                {/* Priority Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">Priority:</span>
                  <select
                    value={selectedTicket.priority}
                    onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
                    className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-background border border-border"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Workflow Status Strip */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Update Ticket Lifecycle
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["Open", "Assigned", "In Progress", "Pending", "Resolved", "Closed"] as TicketStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                          selectedTicket.status === st
                            ? "bg-foreground text-background font-bold border-foreground"
                            : "bg-background text-muted-foreground border-border hover:text-foreground"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-lg bg-background border border-border space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>Reporter: {selectedTicket.reporterName} ({selectedTicket.reporterEmail})</span>
                  <span>Category: {selectedTicket.category}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Assignment & SLA Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-background border border-border text-xs font-mono">
                <div>
                  <span className="block text-muted-foreground mb-1">Assigned Support Technician:</span>
                  <select
                    value={selectedTicket.assignedTechnician}
                    onChange={(e) => handleAssignTechnician(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-card border border-border text-foreground font-medium"
                  >
                    {sampleTechnicians.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-muted-foreground mb-1">SLA Target Window:</span>
                  <div className="flex items-center gap-2 py-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-foreground">
                      {selectedTicket.slaDueHours} Hour Target Response / Resolution
                    </span>
                  </div>
                </div>
              </div>

              {/* Resolution Notes (if present) */}
              {selectedTicket.resolutionNotes && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Official Resolution Note:
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">
                    {selectedTicket.resolutionNotes}
                  </p>
                </div>
              )}

              {/* Activity Timeline & Notes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Activity & Investigation Notes ({selectedTicket.comments.length})</span>
                </h4>

                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {selectedTicket.comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-lg bg-background border border-border text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-muted-foreground font-mono text-[11px]">
                        <span className="font-semibold text-foreground">{c.author}</span>
                        <span>{new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-foreground leading-relaxed">{c.message}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Box */}
                <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add technician troubleshooting note or diagnostic update..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shrink-0"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Log Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Log New IT Support Ticket</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium mb-1 text-foreground">Issue Title / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laptop battery draining rapidly after Windows update"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-foreground">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TicketCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Network">Network</option>
                    <option value="Email / Microsoft 365">Email / Microsoft 365</option>
                    <option value="Account Access">Account Access</option>
                    <option value="Printer">Printer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-foreground">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Low">Low (General)</option>
                    <option value="Medium">Medium (Affects single user)</option>
                    <option value="High">High (Impacting team work)</option>
                    <option value="Critical">Critical (System outage)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-foreground">Reporter Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thabo Ndaba"
                    value={newReporter}
                    onChange={(e) => setNewReporter(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-foreground">Reporter Email</label>
                  <input
                    type="email"
                    placeholder="t.ndaba@sample.co.za"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-foreground">Detailed Problem Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe symptoms, error codes, and troubleshooting steps already attempted..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Submit Support Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
