# Governance Cockpit - Core Architecture

## 5 Core Architectural Components

### 1. **Policy Registry** (Configuration-as-Code)

Centralized, declarative control requirements that drive the entire system. Auto-generates risks when evidence is missing or stale based on application criticality ratings.

```yaml
- key: encryption_at_rest
  derived_from: security_rating
  arb: security
  rule:
    A1: {value: required, ttl: 90d, requires_review: true, priority: CRITICAL}
    B: {value: required, ttl: 180d, requires_review: true, priority: MEDIUM}
```

**Strategic Value**: Eliminates manual risk tracking, ensures consistent enforcement across entire portfolio, and provides single source of truth for audit and compliance.

---

### 2. **Canonical Data Model**

Unified data structure connecting applications, controls, evidence, and risks across all domains:

```
Application
  ├─> ProfileDomain (security, data, ops, EA)
      ├─> ProfileField (encryption_at_rest, WAF, etc.)
          ├─> Evidence (documents, attestations)
          └─> RiskItem (compliance gaps)
              └─> DomainRisk (aggregated by ARB)
```

**Strategic Value**: Breaks down data silos, enables real-time portfolio visibility, and provides accurate executive dashboards without manual reporting overhead.

---

### 3. **State Machine** (Risk Item Workflow)

10-state workflow engine ensuring every risk has clear ownership and defined next actions:

**Active States** (6): `PENDING_REVIEW` → `UNDER_SME_REVIEW` → `AWAITING_REMEDIATION` → `IN_REMEDIATION` → `PENDING_APPROVAL` → `ESCALATED`

**Terminal States** (4): `SME_APPROVED`, `SELF_ATTESTED`, `REMEDIATED`, `CLOSED`

**Strategic Value**: Prevents risks from falling through cracks, creates clear accountability, and provides complete audit trail for regulatory compliance.

---

### 4. **Domain Routing**

Intelligent routing system that automatically directs risks to the appropriate expert review board:

- `security` → Security ARB (encryption, WAF, MFA, pentesting)
- `data` → Data ARB (confidentiality, retention, residency)
- `operations` → Operations ARB (RTO/RPO, DR, monitoring)
- `enterprise_architecture` → EA ARB (vision docs, roadmaps)

**Strategic Value**: Accelerates resolution by matching risks to domain experts, balances workload across teams, and enables specialization at scale.

---

### 5. **Persona-Tailored Views**

Role-based dashboards delivering context-aware insights and actions:

**Product Owner View**: My apps, portfolio health, evidence submission
**SME View**: My queue → My domain → All domains, evidence approval/rejection
**ARB View**: Domain-level aggregations, team metrics, highest-priority apps

**Strategic Value**: Reduces cognitive load, accelerates decision-making, and drives higher user adoption through purpose-built experiences.

---

## Combined Value Proposition

**"Governance Cockpit transforms application governance from manual, error-prone tracking into an automated, policy-driven system that routes risks to domain experts, enforces consistent workflows, and delivers role-specific insights—enabling teams to manage 10x more applications with the same headcount while cutting resolution time in half."**
