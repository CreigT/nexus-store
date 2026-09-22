export type AgentStatus = "running" | "idle" | "watch";

export type Agent = {
  layer: string;
  name: string;
  status: AgentStatus;
  note: string;
};

export const agents: Agent[] = [
  { layer: "Executive", name: "CEO Agent", status: "running", note: "Daily goals published" },
  { layer: "Executive", name: "Governance Agent", status: "watch", note: "Approval policy armed" },
  { layer: "Revenue", name: "Sales Agent", status: "running", note: "Checkout live" },
  { layer: "Revenue", name: "Marketing Agent", status: "idle", note: "Waiting on first 10 orders" },
  { layer: "Customer", name: "Support Agent", status: "running", note: "Inbox polling" },
  { layer: "Customer", name: "Refund Agent", status: "watch", note: "Policy: 14-day digital" },
  { layer: "Commerce", name: "Pricing Agent", status: "idle", note: "Catalog prices locked" },
  { layer: "Finance", name: "Treasury Agent", status: "watch", note: "Demo or Stripe mode" },
  { layer: "Legal", name: "Policy Agent", status: "running", note: "Terms + refund posted" },
  { layer: "Cyber", name: "Identity Agent", status: "running", note: "Signed access cookies" },
  { layer: "Data", name: "KPI Agent", status: "running", note: "Storefront events on" },
  { layer: "Infra", name: "Cloud Agent", status: "running", note: "Vercel ready" },
];
