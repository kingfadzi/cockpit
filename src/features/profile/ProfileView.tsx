import React from "react";
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
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    case "amber":
      return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />;
    case "red":
      return <XCircleIcon className="h-4 w-4 text-red-500" />;
    default:
      return <InformationCircleIcon className="h-4 w-4 text-gray-400" />;
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
 * Minimal FieldSpec map (cut down for brevity)
 *************************************/
type FieldSpec = {
  label: string;
  section: string;
  evaluate: (value: any) => { rag: Rag; hint?: string };
  core?: boolean;
};

const SPEC: Record<string, FieldSpec> = {
  encryption_at_rest: {
    label: "Encryption at Rest",
    section: "Security",
    core: true,
    evaluate: (v) => ({ rag: v === "required" ? "green" : v ? "amber" : "red" }),
  },
  rpo_minutes: {
    label: "RPO (min)",
    section: "Reliability & DR",
    core: true,
    evaluate: (v) => {
      const n = typeof v === "number" ? v : parseInt(v, 10);
      if (Number.isNaN(n)) return { rag: "neutral" };
      if (n <= 15) return { rag: "green" };
      if (n <= 60) return { rag: "amber" };
      return { rag: "red" };
    },
  },
  audit_logging: {
    label: "Audit Logging",
    section: "Operations",
    core: true,
    evaluate: (v) => ({
      rag: v === "full_with_periodic_review" ? "green" : v ? "amber" : "red",
    }),
  },
};

/**************************************
 * Utilities
 *************************************/
const groupBySection = (fields: ProfileField[]) => {
  const dict: Record<string, ProfileField> = Object.fromEntries(
    fields.map((f) => [f.fieldKey, f])
  );
  const sections: Record<
    string,
    { key: string; label: string; rows: Array<ProfileField & { rag: Rag; hint?: string }> }
  > = {};
  for (const [key, spec] of Object.entries(SPEC)) {
    const f = dict[key];
    if (!sections[spec.section])
      sections[spec.section] = { key: spec.section, label: spec.section, rows: [] };
    if (f) {
      const { rag, hint } = spec.evaluate(f.value);
      sections[spec.section].rows.push({ ...f, rag, hint });
    }
  }
  return sections;
};

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toUTCString() : "—";

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

const StubPill: React.FC<{ label: string }> = ({ label }) => (
  <Badge className="bg-gray-100 text-gray-700 border border-dashed">{label}</Badge>
);

/**************************************
 * Main Component
 *************************************/
export default function ApplicationProfilePage({
  data,
}: {
  data: AppProfileResponse;
}) {
  const { application: app, fields, serviceInstances } = data;
  const grouped = groupBySection(fields);

  const byKey: Record<string, ProfileField> = Object.fromEntries(
    fields.map((f) => [f.fieldKey, f])
  );
  const val = (k: string) => byKey[k]?.value;
  const rag = (k: string): Rag =>
    SPEC[k] ? SPEC[k].evaluate(byKey[k]?.value).rag : "neutral";

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

      {/* Top meta strip */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="gap-1">
          {ragIcon("neutral")} <span>Governance Readiness</span>
        </Badge>
        {!FEATURES.releases && <StubPill label="Release Gate: Not connected" />}
        {!FEATURES.changeRequests && (
          <StubPill label="CRs (DR/Prod): Not connected" />
        )}
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
            <OverviewCard
              title="Security Posture"
              icon={<ShieldCheckIcon className="h-4 w-4" />}
            >
              <StatRow
                label="Encryption at Rest"
                value={String(val("encryption_at_rest") ?? "Unknown")}
                rag={rag("encryption_at_rest")}
              />
            </OverviewCard>
            <OverviewCard
              title="Reliability & DR"
              icon={<ServerIcon className="h-4 w-4" />}
            >
              <StatRow
                label="RPO (min)"
                value={String(val("rpo_minutes") ?? "Unknown")}
                rag={rag("rpo_minutes")}
              />
            </OverviewCard>
            <OverviewCard
              title="Operations"
              icon={<InformationCircleIcon className="h-4 w-4" />}
            >
              <StatRow
                label="Audit Logging"
                value={String(val("audit_logging") ?? "Unknown")}
                rag={rag("audit_logging")}
              />
            </OverviewCard>
          </div>
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
                    <div
                      key={row.fieldId}
                      className="rounded-xl border p-3 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {ragDot(row.rag as Rag)}
                          <span className="font-medium">
                            {SPEC[row.fieldKey]?.label ?? row.fieldKey}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {row.evidenceCount ?? 0} evidence
                        </Badge>
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
                      {serviceInstances.map((si) => (
                        <tr
                          key={si.it_service_instance_sysid}
                          className="border-t"
                        >
                          <td className="py-2 pr-4">
                            <Badge variant="outline">{si.environment}</Badge>
                          </td>
                          <td className="py-2 pr-4">
                            {si.service_instance ?? si.it_service_instance_sysid}
                          </td>
                          <td className="py-2 pr-4">
                            {si.service_classification ?? "—"}
                          </td>
                          <td className="py-2 pr-4">
                            {si.install_type ?? "—"}
                          </td>
                          <td className="py-2 pr-4">
                            {si.it_business_service_sysid ?? "—"}
                          </td>
                          <td className="py-2 pr-4">
                            {fmtDate(si.updated_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No service instances available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HISTORY (stub) */}
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