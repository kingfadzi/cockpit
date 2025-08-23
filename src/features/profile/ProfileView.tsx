import React from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ServerIcon,
  ArrowTopRightOnSquareIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/**************************************
 * Types (align to current backend)
 *************************************/
export type ProfileField = {
  fieldId: string;
  fieldKey: string; // e.g., "encryption_at_rest"
  value: any;
  sourceSystem?: string | null;
  sourceRef?: string | null;
  evidenceCount?: number;
  lastUpdated?: string | null; // ISO
};

export type ServiceInstance = {
  it_service_instance_sysid: string;
  app_id: string;
  environment: string; // e.g., Production
  it_business_service_sysid?: string;
  business_application_sysid?: string;
  service_offering_join?: string;
  service_instance?: string;
  install_type?: string;
  service_classification?: string; // Primary, etc.
  created_at?: string;
  updated_at?: string;
};

export type ApplicationMeta = {
  app_id: string;
  scope: string;
  parent_app_id?: string | null;
  parent_app_name?: string | null;
  name?: string | null;
  business_service_name?: string | null;
  app_criticality_assessment?: string | null; // A/B/C/D
  application_tier?: string | null; // Business Application, etc.
  install_type?: string | null; // Cloud, etc.
  operational_status?: string | null; // Active, etc.
  architecture_type?: string | null;
  house_position?: string | null;
  onboarding_status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type AppProfileResponse = {
  appId: string;
  profileId: string;
  updatedAt: string; // ISO
  fields: ProfileField[];
  application: ApplicationMeta;
  serviceInstances: ServiceInstance[];
};

/**************************************
 * Feature Flags (stubs for later wiring)
 *************************************/
const FEATURES = {
  releases: false,
  changeRequests: false,
  risks: false,
};

/**************************************
 * RAG helpers
 *************************************/
export type Rag = "green" | "amber" | "red" | "neutral";

const ragIcon = (rag: Rag) => {
  switch (rag) {
    case "green":
      return <CheckCircleIcon className="h-4 w-4" />;
    case "amber":
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case "red":
      return <XCircleIcon className="h-4 w-4" />;
    default:
      return <InformationCircleIcon className="h-4 w-4" />;
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

/**************************************
 * Field dictionary (labels, grouping, rules)
 *************************************/

type FieldSpec = {
  label: string;
  section: "Security" | "Reliability & DR" | "Operations" | "Data Governance";
  evaluate: (
    value: any,
    app: ApplicationMeta,
    fields: Record<string, ProfileField>
  ) => { rag: Rag; hint?: string };
  core?: boolean; // includes in readiness score
};

const toDays = (v: string | number): number | null => {
  if (v == null) return null;
  if (typeof v === "number") return v; // caller ensures unit where needed
  const m = String(v).match(/^(\d+)([dhm])?$/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const u = (m[2] || "d").toLowerCase();
  if (u === "d") return n;
  if (u === "h") return Math.round(n / 24);
  if (u === "m") return Math.round(n / (60 * 24));
  return n;
};

const SPEC: Record<string, FieldSpec> = {
  // Security
  encryption_at_rest: {
    label: "Encryption at Rest",
    section: "Security",
    core: true,
    evaluate: (v) => ({ rag: v === "required" ? "green" : v ? "amber" : "red" }),
  },
  encryption_in_transit: {
    label: "Encryption in Transit",
    section: "Security",
    core: true,
    evaluate: (v) => ({ rag: v === "required" ? "green" : v ? "amber" : "red" }),
  },
  secrets_management: {
    label: "Secrets Management",
    section: "Security",
    core: true,
    evaluate: (v) => ({
      rag: v === "centralized_required" ? "green" : v ? "amber" : "red",
    }),
  },
  key_rotation_max: {
    label: "Key Rotation Max",
    section: "Security",
    core: true,
    evaluate: (v) => {
      const d = toDays(String(v).replace(/\s+/g, ""));
      if (d == null) return { rag: "neutral", hint: "Unknown cadence" };
      if (d <= 90) return { rag: "green" };
      if (d <= 180) return { rag: "amber" };
      return { rag: "red" };
    },
  },
  confidentiality_level: {
    label: "Confidentiality Level",
    section: "Security",
    evaluate: (v) => ({ rag: v ? "neutral" : "neutral" }),
  },

  // Reliability & DR
  rpo_minutes: {
    label: "RPO (min)",
    section: "Reliability & DR",
    core: true,
    evaluate: (v) => {
      const n = typeof v === "number" ? v : parseInt(v, 10);
      if (Number.isNaN(n)) return { rag: "neutral", hint: "Unknown" };
      if (n <= 15) return { rag: "green" };
      if (n <= 60) return { rag: "amber" };
      return { rag: "red" };
    },
  },
  rto_hours: {
    label: "RTO (hrs)",
    section: "Reliability & DR",
    core: true,
    evaluate: (v) => {
      const n = typeof v === "number" ? v : parseInt(v, 10);
      if (Number.isNaN(n)) return { rag: "neutral", hint: "Unknown" };
      if (n <= 4) return { rag: "green" };
      if (n <= 12) return { rag: "amber" };
      return { rag: "red" };
    },
  },
  ha_topology: {
    label: "HA Topology",
    section: "Reliability & DR",
    core: true,
    evaluate: (v) => ({
      rag:
        v === "active_active"
          ? "green"
          : v === "active_passive"
          ? "amber"
          : v
          ? "red"
          : "neutral",
    }),
  },
  failover_automation: {
    label: "Failover Automation",
    section: "Reliability & DR",
    core: true,
    evaluate: (v) => ({
      rag: v === "automated" ? "green" : v === "manual" ? "amber" : v ? "amber" : "neutral",
    }),
  },
  dr_test_frequency: {
    label: "DR Test Frequency",
    section: "Reliability & DR",
    core: true,
    evaluate: (v) => ({ rag: v === "annual_tabletop" ? "amber" : v ? "green" : "red" }),
  },

  // Operations
  audit_logging: {
    label: "Audit Logging",
    section: "Operations",
    core: true,
    evaluate: (v) => ({
      rag: v === "full_with_periodic_review" ? "green" : v ? "amber" : "red",
    }),
  },
  monitoring_slos: {
    label: "Monitoring SLOs",
    section: "Operations",
    core: true,
    evaluate: (v) => ({
      rag: v && String(v).startsWith("99.9") ? "green" : v ? "amber" : "red",
    }),
  },
  oncall_coverage: {
    label: "On-call Coverage",
    section: "Operations",
    core: true,
    evaluate: (v) => ({ rag: v === "24x7" ? "green" : v ? "amber" : "red" }),
  },
  runbook_maturity: {
    label: "Runbook Maturity",
    section: "Operations",
    core: true,
    evaluate: (v) => ({
      rag: v === "production_ready" ? "green" : v === "draft" ? "amber" : v ? "amber" : "red",
    }),
  },

  // Data Governance
  data_validation: {
    label: "Data Validation",
    section: "Data Governance",
    evaluate: (v) => ({ rag: v ? "neutral" : "neutral" }),
  },
  reconciliation_frequency: {
    label: "Reconciliation Frequency",
    section: "Data Governance",
    evaluate: (v) => ({ rag: v ? "neutral" : "neutral" }),
  },
  review_depth: {
    label: "Review Depth",
    section: "Data Governance",
    evaluate: (v) => ({ rag: v === "full_review" ? "green" : v ? "amber" : "neutral" }),
  },
  materiality: {
    label: "Materiality",
    section: "Data Governance",
    evaluate: (v) => ({ rag: v === "crown_jewel" ? "amber" : v ? "neutral" : "neutral" }),
  },
};

/**************************************
 * Utilities
 *************************************/
const groupBySection = (fields: ProfileField[]) => {
  const specEntries = Object.entries(SPEC);
  const dict: Record<string, ProfileField> = Object.fromEntries(
    fields.map((f) => [f.fieldKey, f])
  );
  const sections: Record<
    string,
    { key: string; label: string; rows: Array<ProfileField & { rag: Rag; hint?: string }> }
  > = {};

  for (const [key, spec] of specEntries) {
    const f = dict[key];
    if (!sections[spec.section])
      sections[spec.section] = { key: spec.section, label: spec.section, rows: [] };
    if (f) {
      const { rag, hint } = spec.evaluate(f.value, {} as ApplicationMeta, dict);
      sections[spec.section].rows.push({ ...f, rag, hint });
    }
  }
  return sections;
};

const computeDomainScore = (
  fieldsByKey: Record<string, ProfileField>,
  keys: string[]
): number => {
  const toUnit = (rag: Rag) => (rag === "green" ? 1 : rag === "amber" ? 0.5 : rag === "red" ? 0 : 0.5);
  let sum = 0,
    count = 0;
  for (const k of keys) {
    const spec = SPEC[k];
    const f = fieldsByKey[k];
    if (!spec || !spec.core || !f) continue;
    const { rag } = spec.evaluate(f.value, {} as ApplicationMeta, fieldsByKey);
    sum += toUnit(rag);
    count += 1;
  }
  return count === 0 ? 0.5 : sum / count;
};

const readiness = (fields: ProfileField[]) => {
  const byKey: Record<string, ProfileField> = Object.fromEntries(
    fields.map((f) => [f.fieldKey, f])
  );
  const securityKeys = Object.keys(SPEC).filter((k) => SPEC[k].section === "Security");
  const reliabilityKeys = Object.keys(SPEC).filter((k) => SPEC[k].section === "Reliability & DR");
  const opsKeys = Object.keys(SPEC).filter((k) => SPEC[k].section === "Operations");

  const security = computeDomainScore(byKey, securityKeys);
  const reliability = computeDomainScore(byKey, reliabilityKeys);
  const ops = computeDomainScore(byKey, opsKeys);
  const score = 0.4 * security + 0.4 * reliability + 0.2 * ops;
  const rag: Rag = score >= 0.8 ? "green" : score >= 0.6 ? "amber" : "red";
  return { score, rag, breakdown: { security, reliability, ops } };
};

const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toUTCString() : "—");

const envSort = (a: string, b: string) => {
  const order = [
    "Production",
    "Pre-Production",
    "Staging",
    "Test",
    "QA",
    "Development",
    "Dev",
  ];
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
};

/**************************************
 * Components
 *************************************/
const MetaBadges: React.FC<{ app: ApplicationMeta }> = ({ app }) => (
  <div className="flex flex-wrap gap-2 items-center">
    {app.app_criticality_assessment && (
      <Badge variant="secondary">Criticality {app.app_criticality_assessment}</Badge>
    )}
    {app.application_tier && <Badge variant="outline">{app.application_tier}</Badge>}
    {app.install_type && <Badge variant="outline">{app.install_type}</Badge>}
    {app.operational_status && <Badge variant="outline">{app.operational_status}</Badge>}
    {app.house_position && <Badge variant="outline">{app.house_position}</Badge>}
  </div>
);

const StatRow: React.FC<{
  label: string;
  value?: React.ReactNode;
  rag?: Rag;
  hint?: string;
}> = ({ label, value, rag = "neutral", hint }) => (
  <div className="flex items-center justify-between py-1 text-sm">
    <div className="flex items-center gap-2 text-muted-foreground">
      {ragDot(rag)}
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-medium">{value ?? "Unknown"}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  </div>
);

const OverviewCard: React.FC<{
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <Card className="shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-base">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-1">{children}</CardContent>
  </Card>
);

const StubPill: React.FC<{ label: string; tooltip?: string }> = ({ label }) => (
  <Badge className="bg-gray-100 text-gray-700 border border-dashed">{label}</Badge>
);

/**************************************
 * Main Page Component
 *************************************/
export default function ApplicationProfilePage({
  data,
}: {
  data: AppProfileResponse;
}) {
  const { application: app, fields, serviceInstances } = data;
  const grouped = groupBySection(fields);
  const ready = readiness(fields);

  // quick pickers for overview cards
  const byKey: Record<string, ProfileField> = Object.fromEntries(
    fields.map((f) => [f.fieldKey, f])
  );
  const val = (k: string) => byKey[k]?.value;
  const rag = (k: string): Rag =>
    SPEC[k] ? SPEC[k].evaluate(byKey[k]?.value, app, byKey).rag : "neutral";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {app.name ?? data.appId}{" "}
            <span className="text-muted-foreground">({data.appId})</span>
          </h1>
          <div className="mt-2">
            <MetaBadges app={app} />
          </div>
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
            <ClockIcon className="h-4 w-4" /> Profile updated {fmtDate(data.updatedAt)} •
            Profile {data.profileId}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" disabled>
            <ShieldCheckIcon className="h-4 w-4" /> Add Evidence
          </Button>
          <Button variant="default" className="gap-2" disabled>
            <ServerIcon className="h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* Top meta strip with stub markers */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="gap-1">
          {ragIcon(ready.rag)} <span>Governance Readiness</span>
        </Badge>
        {!FEATURES.releases && <StubPill label="Release Gate: Not connected" />}
        {!FEATURES.changeRequests && <StubPill label="CRs (DR/Prod): Not connected" />}
        {!FEATURES.risks && <StubPill label="Risk Stories: Not connected" />}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="risk">Risk & Controls</TabsTrigger>
          <TabsTrigger value="fields">Profile Fields</TabsTrigger>
          <TabsTrigger value="instances">Service Instances</TabsTrigger>
          <TabsTrigger value="history">History & Evidence</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <OverviewCard title="Governance Readiness" icon={ragIcon(ready.rag)}>
              <div className="text-sm text-muted-foreground">
                Overall score {(ready.score * 100).toFixed(0)}%
              </div>
              <Separator className="my-2" />
              <StatRow
                label="Security"
                value={`${(ready.breakdown.security * 100).toFixed(0)}%`}
                rag={
                  ready.breakdown.security >= 0.8
                    ? "green"
                    : ready.breakdown.security >= 0.6
                    ? "amber"
                    : "red"
                }
              />
              <StatRow
                label="Reliability & DR"
                value={`${(ready.breakdown.reliability * 100).toFixed(0)}%`}
                rag={
                  ready.breakdown.reliability >= 0.8
                    ? "green"
                    : ready.breakdown.reliability >= 0.6
                    ? "amber"
                    : "red"
                }
              />
              <StatRow
                label="Operations"
                value={`${(ready.breakdown.ops * 100).toFixed(0)}%`}
                rag={
                  ready.breakdown.ops >= 0.8
                    ? "green"
                    : ready.breakdown.ops >= 0.6
                    ? "amber"
                    : "red"
                }
              />
            </OverviewCard>

            <OverviewCard title="Security Posture" icon={<ShieldCheckIcon className="h-4 w-4" />}>
              <StatRow
                label="At Rest"
                value={String(val("encryption_at_rest") ?? "Unknown")}
                rag={rag("encryption_at_rest")}
              />
              <StatRow
                label="In Transit"
                value={String(val("encryption_in_transit") ?? "Unknown")}
                rag={rag("encryption_in_transit")}
              />
              <StatRow
                label="Key Rotation Max"
                value={String(val("key_rotation_max") ?? "Unknown")}
                rag={rag("key_rotation_max")}
              />
              <StatRow
                label="Secrets Mgmt"
                value={String(val("secrets_management") ?? "Unknown")}
                rag={rag("secrets_management")}
              />
            </OverviewCard>

            <OverviewCard title="Reliability & DR" icon={<ServerIcon className="h-4 w-4" />}>
              <StatRow
                label="RPO (min)"
                value={String(val("rpo_minutes") ?? "Unknown")}
                rag={rag("rpo_minutes")}
              />
              <StatRow
                label="RTO (hrs)"
                value={String(val("rto_hours") ?? "Unknown")}
                rag={rag("rto_hours")}
              />
              <StatRow
                label="HA Topology"
                value={String(val("ha_topology") ?? "Unknown")}
                rag={rag("ha_topology")}
              />
              <StatRow
                label="Failover"
                value={String(val("failover_automation") ?? "Unknown")}
                rag={rag("failover_automation")}
              />
              <StatRow
                label="DR Test"
                value={String(val("dr_test_frequency") ?? "Unknown")}
                rag={rag("dr_test_frequency")}
              />
            </OverviewCard>

            <OverviewCard title="Operations" icon={<InformationCircleIcon className="h-4 w-4" />}>
              <StatRow
                label="Audit Logging"
                value={String(val("audit_logging") ?? "Unknown")}
                rag={rag("audit_logging")}
              />
              <StatRow
                label="Monitoring SLOs"
                value={String(val("monitoring_slos") ?? "Unknown")}
                rag={rag("monitoring_slos")}
              />
              <StatRow
                label="On-call"
                value={String(val("oncall_coverage") ?? "Unknown")}
                rag={rag("oncall_coverage")}
              />
              <StatRow
                label="Runbook"
                value={String(val("runbook_maturity") ?? "Unknown")}
                rag={rag("runbook_maturity")}
              />
            </OverviewCard>

            {/* Stubs visible while backends are off */}
            {!FEATURES.releases && (
              <OverviewCard title="Release Gate" icon={<InformationCircleIcon className="h-4 w-4" />}>
                <div className="text-sm text-muted-foreground">
                  Not connected. This card will show gate status for the next release.
                </div>
                <div className="pt-2">
                  <Button variant="outline" disabled className="gap-2">
                    Evaluate Policy <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </OverviewCard>
            )}
            {!FEATURES.changeRequests && (
              <OverviewCard
                title="Deployment CRs (DR / Prod)"
                icon={<InformationCircleIcon className="h-4 w-4" />}
              >
                <div className="text-sm text-muted-foreground">
                  Not connected. ServiceNow CRs will surface here with state chips.
                </div>
                <div className="pt-2 space-x-2">
                  <Button variant="outline" disabled className="gap-2">
                    Promote to DR <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" disabled className="gap-2">
                    Promote to Prod <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </OverviewCard>
            )}
          </div>
        </TabsContent>

        {/* RISK & CONTROLS (stub until risks backend is on) */}
        <TabsContent value="risk" className="pt-4">
          {FEATURES.risks ? (
            <div>/* TODO: Risks panel */</div>
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Risk Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Policy and SME‑raised risks will appear here once connected.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* PROFILE FIELDS */}
        <TabsContent value="fields" className="space-y-4 pt-4">
          {Object.values(grouped).map((section) => (
            <Card key={section.key}>
              <CardHeader>
                <CardTitle>{section.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {section.rows.map((row) => (
                    <div key={row.fieldId} className="rounded-xl border p-3 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {ragDot(row.rag as Rag)}
                          <span className="font-medium">
                            {SPEC[row.fieldKey]?.label ?? row.fieldKey}
                          </span>
                        </div>
                        <Badge variant="secondary">{row.evidenceCount ?? 0} evidence</Badge>
                      </div>
                      <div className="text-sm">{String(row.value)}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
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
        </TabsContent>

        {/* INSTANCES */}
        <TabsContent value="instances" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Instances</CardTitle>
            </CardHeader>
            <CardContent>
              {serviceInstances && serviceInstances.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-muted-foreground">
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
                      {[...serviceInstances]
                        .sort((a, b) => envSort(a.environment, b.environment))
                        .map((si) => (
                          <tr key={si.it_service_instance_sysid} className="border-t">
                            <td className="py-2 pr-4">
                              <Badge variant="outline">{si.environment}</Badge>
                            </td>
                            <td className="py-2 pr-4">
                              {si.service_instance ?? si.it_service_instance_sysid}
                            </td>
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
                <p className="text-sm text-muted-foreground">No service instances available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HISTORY (placeholder) */}
        <TabsContent value="history" className="pt-4">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>History & Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Audit events and evidence will stream here once wired.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}