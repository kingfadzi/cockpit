// src/features/profile/ProfileView.tsx
import React, { useMemo, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  ClockIcon,
  ShieldCheckIcon,
  ServerIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

/* =========================
 * Tiny UI primitives (local)
 * ========================= */

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
);
const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`p-4 pb-2 ${className}`}>{children}</div>
);
const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <h3 className={`text-base font-semibold ${className}`}>{children}</h3>
);
const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`p-4 pt-2 ${className}`}>{children}</div>
);
const Badge: React.FC<{ children: React.ReactNode; variant?: "outline" | "secondary"; className?: string }> = ({
  children,
  variant = "outline",
  className = "",
}) => {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const styles =
    variant === "secondary"
      ? "bg-gray-100 text-gray-800"
      : "border border-gray-200 text-gray-700";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
};
const Button: React.FC<{ children: React.ReactNode; variant?: "default" | "outline"; disabled?: boolean; className?: string; onClick?: () => void; }> = ({
  children,
  variant = "default",
  disabled,
  className = "",
  onClick,
}) => {
  const base = "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm";
  const styles =
    variant === "outline"
      ? "border border-gray-200 text-gray-800 bg-white hover:bg-gray-50"
      : "bg-gray-900 text-white hover:bg-black";
  const state = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  return (
    <button className={`${base} ${styles} ${state} ${className}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

/* Simple Tabs (local state) */
const Tabs: React.FC<{ tabs: { key: string; label: string }[]; value: string; onChange: (k: string) => void; }> = ({
  tabs,
  value,
  onChange,
}) => (
  <div className="w-full">
    <div className="grid w-full max-w-2xl grid-cols-5 rounded-xl border bg-white p-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded-lg px-3 py-1.5 text-sm ${
            value === t.key ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

/* =========================
 * Types (align to backend)
 * ========================= */
export type ProfileField = {
  fieldId: string;
  fieldKey: string;
  value: any;
  sourceSystem?: string | null;
  sourceRef?: string | null;
  evidenceCount?: number;
  lastUpdated?: string | null; // ISO
};
export type ServiceInstance = {
  it_service_instance_sysid: string;
  app_id: string;
  environment: string;
  service_instance?: string;
  install_type?: string;
  service_classification?: string;
  it_business_service_sysid?: string;
  updated_at?: string;
};
export type ApplicationMeta = {
  app_id: string;
  name?: string | null;
  app_criticality_assessment?: string | null;
  application_tier?: string | null;
  install_type?: string | null;
  operational_status?: string | null;
  house_position?: string | null;
};
export type AppProfileResponse = {
  appId: string;
  profileId: string;
  updatedAt: string;
  fields: ProfileField[];
  application: ApplicationMeta;
  serviceInstances: ServiceInstance[];
};

/* =========================
 * Feature flags (stubs)
 * ========================= */
const FEATURES = {
  releases: false,
  changeRequests: false,
  risks: false,
};

/* =========================
 * RAG helpers & rules
 * ========================= */
export type Rag = "green" | "amber" | "red" | "neutral";
const ragIcon = (rag: Rag) => {
  const base = "h-4 w-4";
  switch (rag) {
    case "green":
      return <CheckCircleIcon className={`${base} text-green-500`} />;
    case "amber":
      return <ExclamationTriangleIcon className={`${base} text-yellow-500`} />;
    case "red":
      return <XCircleIcon className={`${base} text-red-500`} />;
    default:
      return <InformationCircleIcon className={`${base} text-gray-400`} />;
  }
};
const ragDot = (rag: Rag) => (
  <span
    className={
      "inline-block h-2 w-2 rounded-full " +
      (rag === "green"
        ? "bg-green-500"
        : rag === "amber"
        ? "bg-yellow-500"
        : rag === "red"
        ? "bg-red-500"
        : "bg-gray-400")
    }
  />
);

/* FieldSpec (friendly labels, sections, evaluation) */
type FieldSpec = {
  label: string;
  section: "Security" | "Reliability & DR" | "Operations" | "Data Governance";
  core?: boolean;
  evaluate: (value: any) => { rag: Rag; hint?: string };
};
const SPEC: Record<string, FieldSpec> = {
  // Security
  encryption_at_rest: { label: "Encryption at Rest", section: "Security", core: true, evaluate: (v) => ({ rag: v === "required" ? "green" : v ? "amber" : "red" }) },
  encryption_in_transit: { label: "Encryption in Transit", section: "Security", core: true, evaluate: (v) => ({ rag: v === "required" ? "green" : v ? "amber" : "red" }) },
  secrets_management: { label: "Secrets Management", section: "Security", core: true, evaluate: (v) => ({ rag: v === "centralized_required" ? "green" : v ? "amber" : "red" }) },
  key_rotation_max: { label: "Key Rotation Max", section: "Security", core: true, evaluate: (v) => {
      const s = String(v ?? "").replace(/\s+/g, "");
      const m = s.match(/^(\d+)([dhm])?$/i);
      if (!m) return { rag: "neutral", hint: "Unknown cadence" };
      const n = parseInt(m[1], 10);
      const unit = (m[2] || "d").toLowerCase();
      const days = unit === "d" ? n : unit === "h" ? Math.round(n / 24) : Math.round(n / (60 * 24));
      if (days <= 90) return { rag: "green" };
      if (days <= 180) return { rag: "amber" };
      return { rag: "red" };
    } },
  confidentiality_level: { label: "Confidentiality Level", section: "Security", evaluate: () => ({ rag: "neutral" }) },

  // Reliability & DR
  rpo_minutes: { label: "RPO (min)", section: "Reliability & DR", core: true, evaluate: (v) => {
      const n = typeof v === "number" ? v : parseInt(v, 10);
      if (Number.isNaN(n)) return { rag: "neutral" };
      if (n <= 15) return { rag: "green" };
      if (n <= 60) return { rag: "amber" };
      return { rag: "red" };
    } },
  rto_hours: { label: "RTO (hrs)", section: "Reliability & DR", core: true, evaluate: (v) => {
      const n = typeof v === "number" ? v : parseInt(v, 10);
      if (Number.isNaN(n)) return { rag: "neutral" };
      if (n <= 4) return { rag: "green" };
      if (n <= 12) return { rag: "amber" };
      return { rag: "red" };
    } },
  ha_topology: { label: "HA Topology", section: "Reliability & DR", core: true, evaluate: (v) => ({ rag: v === "active_active" ? "green" : v === "active_passive" ? "amber" : v ? "red" : "neutral" }) },
  failover_automation: { label: "Failover Automation", section: "Reliability & DR", core: true, evaluate: (v) => ({ rag: v === "automated" ? "green" : v ? "amber" : "neutral" }) },
  dr_test_frequency: { label: "DR Test Frequency", section: "Reliability & DR", core: true, evaluate: (v) => ({ rag: v === "annual_tabletop" ? "amber" : v ? "green" : "red" }) },

  // Operations
  audit_logging: { label: "Audit Logging", section: "Operations", core: true, evaluate: (v) => ({ rag: v === "full_with_periodic_review" ? "green" : v ? "amber" : "red" }) },
  monitoring_slos: { label: "Monitoring SLOs", section: "Operations", core: true, evaluate: (v) => ({ rag: v && String(v).startsWith("99.9") ? "green" : v ? "amber" : "red" }) },
  oncall_coverage: { label: "On-call Coverage", section: "Operations", core: true, evaluate: (v) => ({ rag: v === "24x7" ? "green" : v ? "amber" : "red" }) },
  runbook_maturity: { label: "Runbook Maturity", section: "Operations", core: true, evaluate: (v) => ({ rag: v === "production_ready" ? "green" : v === "draft" ? "amber" : v ? "amber" : "red" }) },

  // Data Governance
  data_validation: { label: "Data Validation", section: "Data Governance", evaluate: () => ({ rag: "neutral" }) },
  reconciliation_frequency: { label: "Reconciliation Frequency", section: "Data Governance", evaluate: () => ({ rag: "neutral" }) },
  review_depth: { label: "Review Depth", section: "Data Governance", evaluate: (v) => ({ rag: v === "full_review" ? "green" : v ? "amber" : "neutral" }) },
  materiality: { label: "Materiality", section: "Data Governance", evaluate: (v) => ({ rag: v === "crown_jewel" ? "amber" : "neutral" }) },
};

/* =========================
 * Helpers
 * ========================= */
const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toUTCString() : "—");
const envSort = (a: string, b: string) => {
  const order = ["Production", "Pre-Production", "Staging", "Test", "QA", "Development", "Dev"];
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
};
const groupBySection = (fields: ProfileField[]) => {
  const dict: Record<string, ProfileField> = Object.fromEntries(fields.map((f) => [f.fieldKey, f]));
  const sections: Record<string, { key: string; label: string; rows: Array<ProfileField & { rag: Rag; hint?: string }> }> = {};
  for (const [key, spec] of Object.entries(SPEC)) {
    if (!sections[spec.section]) sections[spec.section] = { key: spec.section, label: spec.section, rows: [] };
    const f = dict[key];
    if (f) {
      const { rag, hint } = spec.evaluate(f.value);
      sections[spec.section].rows.push({ ...f, rag, hint });
    }
  }
  return sections;
};

/* =========================
 * Main Component
 * ========================= */
export default function ProfileView({ data }: { data: AppProfileResponse }) {
  const { application: app, fields, serviceInstances } = data;
  const [tab, setTab] = useState<"overview" | "risk" | "fields" | "instances" | "history">("overview");

  const grouped = useMemo(() => groupBySection(fields), [fields]);
  const byKey: Record<string, ProfileField> = useMemo(() => Object.fromEntries(fields.map((f) => [f.fieldKey, f])), [fields]);
  const val = (k: string) => byKey[k]?.value;
  const evalRag = (k: string): Rag => (SPEC[k] ? SPEC[k].evaluate(byKey[k]?.value).rag : "neutral");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {app.name ?? data.appId} <span className="text-gray-500">({data.appId})</span>
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {app.app_criticality_assessment && <Badge variant="secondary">Criticality {app.app_criticality_assessment}</Badge>}
            {app.application_tier && <Badge>{app.application_tier}</Badge>}
            {app.install_type && <Badge>{app.install_type}</Badge>}
            {app.operational_status && <Badge>{app.operational_status}</Badge>}
            {app.house_position && <Badge>{app.house_position}</Badge>}
          </div>
          <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" /> Profile updated {fmtDate(data.updatedAt)} • Profile {data.profileId}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            <ShieldCheckIcon className="h-4 w-4" /> Add Evidence
          </Button>
          <Button disabled>
            <ServerIcon className="h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* Meta strip with stubs */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="gap-1">{ragIcon("neutral")} <span>Governance Readiness</span></Badge>
        {!FEATURES.releases && <Badge className="border-dashed">Release Gate: Not connected</Badge>}
        {!FEATURES.changeRequests && <Badge className="border-dashed">CRs (DR/Prod): Not connected</Badge>}
        {!FEATURES.risks && <Badge className="border-dashed">Risk Stories: Not connected</Badge>}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { key: "overview", label: "Overview" },
          { key: "risk", label: "Risk & Controls" },
          { key: "fields", label: "Profile Fields" },
          { key: "instances", label: "Service Instances" },
          { key: "history", label: "History & Evidence" },
        ]}
        value={tab}
        onChange={(k) => setTab(k as typeof tab)}
      />

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">{ragIcon("neutral")} Governance Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">Score will appear here once policy is wired.</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><ShieldCheckIcon className="h-4 w-4" /> Security Posture</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <Row label="At Rest" value={String(val("encryption_at_rest") ?? "Unknown")} rag={evalRag("encryption_at_rest")} />
                <Row label="In Transit" value={String(val("encryption_in_transit") ?? "Unknown")} rag={evalRag("encryption_in_transit")} />
                <Row label="Key Rotation Max" value={String(val("key_rotation_max") ?? "Unknown")} rag={evalRag("key_rotation_max")} />
                <Row label="Secrets Mgmt" value={String(val("secrets_management") ?? "Unknown")} rag={evalRag("secrets_management")} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><ServerIcon className="h-4 w-4" /> Reliability & DR</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <Row label="RPO (min)" value={String(val("rpo_minutes") ?? "Unknown")} rag={evalRag("rpo_minutes")} />
                <Row label="RTO (hrs)" value={String(val("rto_hours") ?? "Unknown")} rag={evalRag("rto_hours")} />
                <Row label="HA Topology" value={String(val("ha_topology") ?? "Unknown")} rag={evalRag("ha_topology")} />
                <Row label="Failover" value={String(val("failover_automation") ?? "Unknown")} rag={evalRag("failover_automation")} />
                <Row label="DR Test" value={String(val("dr_test_frequency") ?? "Unknown")} rag={evalRag("dr_test_frequency")} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><InformationCircleIcon className="h-4 w-4" /> Operations</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <Row label="Audit Logging" value={String(val("audit_logging") ?? "Unknown")} rag={evalRag("audit_logging")} />
                <Row label="Monitoring SLOs" value={String(val("monitoring_slos") ?? "Unknown")} rag={evalRag("monitoring_slos")} />
                <Row label="On-call" value={String(val("oncall_coverage") ?? "Unknown")} rag={evalRag("oncall_coverage")} />
                <Row label="Runbook" value={String(val("runbook_maturity") ?? "Unknown")} rag={evalRag("runbook_maturity")} />
              </CardContent>
            </Card>

            {!FEATURES.releases && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><InformationCircleIcon className="h-4 w-4" /> Release Gate</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-500">Not connected. This card will show gate status for the next release.</div>
                  <Button variant="outline" disabled><span>Evaluate Policy</span> <ArrowTopRightOnSquareIcon className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            )}

            {!FEATURES.changeRequests && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><InformationCircleIcon className="h-4 w-4" /> Deployment CRs (DR / Prod)</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-500">Not connected. ServiceNow CRs will surface here with state chips.</div>
                  <div className="flex gap-2">
                    <Button variant="outline" disabled>Promote to DR <ArrowTopRightOnSquareIcon className="h-4 w-4" /></Button>
                    <Button variant="outline" disabled>Promote to Prod <ArrowTopRightOnSquareIcon className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* RISK & CONTROLS (stub for now) */}
      {tab === "risk" && (
        <div className="pt-4">
          {FEATURES.risks ? (
            <div>{/* future risks panel */}</div>
          ) : (
            <Card className="border-dashed">
              <CardHeader><CardTitle>Risk Stories</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-gray-600">Policy and SME‑raised risks will appear here once connected.</p></CardContent>
            </Card>
          )}
        </div>
      )}

      {/* PROFILE FIELDS */}
      {tab === "fields" && (
        <div className="space-y-4 pt-4">
          {Object.values(grouped).map((section) => (
            <Card key={section.key}>
              <CardHeader><CardTitle>{section.label}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {section.rows.map((row) => (
                    <div key={row.fieldId} className="rounded-xl border p-3 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {ragDot(row.rag as Rag)}
                          <span className="font-medium">{SPEC[row.fieldKey]?.label ?? row.fieldKey}</span>
                        </div>
                        <Badge variant="secondary">{row.evidenceCount ?? 0} evidence</Badge>
                      </div>
                      <div className="text-sm">{String(row.value)}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{row.sourceSystem ?? "—"}</span>
                        <span>•</span>
                        <span>Updated {fmtDate(row.lastUpdated)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* INSTANCES */}
      {tab === "instances" && (
        <div className="pt-4">
          <Card>
            <CardHeader><CardTitle>Service Instances</CardTitle></CardHeader>
            <CardContent>
              {serviceInstances && serviceInstances.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-gray-600">
                      <tr>
                        <th className="py-2 pr-4">Environment</th>
                        <th className="py-2 pr-4">Instance</th>
                        <th className="py-2 pr-4">Classification</th>
                        <th className="py-2 pr-4">Install Type</th>
                        <th className="py-2 pr-4">Business Service</th>
                        <th className="py-2 pr-4">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...serviceInstances].sort((a, b) => envSort(a.environment, b.environment)).map((si) => (
                        <tr key={si.it_service_instance_sysid} className="border-t">
                          <td className="py-2 pr-4"><Badge>{si.environment}</Badge></td>
                          <td className="py-2 pr-4">{si.service_instance ?? si.it_service_instance_sysid}</td>
                          <td className="py-2 pr-4">{si.service_classification ?? "—"}</td>
                          <td className="py-2 pr-4">{si.install_type ?? "—"}</td>
                          <td className="py-2 pr-4">{si.it_business_service_sysid ?? "—"}</td>
                          <td className="py-2 pr-4">{fmtDate(si.updated_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No service instances available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* HISTORY (placeholder) */}
      {tab === "history" && (
        <div className="pt-4">
          <Card className="border-dashed">
            <CardHeader><CardTitle>History & Evidence</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-600">Audit events and evidence will stream here once wired.</p></CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/* Row renderer */
function Row({ label, value, rag }: { label: string; value?: React.ReactNode; rag?: Rag }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <div className="flex items-center gap-2 text-gray-600">{ragDot(rag ?? "neutral")}<span>{label}</span></div>
      <div className="font-medium">{value ?? "Unknown"}</div>
    </div>
  );
}