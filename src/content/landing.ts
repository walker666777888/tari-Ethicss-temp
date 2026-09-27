// All landing page copy and facts live here so real values can replace placeholders in one place.

export const contact = {
  // Where the "Connect with us" buttons send enquiries.
  connectEmail: "prachi.dutta@tari.co.in",
  // PLACEHOLDER: replace with the real published hotline number.
  hotline: "+91 00000 00000",
  hotlineHref: "tel:+910000000000",
  // PLACEHOLDER: each client organisation gets its own reporting link.
  reportingLink: "https://report.yourorganisation.example",
  isPlaceholder: true,
};

// PENDING CONFIRMATION: only ship this if TARI holds a current SOC 2 Type II report.
export const certification = {
  show: false,
  name: "SOC 2 Type II",
  line: "Independently audited controls for security, availability and confidentiality.",
};

// Real client names only. Section stays hidden while empty.
export const clientLogos: { name: string; src: string }[] = [];

// Real numbers only. Section stays hidden while empty.
export const stats: { value: string; label: string }[] = [];

export const nav = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#safeguards", label: "Safeguards" },
];

export type AuditEntry = { time: string; action: string; detail: string };

// Synthetic sample record used to demonstrate the case file.
export const sampleCase = {
  number: "RPT-2026-0142",
  source: "Phone hotline",
  received: "25 Sep 2026, 10:42 IST",
  category: "Conflict of interest",
  severity: "High",
  department: "Procurement",
  admin: "R. Iyer",
  investigator: "A. Menon",
};

export const heroLog: AuditEntry[] = [
  { time: "10:42:07", action: "call.received", detail: "Hotline call, 6:12, fingerprint stored" },
  { time: "10:49:31", action: "case.created", detail: "by R. Iyer, compliance admin" },
  { time: "10:50:02", action: "case.assigned", detail: "to A. Menon, investigator" },
  { time: "11:15:44", action: "recording.played", detail: "by A. Menon, signed link" },
  { time: "11:20:10", action: "evidence.uploaded", detail: "vendor_invoice_0381.pdf" },
];

export type Stage = {
  status: string;
  title: string;
  body: string;
  who: string;
  log: AuditEntry[];
};

export const stages: Stage[] = [
  {
    status: "New",
    title: "A report becomes a case",
    body: "A compliance admin reviews the call or link submission and opens a case with its source, category, severity and department. It receives a permanent number that never changes.",
    who: "Compliance admin",
    log: [
      { time: "10:42:07", action: "call.received", detail: "Hotline call, 6:12" },
      { time: "10:49:31", action: "case.created", detail: "RPT-2026-0142" },
    ],
  },
  {
    status: "Assigned",
    title: "The right people, and only them",
    body: "The admin assigns one or more investigators. From that moment they can open this case, and the database will not show them any case they are not on.",
    who: "Compliance admin",
    log: [{ time: "10:50:02", action: "case.assigned", detail: "to A. Menon" }],
  },
  {
    status: "In progress",
    title: "The work happens inside the case",
    body: "Investigators listen to the recording, review evidence, keep notes and message each other in the case thread. Every view, play and download is written to the log.",
    who: "Investigators",
    log: [
      { time: "11:15:44", action: "recording.played", detail: "by A. Menon" },
      { time: "11:20:10", action: "evidence.uploaded", detail: "vendor_invoice_0381.pdf" },
      { time: "14:02:55", action: "message.sent", detail: "by A. Menon to case thread" },
    ],
  },
  {
    status: "Resolved",
    title: "Findings go on the record",
    body: "The outcome and findings are recorded against the case. Nothing that led there is overwritten; the full history stays attached.",
    who: "Investigators and admin",
    log: [{ time: "09:31:18", action: "status.changed", detail: "in progress to resolved" }],
  },
  {
    status: "Closed",
    title: "Closed, never erased",
    body: "The case is closed, not deleted. Its record stays available to the people entitled to see it, for as long as your policy requires.",
    who: "Compliance admin",
    log: [{ time: "16:05:40", action: "case.closed", detail: "by R. Iyer" }],
  },
];

export const safeguards = [
  {
    key: "access",
    title: "Access is decided by the database",
    body: "Investigators can only query cases they are assigned to. Row level security enforces it on every request, even if the interface has a bug.",
    tag: "Row level security",
  },
  {
    key: "audit",
    title: "The audit log only grows",
    body: "Sign ins, views, status changes, downloads and recording plays are written to a log nobody can edit or delete.",
    tag: "Append only",
  },
  {
    key: "recordings",
    title: "Recordings stay with the carrier",
    body: "Call audio stays with the telephony provider. We keep a SHA-256 fingerprint so any change shows, and play it only through a link we control.",
    tag: "Tamper evident",
  },
  {
    key: "links",
    title: "Files open through links that expire",
    body: "Every storage bucket is private. Evidence opens through signed links that expire within 15 to 60 minutes, and each one is logged.",
    tag: "Signed links",
  },
  {
    key: "webhooks",
    title: "Forged call records are refused",
    body: "A call is only accepted with a valid signature from the telephony provider. Anything unsigned is rejected and logged as a security event.",
    tag: "Verified webhooks",
  },
  {
    key: "named",
    title: "Everyone on a case is named",
    body: "No shared logins and no anonymous accounts inside the platform. Every note, message and status change shows who made it.",
    tag: "Named access",
  },
];
export const nextSteps = [
  {
    title: "You call or use the link",
    body: "An investigator answers the hotline, or you can leave a message. You can also submit a written report through your secure link. Calls are recorded so your account is kept exactly as you gave it.",
  },
  {
    title: "The compliance team reviews it",
    body: "A compliance admin at your organisation reads or listens to your report and opens a case.",
  },
  {
    title: "It is investigated privately",
    body: "Only the compliance team and the investigators assigned to your case can see it. Everything they do is logged.",
  },
];

export type Feature = { key: string; title: string; body: string };

// Titles as on the original site; body copy describes what the platform actually does.
export const features: Feature[] = [
  {
    key: "intake",
    title: "Secure Intake Channels",
    body: "A published hotline and a dedicated reporting link for each organisation. Every call is recorded, and every report ends up in one place.",
  },
  {
    key: "triage",
    title: "Automated Case Triage",
    body: "Calls are captured the moment they end, queued for review, and your compliance admin is notified straight away. Nothing is lost between the call and the case.",
  },
  {
    key: "correspondence",
    title: "Anonymous Correspondence",
    body: "Reporters never create an account or share a login. Hotline calls are bridged with both numbers masked, so the caller's number stays private.",
  },
  {
    key: "audit",
    title: "Immutable Audit Trails",
    body: "Every sign in, view, download, recording play and status change is written to a log that nobody can edit or delete.",
  },
  {
    key: "analytics",
    // NOTE: the analytics dashboard is post-MVP in the dev brief. Confirm before launch.
    title: "Real-time Analytics",
    body: "Case status, assignments and messages update live for the whole team, with open, in progress and closed counts by category and department.",
  },
];
