// Real backend mock data generated from http://mars.butterflycluster.com:8080
// This file contains actual API responses to provide realistic mock data

import {
  AppSummary,
  EvidenceItem,
  RequirementsResponse,
  ReleaseItem,
  PortfolioKpis,
  ProfileResponse,
  AppKpis,
  ServerApp
} from './types';

// Real apps data from backend
export const realApps: ServerApp[] = [ {
  "appId" : "APM100001",
  "scope" : "application",
  "parentAppId" : "APM100016",
  "parentAppName" : "Parent",
  "name" : "crimson-beacon-210",
  "businessServiceName" : "Service-170",
  "appCriticalityAssessment" : "C",
  "securityRating" : "D",
  "confidentialityRating" : "A",
  "integrityRating" : "A",
  "availabilityRating" : "B",
  "resilienceRating" : "2",
  "businessApplicationSysId" : "7ca6ec1e-3537-4d71-b7eb-743cf3d5c155",
  "architectureHosting" : "OnPremCluster",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Payments",
  "transactionCycleId" : "11",
  "applicationType" : "application component",
  "applicationTier" : "Database",
  "architectureType" : "SOA",
  "installType" : "Hybrid",
  "housePosition" : "divest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:28:01.780458Z",
  "updatedAt" : "2025-09-04T20:37:28.323005Z"
}, {
  "appId" : "APM100002",
  "scope" : "application",
  "parentAppId" : "APM100017",
  "parentAppName" : "Parent",
  "name" : "onyx-cipher-627",
  "businessServiceName" : "Service-277",
  "appCriticalityAssessment" : "A",
  "securityRating" : "C",
  "confidentialityRating" : "C",
  "integrityRating" : "A",
  "availabilityRating" : "A",
  "resilienceRating" : "1",
  "businessApplicationSysId" : "b45cfaef-9699-4869-bd58-ddf1b563f871",
  "architectureHosting" : "GCP",
  "operationalStatus" : "Decommissioned",
  "transactionCycle" : "Lending",
  "transactionCycleId" : "24",
  "applicationType" : "application component",
  "applicationTier" : "Frontend",
  "architectureType" : "SOA",
  "installType" : "Cloud",
  "housePosition" : "invest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:28:02.234974Z",
  "updatedAt" : "2025-09-04T20:37:28.552047Z"
}, {
  "appId" : "APM100003",
  "scope" : "application",
  "parentAppId" : "APM100018",
  "parentAppName" : "Parent",
  "name" : "emerald-beacon-455",
  "businessServiceName" : "Service-427",
  "appCriticalityAssessment" : "B",
  "securityRating" : "D",
  "confidentialityRating" : "C",
  "integrityRating" : "B",
  "availabilityRating" : "A",
  "resilienceRating" : "1",
  "businessApplicationSysId" : "ab2932fb-3251-444d-88b2-d2da4393132c",
  "architectureHosting" : "AWS",
  "operationalStatus" : "Active",
  "transactionCycle" : "HR",
  "transactionCycleId" : "3",
  "applicationType" : "business application",
  "applicationTier" : "Frontend",
  "architectureType" : "Monolith",
  "installType" : "OnPrem",
  "housePosition" : "cease",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:28:02.389127Z",
  "updatedAt" : "2025-09-04T20:37:28.741358Z"
}, {
  "appId" : "APM100004",
  "scope" : "application",
  "parentAppId" : "APM100019",
  "parentAppName" : "Parent",
  "name" : "prime-beacon-578",
  "businessServiceName" : "Service-167",
  "appCriticalityAssessment" : "B",
  "securityRating" : "D",
  "confidentialityRating" : "C",
  "integrityRating" : "C",
  "availabilityRating" : "A",
  "resilienceRating" : "2",
  "businessApplicationSysId" : "9cb2aabb-fb05-42ac-82ac-8a282ba92c15",
  "architectureHosting" : "AWS",
  "operationalStatus" : "Decommissioned",
  "transactionCycle" : "Finance",
  "transactionCycleId" : "5",
  "applicationType" : "business application",
  "applicationTier" : "Frontend",
  "architectureType" : "Monolith",
  "installType" : "OnPrem",
  "housePosition" : "invest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:28:02.526171Z",
  "updatedAt" : "2025-09-04T20:37:28.86758Z"
}, {
  "appId" : "APM100005",
  "scope" : "application",
  "parentAppId" : "APM100020",
  "parentAppName" : "Parent",
  "name" : "prime-harbor-103",
  "businessServiceName" : "Service-919",
  "appCriticalityAssessment" : "D",
  "securityRating" : "C",
  "confidentialityRating" : "D",
  "integrityRating" : "A",
  "availabilityRating" : "D",
  "resilienceRating" : "0",
  "businessApplicationSysId" : "59ead46f-6d4b-4fc4-9828-87915371ad6c",
  "architectureHosting" : "AWS",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Treasury",
  "transactionCycleId" : "11",
  "applicationType" : "application component",
  "applicationTier" : "Database",
  "architectureType" : "Monolith",
  "installType" : "Cloud",
  "housePosition" : "divest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:28:02.667445Z",
  "updatedAt" : "2025-09-04T20:37:28.995742Z"
}, {
  "appId" : "APM100006",
  "scope" : "application",
  "parentAppId" : "APM100021",
  "parentAppName" : "Parent",
  "name" : "rapid-circuit-378",
  "businessServiceName" : "Service-514",
  "appCriticalityAssessment" : "B",
  "securityRating" : "C",
  "confidentialityRating" : "D",
  "integrityRating" : "B",
  "availabilityRating" : "C",
  "resilienceRating" : "2",
  "businessApplicationSysId" : "1102429b-f818-45e0-85ab-d1942b841c7e",
  "architectureHosting" : "GCP",
  "operationalStatus" : "Decommissioned",
  "transactionCycle" : "Finance",
  "transactionCycleId" : "12",
  "applicationType" : "application component",
  "applicationTier" : "Database",
  "architectureType" : "SOA",
  "installType" : "Cloud",
  "housePosition" : "invest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.137755Z",
  "updatedAt" : "2025-09-04T20:37:29.099076Z"
}, {
  "appId" : "APM100007",
  "scope" : "application",
  "parentAppId" : "APM100022",
  "parentAppName" : "Parent",
  "name" : "golden-forge-222",
  "businessServiceName" : "Service-180",
  "appCriticalityAssessment" : "A",
  "securityRating" : "C",
  "confidentialityRating" : "D",
  "integrityRating" : "A",
  "availabilityRating" : "C",
  "resilienceRating" : "2",
  "businessApplicationSysId" : "fc6c6e2c-dcb3-47bf-91d2-b0e9831c6d2a",
  "architectureHosting" : "Azure",
  "operationalStatus" : "Active",
  "transactionCycle" : "Payments",
  "transactionCycleId" : "21",
  "applicationType" : "application component",
  "applicationTier" : "Frontend",
  "architectureType" : "Microservice",
  "installType" : "Hybrid",
  "housePosition" : "maintain",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.257982Z",
  "updatedAt" : "2025-09-04T20:37:29.222415Z"
}, {
  "appId" : "APM100008",
  "scope" : "application",
  "parentAppId" : "APM100023",
  "parentAppName" : "Parent",
  "name" : "golden-harbor-941",
  "businessServiceName" : "Service-283",
  "appCriticalityAssessment" : "D",
  "securityRating" : "B",
  "confidentialityRating" : "A",
  "integrityRating" : "B",
  "availabilityRating" : "A",
  "resilienceRating" : "3",
  "businessApplicationSysId" : "da1c6594-cf66-4add-a7a0-f6f4c324c92f",
  "architectureHosting" : "OnPremCluster",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Lending",
  "transactionCycleId" : "3",
  "applicationType" : "business application",
  "applicationTier" : "Backend",
  "architectureType" : "Microservice",
  "installType" : "Cloud",
  "housePosition" : "invest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.393218Z",
  "updatedAt" : "2025-09-04T20:37:29.35396Z"
}, {
  "appId" : "APM100009",
  "scope" : "application",
  "parentAppId" : "APM100024",
  "parentAppName" : "Parent",
  "name" : "rapid-atlas-842",
  "businessServiceName" : "Service-967",
  "appCriticalityAssessment" : "B",
  "securityRating" : "C",
  "confidentialityRating" : "C",
  "integrityRating" : "D",
  "availabilityRating" : "C",
  "resilienceRating" : "3",
  "businessApplicationSysId" : "393a0501-416f-423d-90bf-0f09cab14195",
  "architectureHosting" : "GCP",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Trading",
  "transactionCycleId" : "27",
  "applicationType" : "business application",
  "applicationTier" : "Frontend",
  "architectureType" : "Monolith",
  "installType" : "Hybrid",
  "housePosition" : "maintain",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.515293Z",
  "updatedAt" : "2025-09-04T20:37:29.474973Z"
}, {
  "appId" : "APM100010",
  "scope" : "application",
  "parentAppId" : "APM100025",
  "parentAppName" : "Parent",
  "name" : "stellar-cascade-598",
  "businessServiceName" : "Service-377",
  "appCriticalityAssessment" : "A",
  "securityRating" : "A2",
  "confidentialityRating" : "C",
  "integrityRating" : "C",
  "availabilityRating" : "B",
  "resilienceRating" : "1",
  "businessApplicationSysId" : "4180675f-f80e-4687-8e54-d080422b9a4f",
  "architectureHosting" : "AWS",
  "operationalStatus" : "Active",
  "transactionCycle" : "Lending",
  "transactionCycleId" : "29",
  "applicationType" : "business application",
  "applicationTier" : "Database",
  "architectureType" : "Monolith",
  "installType" : "Cloud",
  "housePosition" : "cease",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.630128Z",
  "updatedAt" : "2025-09-04T20:37:29.590067Z"
}, {
  "appId" : "APM100011",
  "scope" : "application",
  "parentAppId" : "APM100026",
  "parentAppName" : "Parent",
  "name" : "lunar-nova-239",
  "businessServiceName" : "Service-143",
  "appCriticalityAssessment" : "C",
  "securityRating" : "B",
  "confidentialityRating" : "C",
  "integrityRating" : "D",
  "availabilityRating" : "B",
  "resilienceRating" : "3",
  "businessApplicationSysId" : "067c9ff4-4bc4-4b80-82a7-94e72733546e",
  "architectureHosting" : "AWS",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Lending",
  "transactionCycleId" : "7",
  "applicationType" : "application component",
  "applicationTier" : "Frontend",
  "architectureType" : "Microservice",
  "installType" : "Hybrid",
  "housePosition" : "divest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.745435Z",
  "updatedAt" : "2025-09-04T20:37:29.705423Z"
}, {
  "appId" : "APM100012",
  "scope" : "application",
  "parentAppId" : "APM100027",
  "parentAppName" : "Parent",
  "name" : "vivid-cascade-164",
  "businessServiceName" : "Service-450",
  "appCriticalityAssessment" : "D",
  "securityRating" : "A2",
  "confidentialityRating" : "C",
  "integrityRating" : "D",
  "availabilityRating" : "D",
  "resilienceRating" : "1",
  "businessApplicationSysId" : "65ecc946-1c4e-45cf-bcc4-54da3760a5af",
  "architectureHosting" : "Azure",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Treasury",
  "transactionCycleId" : "22",
  "applicationType" : "application component",
  "applicationTier" : "Database",
  "architectureType" : "Microservice",
  "installType" : "OnPrem",
  "housePosition" : "divest",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.847443Z",
  "updatedAt" : "2025-09-04T20:37:29.81042Z"
}, {
  "appId" : "APM100013",
  "scope" : "application",
  "parentAppId" : "APM100028",
  "parentAppName" : "Parent",
  "name" : "prime-atlas-740",
  "businessServiceName" : "Service-348",
  "appCriticalityAssessment" : "D",
  "securityRating" : "C",
  "confidentialityRating" : "D",
  "integrityRating" : "B",
  "availabilityRating" : "A",
  "resilienceRating" : "4",
  "businessApplicationSysId" : "154aa3a2-594d-41db-8d9b-b8788ea2e2c2",
  "architectureHosting" : "Azure",
  "operationalStatus" : "Decommissioned",
  "transactionCycle" : "Payments",
  "transactionCycleId" : "5",
  "applicationType" : "application component",
  "applicationTier" : "Backend",
  "architectureType" : "Microservice",
  "installType" : "OnPrem",
  "housePosition" : "cease",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:29.947757Z",
  "updatedAt" : "2025-09-04T20:37:29.907267Z"
}, {
  "appId" : "APM100014",
  "scope" : "application",
  "parentAppId" : "APM100029",
  "parentAppName" : "Parent",
  "name" : "lunar-anchor-671",
  "businessServiceName" : "Service-272",
  "appCriticalityAssessment" : "A",
  "securityRating" : "A1",
  "confidentialityRating" : "C",
  "integrityRating" : "C",
  "availabilityRating" : "B",
  "resilienceRating" : "2",
  "businessApplicationSysId" : "8b444210-f6d6-493b-8295-4a5e8375afa3",
  "architectureHosting" : "OnPremCluster",
  "operationalStatus" : "Decommissioned",
  "transactionCycle" : "Trading",
  "transactionCycleId" : "26",
  "applicationType" : "business application",
  "applicationTier" : "Frontend",
  "architectureType" : "Monolith",
  "installType" : "Cloud",
  "housePosition" : "maintain",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:30.054691Z",
  "updatedAt" : "2025-09-04T20:37:30.015158Z"
}, {
  "appId" : "APM100015",
  "scope" : "application",
  "parentAppId" : "APM100030",
  "parentAppName" : "Parent",
  "name" : "emerald-compass-232",
  "businessServiceName" : "Service-317",
  "appCriticalityAssessment" : "A",
  "securityRating" : "C",
  "confidentialityRating" : "D",
  "integrityRating" : "B",
  "availabilityRating" : "B",
  "resilienceRating" : "4",
  "businessApplicationSysId" : "4aadac97-ec75-4c8b-ac90-a971e0ad24e9",
  "architectureHosting" : "OnPremCluster",
  "operationalStatus" : "Inactive",
  "transactionCycle" : "Treasury",
  "transactionCycleId" : "26",
  "applicationType" : "application component",
  "applicationTier" : "Database",
  "architectureType" : "Monolith",
  "installType" : "Hybrid",
  "housePosition" : "maintain",
  "productOwner" : "Owner Name",
  "productOwnerBrid" : "u12345",
  "systemArchitect" : "Architect Name",
  "systemArchitectBrid" : "u54321",
  "onboardingStatus" : "pending",
  "createdAt" : "2025-09-04T20:37:30.172881Z",
  "updatedAt" : "2025-09-04T20:37:30.132558Z"
} ];

// Real KPIs data for each app
export const realAppKpis: Record<string, AppKpis> = {
  'APM100001': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 35 },
  'APM100002': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 42 },
  'APM100003': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 42 },
  'APM100004': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 23 },
  'APM100005': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 43 },
  'APM100006': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 12 },
  'APM100007': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 12 },
  'APM100008': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 30 },
  'APM100009': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 6 },
  'APM100010': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 30 },
  'APM100011': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 17 },
  'APM100012': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 19 },
  'APM100013': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 11 },
  'APM100014': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 23 },
  'APM100015': { compliant: 0, missingEvidence: 0, pendingReview: 43, riskBlocked: 17 }
};
// Real profile data for each app
export const realProfiles: Record<string, ProfileResponse> = {
  'APM100001': {
  "appId" : "APM100001",
  "name" : "crimson-beacon-210",
  "version" : 2,
  "updatedAt" : "2025-09-04T20:37:28.323005Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "2",
    "fields" : [ {
      "profileFieldId" : "pf_76ef33b81baa3b30d4206387b3836cfa",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard + periodic restore test",
        "value" : "standard_backups+periodic_restore_test",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7e8ff796901b48b0bd6999fcdbe8cd38",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7e8ff796901b48b0bd6999fcdbe8cd38",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:24.419466Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3e1ea46a4872965b1ba47227f1f8d503",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9e8b14df1f77405aa90325994a0b9335",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9e8b14df1f77405aa90325994a0b9335",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:59.947642Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_af1c77bc9edae6788e91e0f1542cf0fa",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Annual tabletop",
        "value" : "annual_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_644b181a043540e9854fae9878849695",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_644b181a043540e9854fae9878849695",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:01.484743Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ad237f4ae12d3dacf18e3d4ae300d444",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8ccc07382de1410dbbc4f2a549e8456f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8ccc07382de1410dbbc4f2a549e8456f",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:47.399745Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_dacdba10aa5c5287880ff48c3d541eaf",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c25595e9f5e24636843e970ec8f789d0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c25595e9f5e24636843e970ec8f789d0",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:14.161462Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_04d5336fdcbbde7ee8e86dbb41ef6bc0",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Documented",
        "value" : "documented",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_12f0aa363d6544388c78d3db81a19c3c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_12f0aa363d6544388c78d3db81a19c3c",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:14.863976Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fdacb4b38f10ca18216b3fd28e72d666",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f506aa0c59234531a6882599c2ccb5c6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f506aa0c59234531a6882599c2ccb5c6",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:59.125128Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_d8136249bcb35341bc2d4bb061d28fb2",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b8f1864703474b11ac364791aa7d5551",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_89715ece-b39f-4444-9cb9-09f662b9e054",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_b8f1864703474b11ac364791aa7d5551",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:48.932278Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2e8f7ec2abe77d59f059123e4944a719",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0410a729ca804aa9b37c8627b461b249",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0e5ef57a-56d6-4e50-ac41-f4873c79a436",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_0410a729ca804aa9b37c8627b461b249",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:22.845072Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_710676a0337a682cfa70045d43653681",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_75efa78e3b4141f2bbe5e5fa0c9ea1b1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_047bd0c9-52bb-44ae-8b27-6fc59f311d63",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_75efa78e3b4141f2bbe5e5fa0c9ea1b1",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:12.021141Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4d73a22c6f5b1d822269162bb1f0dece",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f581760d85af49fba8fcc52a8e8e3865",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_be3ae29f-da61-4368-978b-2e79ff158041",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_f581760d85af49fba8fcc52a8e8e3865",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:53.843543Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f0c0c2e1a5b261b68388b08ece83a61b",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_329a6a997b604d88a55c7dc63bc10bc7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_793c8e6b-9802-4ba1-a87a-aeff1b7add32",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_329a6a997b604d88a55c7dc63bc10bc7",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:50.487069Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fe525c67572804d99493684401059fce",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_37680caef12f40e3aa9da10dc7b6474c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_999c68ff-b70b-44ab-8d03-df19e9b56816",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_37680caef12f40e3aa9da10dc7b6474c",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:04.149132Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_82fd5bf304bbf289de078871819dcb03",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_997e86000494405098d9ceb9f617e2bd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_cfc867aa-2f4d-461c-9cd8-9507d3df9191",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_997e86000494405098d9ceb9f617e2bd",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:57.958915Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4398d709ef8443cf54e6fcf771f4b048",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_dd3a7c59c2484ebcb6c3fe87a3f1f134",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6bc512f3-5382-46b0-8561-6366e0dc8729",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_dd3a7c59c2484ebcb6c3fe87a3f1f134",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:52.854824Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3d24a716d0fc3f0fcfe5f9786cf61981",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Minimal acceptable",
        "value" : "minimal_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5a8cdc45a88b42258b6d3a3919025e99",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2d552be8-aa26-471f-90dd-9ad4914a1355",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_5a8cdc45a88b42258b6d3a3919025e99",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:56.374607Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_555470c2deb9b5c82e655f30f865c23a",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "SAST optional",
        "value" : "sast_optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_147f47c3823144358d657f09c8aeb19e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ca3493ff-a8a0-4e6e-87e4-a6e9e67588b0",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_147f47c3823144358d657f09c8aeb19e",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:06.977473Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_27bb999c7e4b2405cfbbf6dc822f4cc9",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_58e3cbf3f2de42e29482e5fdc43ff627",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_3ef60398-db3b-4c38-bf2c-cb489db41fc6",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_58e3cbf3f2de42e29482e5fdc43ff627",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:57.071267Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4cc9b5a1044c8824502b972918c94e09",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_52d8b79a23364e0f8fe40c8b17a1bc9f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_59c93e63-7496-48f9-a6cc-c464d4ad56fc",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_52d8b79a23364e0f8fe40c8b17a1bc9f",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:08.929666Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_7d79ae105ff0b3942022f13f6fd07958",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_95a4d6471c5e4fe0b4fc6f01e9c640ff",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_95a4d6471c5e4fe0b4fc6f01e9c640ff",
        "documentTitle" : "architecture_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:21.981664Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cee789a9f204925a4fc2b1cbb5bfafe3",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b2a9fb31682f47d58bfcf91876d23134",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b2a9fb31682f47d58bfcf91876d23134",
        "documentTitle" : "product_roadmap Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:20.345591Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_eaa90a051411779a30ee128bfeaed666",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5c917b6e64d5466289e3690e28c97c10",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5c917b6e64d5466289e3690e28c97c10",
        "documentTitle" : "product_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:37:55.593206Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a035d6ac254bc511d9ad60e7744e3d83",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_889d2837b5db4e228cc4f00b7e3a9463",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_889d2837b5db4e228cc4f00b7e3a9463",
        "documentTitle" : "security_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:23.628132Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d5f1231cc1152031ba496570c090e5bb",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_07c2fd118c4246da865e2118ef8cacd9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_07c2fd118c4246da865e2118ef8cacd9",
        "documentTitle" : "service_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:17.207398Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_301d0d9a71822422819f33cb0b37da0e",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2831a70e0719477485d7f07c811e4056",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2831a70e0719477485d7f07c811e4056",
        "documentTitle" : "test_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:13.456038Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_def0685c8b1c0c2588d371280743db93",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + daily review",
        "value" : "full_with_daily_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a52abee4083a454e9f371104b136aac1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ba392e97-6227-4c8a-8d75-db02d9b95daf",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_bbcdfca2ae4ba26fd9e05f5d7a43550a",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Independent review + regression suite",
        "value" : "independent_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_38641f7085294229acf5ff9a0227c436",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_3a313eaa-f558-49b0-b189-02ab75e5630d",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9676f1eace49e82b10b5a8be33c3630f",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Dual control",
        "value" : "dual_control",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_174ec228c6cf465c9ba39be9b9f44712",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7794443c-bda2-4bc8-b951-760210cce722",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c6ff5e3cbe3ca08ceb59c5bda667caf0",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2c732d8252eb4bb796c527068a4ac410",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:30Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b7c2e95f-429e-4a2e-976c-31f23cafae6b",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_161a208fffd7df603c19223cad07f40c",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 1 year",
        "value" : ">=1y",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2cd52d23328048a3b354f9f10101f2a8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d15696f7-e255-478c-a98a-a980bab1d1fb",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9830fd68a90a3aa47e908c06751d1722",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Daily",
        "value" : "daily",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4959ea101e7147deb9fec6bd5a22dc19",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b0913976-bd57-44c7-b975-fb2af2f7871c",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_0418b129a31ca746618e73e955ac98e5",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Passive",
        "value" : "active_passive",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_98d49100d3a146c9b4b29797da41158f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a6c2073c-574c-4436-ad25-e16e7cc7066f",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_a603db8b-401b-41a4-80ab-3116c740bf49",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a7b41cf81b68dc57148c61fafb059580",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.5% with alerting",
        "value" : "99.5_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_8e1b5912ed9b43289813c1a271d0a2b7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_64acc2e1-8982-494a-ba32-a80bcc6bd5d3",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_26e0b341-9fbd-42e6-93f7-2e5024da9639",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1afba87f4b9eaf74282959e189c306aa",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "16×5",
        "value" : "16x5",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_78bc82765a0449218e7aac49e73467f3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_47f18223-6ddb-4668-b926-4bb1109c0537",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_fee100c8-0b32-4f52-81ec-4689f1e3759a",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_13faed36ec81af66f015cf87d3b46cde",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 60 minutes",
        "value" : 60,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_3cf62d18c3ed464a9abd02b292db849f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ed4f8742-cc07-40cd-bc8c-0d41078dfacf",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_eedc3cc7-e27a-41ae-9e2d-cc4053f37a70",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_36adc972020518b238fa8c0dd994f3a3",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 4 hours",
        "value" : 4,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a100382564b043de84a7078223e53b70",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9aa462ab-ceef-4484-8d53-cf5e6d64798b",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_2720eef6-0935-4963-afa2-14ef2b949482",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_04ecef9c51af92349274f64b45fd3952",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Quarterly",
        "value" : "quarterly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_755d219632254e08b23390ec8ea65d27",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_cbb22208-4f5a-4f34-b15f-c63f0f35ee76",
        "title" : "Auto-created risk for access_review field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_37c20a19bfe6277532567613b5cdceff",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Restricted",
        "value" : "restricted",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2fc1a08553e840bb91875ec72ec8077d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c70b0ed7-dbb6-4ee2-a912-9359dee9d1b0",
        "title" : "Auto-created risk for confidentiality_level field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_0ed51ec43667f1216fe5eb06fb816210",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ee99db55b2fd4137b11afcb58136a9c0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c85d26a1-7299-4847-b3cd-2db8b9884830",
        "title" : "Auto-created risk for data_deletion_evidence field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_dc27cac3d176f648ec6735b9bc3fae13",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required in-region",
        "value" : "required_in_region",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9db2d104faa148deaff75dda7d8c9732",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_072adf55-59d8-42fc-ae09-cc8e83261388",
        "title" : "Auto-created risk for data_residency_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2486d9729f1620ad3d39a47a1b240793",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Defined & enforced",
        "value" : "defined+enforced",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1643e07d46254355ac41136959304910",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9ef261f7-5091-485e-ab3f-84ac39315d1d",
        "title" : "Auto-created risk for data_retention_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5a99929135f5321084a559c3e86da7cc",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory (strong)",
        "value" : "mandatory_strong",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_bae41b1d17964a6ba67209a5a2d8598e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a0aa95c9-f4e0-4005-acad-73345dc6dd46",
        "title" : "Auto-created risk for de_identification field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_92ed93e7b2e298c6db232b4279c54f44",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4502f1b6aabd4a1a99d136a79ca8a430",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f749a762-d9cc-4dea-9934-c4c7a263739a",
        "title" : "Auto-created risk for tpsp_attestation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  } ]
},
  'APM100002': {
  "appId" : "APM100002",
  "name" : "onyx-cipher-627",
  "version" : 2,
  "updatedAt" : "2025-09-04T20:37:28.552047Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "1",
    "fields" : [ {
      "profileFieldId" : "pf_c65a4a918cb4d61d197dcaa2c1885313",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Encrypted + tested restores",
        "value" : "encrypted+tested_restores",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d972674e9c9e48b29715681f8aa90b35",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ae06f7e3-023e-4fd0-bc10-d9525e70c4bd",
        "title" : "Auto-created risk for backup_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_786fe5d7e39aa5ada8c6458dbbe40b81",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a813c5de4fd74d85aed26bd0e3d70fd7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c266abfb-1691-4e41-b1af-a733676a5482",
        "title" : "Auto-created risk for chaos_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5532986806ec88c28fa13f23545b1f16",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual live",
        "value" : "annual_live",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_bd1058ce9e9e419cbf1d53a80492eb91",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_faf4a4c4-860c-422b-9402-5dcf51c97882",
        "title" : "Auto-created risk for dr_test_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_f711a4c9f75326fbb47526ea42857214",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Semi-automatic",
        "value" : "semi_automatic",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_311a8ca3f06f42ab8a52f57cb8fe1b41",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_69b0eebe-854a-4c3d-a979-6c8df6851a95",
        "title" : "Auto-created risk for failover_automation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_039b3039fca50d0a240c1442acbf997e",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tabletop",
        "value" : "tabletop",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_78a77b07de744222a757c0162564b44c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_183f3015-a618-4cb2-b9e2-fa81ae055844",
        "title" : "Auto-created risk for ir_exercise field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_bb3ccf9ff20fa772ff7a782190d9def1",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tested annually",
        "value" : "tested_annually",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_adf7bdb38b664b898cdf57bb60a0d958",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0cf602d2-568c-493f-bcc7-52f7998d74f0",
        "title" : "Auto-created risk for ir_plan field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1d477cc34f388774ba25596ca789596a",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Approved",
        "value" : "approved",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_53d2f26bd3b6496e95a2f8c31929b34a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6b5b7bec-bd39-4cd0-9619-eaee2a3af5b7",
        "title" : "Auto-created risk for runbook_maturity field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_c1d2f1cf916e13a919c9e9adb88f1def",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b48992cd62f542e18d8d3b0373ddc74c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b48992cd62f542e18d8d3b0373ddc74c",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:51.510946Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4447fc9a9cf38a10a2863f4e924a15d0",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ee2ede830fac4e269e28cbefee4e63a2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ee2ede830fac4e269e28cbefee4e63a2",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:48.998364Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a4d4b5199f5ff5cd46a732cea9ce923b",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4d8ca7b9395b4e3c8d3e52561e080379",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4d8ca7b9395b4e3c8d3e52561e080379",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:26.682747Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cd1464ae9a36790dcfe953372016856a",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c20be14d58924cea8e8369937f853ab3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c20be14d58924cea8e8369937f853ab3",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:49.928038Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c35fd363e27416a16982d574a0146196",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_555068cd693147b69ac32ea82dc02101",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_555068cd693147b69ac32ea82dc02101",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:57.605844Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_863fbcf94c13e9f539c15227e459d265",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d8290fa5783b491b9e7ed3d98c1a6804",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d8290fa5783b491b9e7ed3d98c1a6804",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:53.211407Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c6fb1cbede5503c619603abaefd75b79",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_710f0de65f3244ba94ce0cc66f688a8f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_710f0de65f3244ba94ce0cc66f688a8f",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:30.732977Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b0d76b0cdfa11eb01c5e8ead5e4b6f99",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_be90a7ee4abc4663a16acd7182ec83bf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_be90a7ee4abc4663a16acd7182ec83bf",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:56.836036Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_843629fba144b051885e67eb5c704426",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_86e0d92ab9bd49abbac7fbeb776df5b2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_86e0d92ab9bd49abbac7fbeb776df5b2",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:38.200414Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b1c4b4900511c75f9e6b6a3e60852840",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_54f66633700946119f4b7137f5b30aa3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_54f66633700946119f4b7137f5b30aa3",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:31.513419Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c684662db6c6b2fc11830c43c05f849e",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_656d6c721a2941b4a093ebe91b38c16a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_656d6c721a2941b4a093ebe91b38c16a",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:45.691903Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_23ae9f3fac3102acde6d5acc73a0a42a",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_41304e58b5964ae3879faa833bbb7565",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_41304e58b5964ae3879faa833bbb7565",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:46.576666Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_10580f4639f7c1ecd880ad95542e641d",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_638bb4a319a44dc5b47a9a92fce36136",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:31Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d839d71e-73e9-4d8d-90ba-c40629f38261",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9a026061d304a73ffbd768259978a1e8",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1d315a8e037f4fb7b6fa00e193290438",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_dbdf1351-c0a3-4abe-a018-02bb97d91c5d",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3f6213ada2d1c46cf42216286ffa5783",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_230508d1cc4d4b35822bf78ba6877616",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d43be2b9-ea88-48bb-9acf-3ea12c0e6fb6",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_cd335ff68da95f11f1c72e5acbb11115",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fb547cb55b2143218372f06d8f0f3df7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_81d77db6-2b03-4045-b277-b7a809b067cc",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ca4938ff434f989d874a12ed7d4b5b1f",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b1f3cc0b661f415f8053dcfe51af7b3e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_bad06c4d-2940-4b85-a781-406c119ebe62",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c1948d5ec6fc2849e374aab4d701be62",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_5c91bfdfbab5425a866e424d4b766a24",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f4c91101-a195-4811-ac60-779a818eab63",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_9c926102b80d5ba218ee97d267a86fdc",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + daily review",
        "value" : "full_with_daily_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0c597dd29ac84ee79108201db729a0f0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_16e2ba6e-7bb2-4884-a70e-40e04b449f74",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_60023b18-42c2-4f32-9783-7bb9e3e52b33",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_4c0c46195382f2f692d8a56357cc8007",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Independent review + regression suite",
        "value" : "independent_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b1ecf2aef627462f83651ecf71db7cf0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8c66c6d6-fb34-4eee-8778-42ebc2f2aceb",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_66ec848a-3a05-4081-aaf8-b57f50c63c13",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_81bb129322f3ba75a17360ff4359277b",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Dual control",
        "value" : "dual_control",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4cbc18a1fb424100bead151b77eb06ca",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c96006c9-2b6a-40c7-85b0-5c24a20851e7",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_402eb624-85cc-4ca8-a895-06f8270871eb",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9d97c7a5a0c4ee29b1ead800f42c3d6a",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6a5ae184d485416580cdbb3e22be0d72",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_472e59e0-e00c-4bd1-ad0c-54305d7f657c",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_19e5d72a-172f-45d9-b4e1-89d29bb996b9",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1d85da24cd0cc5f28aaf841717829eec",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 1 year",
        "value" : ">=1y",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_83355117c3ef4a3da1c3153a82e0599e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_57408ffb-84bc-4ab6-b7e6-8112c8f4e724",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_cad3791c-c4bf-4881-9731-aea8fabdd1eb",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2160cb00f1ad507b5cf47857e10db720",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Daily",
        "value" : "daily",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_31436ebecfb34aa48abc73242597e38a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7dc19599-3495-4a7c-b5c6-b95838c9da53",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_46d748c5-5ddd-4aec-8beb-ccae9ced2907",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_ba21da7563fb4b4208c5876dbdc07fc1",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Active",
        "value" : "active_active",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9bc91e11f3244dae8671f059f30f9fe4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_487f2a5e-caf1-4204-ae07-ed5902cbb44d",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_7a480e18-b73c-40b2-bc24-8aa72d5fe9fc",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_394c51075143adba5a3aeefaaa8cb03b",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.9% with alerting",
        "value" : "99.9+_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_dc7f46a7b6f84f65850b791aea53c1e8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_06e4c33b-be04-42eb-bc97-b813eaedf3da",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_d70067e0-ace0-4d63-9599-28e748f48143",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_dad7ba7b88b053d425dc3f283fd1a2f7",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "24×7",
        "value" : "24x7",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f4abc744cdfa405ba28590bbde037814",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5ccbd1d3-5c19-470a-9b8a-d3f120731819",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_5c83436c-4363-4a6b-aa3c-ebca5050a7dd",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_87a9a542e121f4a98d20031de7347647",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 5 minutes",
        "value" : 5,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f969d26533c24e62b576cd98a846177d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c1ce8d3f-0edb-438e-8c28-b33813679f55",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_5230c038-9a83-44a0-afea-95f5f33311f6",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d336e8977646c9cb0c51e12e92de6167",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 1 hour",
        "value" : 1,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9a81f6512a2a4c668bd322d411165010",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_620f041b-9412-4ef7-b44a-4bc399fda93d",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_791dcf2c-9d4c-4c0d-9574-fa55783fe74f",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_36bc2c3d8baa904840aa64f525fdd032",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0434dbbf05ae4505936529246f1c6314",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_56bcccc0-48ce-496c-9564-de6a2ca5b068",
        "title" : "Auto-created risk for access_review field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_0434dbbf05ae4505936529246f1c6314",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:34.85188Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a2f4a83962c0caa01ef937784cd637c7",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bd52774ab66e43c29dcf221cd0718d08",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_02c5ab6e-9d45-4f54-8bd1-fa26414aa8f6",
        "title" : "Auto-created risk for confidentiality_level field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_bd52774ab66e43c29dcf221cd0718d08",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:42.327455Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_940f95f1c60735e45c94db81e4b1f8ba",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_68c35b90df734be6a5b012b62d6c05c3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_13a68b23-4e2b-41eb-86a4-337c04995d2a",
        "title" : "Auto-created risk for data_deletion_evidence field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_68c35b90df734be6a5b012b62d6c05c3",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:59.151775Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e621ae4e7b67c90876ee99d7d8b02cd9",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_881c9f68a3e14e73a11e354f39b013fd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0b6676d5-30ed-409b-a84f-11a01c4764cd",
        "title" : "Auto-created risk for data_residency_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_881c9f68a3e14e73a11e354f39b013fd",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:32.365168Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8283febb07cb77092ac7e41aeaddd26e",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5dbf466367fd4eeabd51bdc14e8db5da",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_28c53b96-9ed0-40d3-8cd8-a8e1dfb55a2d",
        "title" : "Auto-created risk for data_retention_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_5dbf466367fd4eeabd51bdc14e8db5da",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:48.22011Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9ea3f7e62c3e05178d8af6489c684ae0",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a3af35757ab64fc5927a9f51ea3f3a2c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b0088607-d88e-46b6-a232-ec4a675dcfa8",
        "title" : "Auto-created risk for de_identification field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_a3af35757ab64fc5927a9f51ea3f3a2c",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:55.870289Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0c751f47fc9f0a26c0cf62688192a2a9",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6e6115256b39436091b78683ad1dbfc5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0d76519b-4a65-42a3-b00e-6f096ca39b36",
        "title" : "Auto-created risk for tpsp_attestation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_6e6115256b39436091b78683ad1dbfc5",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:38:29.90242Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100003': {
  "appId" : "APM100003",
  "name" : "emerald-beacon-455",
  "version" : 2,
  "updatedAt" : "2025-09-04T20:37:28.741358Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "1",
    "fields" : [ {
      "profileFieldId" : "pf_e4cc68a1541fb36f410c8a999a32e428",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Encrypted + tested restores",
        "value" : "encrypted+tested_restores",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_43a32a131a084884a785c59d9c6cddff",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_939a97ee-e5e4-4839-bc9b-f21f44dffd4c",
        "title" : "Auto-created risk for backup_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c7471bd2e37ce021a6698c513b4739fd",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ad3c61bd5db04a0ea236435750bb1722",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_acd62ab0-e908-49de-b717-f511103c33f1",
        "title" : "Auto-created risk for chaos_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_eea6ea6e603b5af037e5895381781b3d",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual live",
        "value" : "annual_live",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_28efb22e274a48829579b5920ab5956b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8d6c77fd-18a8-4561-99cf-4cd0a7be6b15",
        "title" : "Auto-created risk for dr_test_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c0a986d911be1389dc3c1b379af8df66",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Semi-automatic",
        "value" : "semi_automatic",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_391ea0a539c94a808ed25af39d8dedb5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_cf1c645a-a20d-4862-919b-142b3e951019",
        "title" : "Auto-created risk for failover_automation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_baf3415a2b0c82e3b58df565d4eec842",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tabletop",
        "value" : "tabletop",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4678caa1962f4e2d8c7ac53234634361",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1427a5d7-8e38-4713-8a18-7b4fd3e789f3",
        "title" : "Auto-created risk for ir_exercise field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a28f1a93e2c40c52f010eefdabce76e3",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tested annually",
        "value" : "tested_annually",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ebf0836b781f4e30b73b5c24ab463d11",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_593f4766-5eef-46fb-baf0-8912aa02016c",
        "title" : "Auto-created risk for ir_plan field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c9ec7d038c61016fcbf1d8f702581698",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Approved",
        "value" : "approved",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_65d0f5671cd94aa0861a6be055ef6224",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_af8785d5-3b0a-4c17-a348-036584a138a9",
        "title" : "Auto-created risk for runbook_maturity field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_c78e5786b00ab739759b692167c598bb",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_19be4de6d5204d5e86c7384206cae946",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_10c85391-6e2b-476c-aede-319930731305",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_19be4de6d5204d5e86c7384206cae946",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:34.506548Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_7af5fdd6f4e8aca4a2804c6c90c34233",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_dd362e3bda284cb59f937e76b78f6b6c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8d74d314-f59c-4222-9409-657c51ebcce8",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_dd362e3bda284cb59f937e76b78f6b6c",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:09.067332Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_abcdd6c2204c4e3d8db8224911118f70",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f7a234c3c2214463b4051d80ac5320fd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e3cb83b3-f50e-4330-94fb-b24bedd9ffb0",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_f7a234c3c2214463b4051d80ac5320fd",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:22.331506Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_416afc63391f47c68f5a7cb62199d822",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_23e6eb98317340098ce4f8dcc1559d3d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0b58f779-3ca2-40e9-b258-5a4fd5336516",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_23e6eb98317340098ce4f8dcc1559d3d",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:01.83628Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_19c9d436f04acb13728e0e9d82a1db93",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_82d66d1fba174220ab4d6bfa20575dec",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ea7e7c91-e06d-439d-9768-5f14485f0a1d",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_82d66d1fba174220ab4d6bfa20575dec",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:32.170281Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_233754ef18747c75e1b4706b1d03adcd",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fdef10dff054476cab66455f59f60b58",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_99bb8b9b-ee4b-4985-91f1-d57146525b2b",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_fdef10dff054476cab66455f59f60b58",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:16.560725Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2b543910f2bceb74c798f3041e1f7f12",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fb8e817305514d19953e29b5e3460e01",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_759263da-a613-41a1-80d6-e668b0e7eecd",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_fb8e817305514d19953e29b5e3460e01",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:00.981983Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5434f360074c47956c61f062a42c8ead",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_97e20b43fdac408b85ccb94a553ed3b2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2f314752-09eb-4b85-a99a-e78fbd66e624",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_97e20b43fdac408b85ccb94a553ed3b2",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:25.610919Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_48bd5421e9cb02db803aa7b275c8af55",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Minimal acceptable",
        "value" : "minimal_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9b27a998ea184fbc90d1db0cf8eac297",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6c640e37-9c8d-4bac-a02e-80320fe5a2ab",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_9b27a998ea184fbc90d1db0cf8eac297",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:38.438656Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_28cfff02286d0a6c301478c29198c250",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "SAST optional",
        "value" : "sast_optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c929fc9050d74081a45f1d2437743c49",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0ce10476-ff00-47a6-b45e-65bf5a43be76",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_c929fc9050d74081a45f1d2437743c49",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:30.440485Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2902ab4c180f8fa084092e6df72a32bd",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f10f6c1154b5495c9b8c18d38704cd06",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6fbe6878-43f0-4720-b824-cbdbcd6044f5",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_f10f6c1154b5495c9b8c18d38704cd06",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:06.991326Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_afcfecf6bf692ef203232aba58481cb7",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_abc9057ab0094d13bff97c0aa220e0c3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_585f00bc-6b11-4584-beeb-90b6bf4ff31c",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_abc9057ab0094d13bff97c0aa220e0c3",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:26.4204Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_09517c91edd18216102a784b9ee6242c",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_3daa12f7f68149f5ad60785350105c5a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_50dc1309-87f7-49fd-8e37-5fe005039b86",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ce64b85652a5cbe9ba9179acb137154b",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_430d5c27cdd64bbd86a49f30003f3e8a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2c0b5259-6597-43ca-98a9-9501275e87e4",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_04af3d385d82fe1b5be6e27eb0d84ca2",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_09257cdf0da04f5c9d7bb0e0ce4a5455",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5f5fd420-3361-4d4d-8b71-ccf15130b2ef",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_dc77bb902a1b1bfb02dbe28d1a5b11ee",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2e4cd3445db643bda47763ec6a8c3c7f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_93404c4f-a9dc-47fa-b8ae-d77308e6f188",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_adbb1aac21fdeff89d5e797c902803ce",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_442fbb3343f34e97b15281181da2877b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_55f4a380-4e82-444f-beb6-c3677b2dabaa",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_350f48d87b91abf77903afc85f53859b",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fc09fcf977fa44f4b9039c137e57dbfa",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_23c78e60-40a9-479e-8164-c735e68bb30a",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_518fcd37abfed83d75f60436fed62cf8",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + periodic review",
        "value" : "full_with_periodic_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e2e8e3818c804f798de3a00fc566825e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_86438710-351a-47c6-9cc7-a1716d8eac43",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_82f11caa-353b-401d-b98c-6eb77e042856",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_aa9066a102407edd2f91d4c6f3d364e3",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + regression suite",
        "value" : "peer_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2be8fa6c242d4065989cb4fd42f3f9c1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_57228506-db95-4346-af8e-6aeb4aa88604",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_8daadfda-bbe3-4067-81a0-14d10e500072",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3decb81a37b0db251695cb98d2865c03",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Strong validation",
        "value" : "strong_validation",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2fe2c8b79f5847708b43cc902d13869e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f035edd5-6c3d-4c87-9779-8790aa1635c8",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_f43c5044-646a-4a8b-9af8-5d01a0f30aaf",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_86220ad7afa6286525bda132d9f7c909",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e71728810944442eacc5b4de8e4dc8f6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_52baa893-4391-42dd-8b3f-e8ee3fffa8cb",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_16c65e60-843a-4a60-9b89-f48e9d373d90",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_71ebc2f18abc7074e195432606860045",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 6 months",
        "value" : ">=6m",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_434e3e5ff0d249a7a72fe96e92b79caf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7c5a8001-39e6-4386-abcf-deaccd973415",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_9808cf35-74de-4ffa-b060-d6c2b69fd85e",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_40df10c6323a07f85e114d3686704656",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Weekly",
        "value" : "weekly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_249c177046bc46c68ba9bb6326f4d258",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e7b20486-d9d1-47df-945c-29e5efa3460d",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      }, {
        "risk_id" : "risk_8267b67d-510f-46c4-8be1-056dcd3a6e8f",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_ba2f3bcdc778de618610e40b6e4e625c",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Active",
        "value" : "active_active",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_20a103b543564ffbb728c2e8a78599d4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4c917917-82cf-4c87-9f70-d54050348b28",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_84a0a796e5b7e2187ca780587798fcb7",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.9% with alerting",
        "value" : "99.9+_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e83557a708e945548c00ab826d78448f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6e67b7f2-8439-4d40-945b-b4e2c5726719",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_38fe85ef8f5eb24a8df8f3505df3e05b",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "24×7",
        "value" : "24x7",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_19668208c37a439db326d75cc482e50e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8048a974-ce4a-43ca-bf09-1dfa1feabb9a",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3a85fec9a29f844c03ac47ad60aebba3",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 5 minutes",
        "value" : 5,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_822f8ab3db4c40b983b16375fd3a7c8f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_460b78ab-a750-4a8f-aaa1-01d302ac2f3d",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_4c5ec3d7b419b14540973db1566034ff",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 1 hour",
        "value" : 1,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9de3db2eaa5a45398de1751398eda976",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e863b39c-13a6-43a7-b3d2-b6227290949d",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_93bacd2b760340154cde0efab16012d6",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1e03b551a9e1441cbbfbc671e3726371",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:32Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1e03b551a9e1441cbbfbc671e3726371",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:33.761773Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c57b6b56ce4888b3b579c2d59fb054ef",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_574b2544818b4296a5e1731952883980",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_574b2544818b4296a5e1731952883980",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:02.657728Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_917e83111f3b1c7e95bcf64411d154ab",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d1fbe6ddb1f5428499140fc9d9036027",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d1fbe6ddb1f5428499140fc9d9036027",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:28.887394Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_40465d40822922811196a1f49bc85356",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0857a18a5f4d44bd9d908a75fea63cdb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0857a18a5f4d44bd9d908a75fea63cdb",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:24.840017Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_79707776b7196041723f5e764fcf4fe4",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d23f78adc44c4299a6a46666b5f7ed69",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d23f78adc44c4299a6a46666b5f7ed69",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:37.688917Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fb3760f2ccf2f2f98aa61f90c6844ba0",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_66f480f8739a4c368b00d5284f187623",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_66f480f8739a4c368b00d5284f187623",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:29.620849Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_32ae7f553d7335c9678dbeeec50d5a13",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bcea22c43cb74571898a5d4d2926e990",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_bcea22c43cb74571898a5d4d2926e990",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:27.238353Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100004': {
  "appId" : "APM100004",
  "name" : "prime-beacon-578",
  "version" : 2,
  "updatedAt" : "2025-09-04T20:37:28.86758Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "2",
    "fields" : [ {
      "profileFieldId" : "pf_80e3d514e019d2c7274ebee83672282a",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard + periodic restore test",
        "value" : "standard_backups+periodic_restore_test",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bf5deddbec254577ac21d8931530d83d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_bf5deddbec254577ac21d8931530d83d",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:03.37175Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_54469e6e223586763068e60804858ffb",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e6d1d806d4004177ac74c09a0972b734",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e6d1d806d4004177ac74c09a0972b734",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:39.987095Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ae300217754b5d7ed999282de089ef2d",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Annual tabletop",
        "value" : "annual_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ac750f6db41541fb8577686c13616745",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ac750f6db41541fb8577686c13616745",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:49.875412Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_68572f01173b73ba8aa6e79a0b59c2e7",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e1001b8aa31a4b91b725ea0487a96b8a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e1001b8aa31a4b91b725ea0487a96b8a",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:54.649951Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b396be3f612b7e21cbee569e165a3731",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8cead5a8b86f40ef9db8f9b62460b140",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8cead5a8b86f40ef9db8f9b62460b140",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:08.716022Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_13da9c6057149a7d12324d84c4daf35f",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Documented",
        "value" : "documented",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5a7d14f202c14f1396c6975f64ea2951",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5a7d14f202c14f1396c6975f64ea2951",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:47.260164Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6ad5c2409c53a723ebd29d82e1a5f387",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_40a2208026ca4200861e6764628f7cff",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_40a2208026ca4200861e6764628f7cff",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:58.726971Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_3b70d2fb10c3fc683d230d0534f155e7",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c7328d97bd3e49178a2a135a29c1fe9b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_85ef52c1-b327-4b0e-94cc-fd29b572f5e9",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_c7328d97bd3e49178a2a135a29c1fe9b",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:14.898039Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e1e998456f82e4e0f2cfaf6f9cf626e6",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7cf84a8cf7fb46f8a61cb12b37295a63",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f9cdc871-a3a2-4a5f-ad1a-709a45de8ff8",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_7cf84a8cf7fb46f8a61cb12b37295a63",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:56.234482Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c432642ad5dd3038bd68c1ace0ae764a",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_81176b1a542f4f9f82f8d1f58d000737",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d734561f-c420-4660-8d58-1a7a6fd7514b",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_81176b1a542f4f9f82f8d1f58d000737",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:50.702767Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_13ce3573d3bc94869c79e7ba0823bd14",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ebe469780a3241e5a22be39179afd066",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_71cf43b5-8905-47c8-80ea-97178c7dbae1",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_ebe469780a3241e5a22be39179afd066",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:12.355381Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e042f93b6f843c998e98ebddb9561b93",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_83ce6011f3064c008c873e2c1b90f0b3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_afd42e86-57a8-41dc-b87a-970cd909c84c",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_83ce6011f3064c008c873e2c1b90f0b3",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:43.173596Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_78d7798c0ed84ad439ee4646c3f67d38",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_dd22c5460aff4df296978c9063453c18",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_157853cc-61b4-4785-a5bf-b1875538f4f9",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_dd22c5460aff4df296978c9063453c18",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:39.195382Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_64b42248518c7105f60e935fbd77dc2c",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_495bf6b133804824a72f87443d978e1b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_3d22c3f3-9b07-41db-bc27-c13fb5c4f726",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_495bf6b133804824a72f87443d978e1b",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:51.52958Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6b246d91db123c1dc963341b01f509fa",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a959bced9ae242e080ad865f4923ae31",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_bec4d2bf-410a-45c1-85fa-e1e5af1844bf",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_a959bced9ae242e080ad865f4923ae31",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:48.204813Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e86db6797d886761a5e3ea1e2f9e3e6b",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Minimal acceptable",
        "value" : "minimal_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3e82179d41724f92881e287eb020b745",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9d502335-9eb5-4cb4-972c-e094a1f5ae86",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_3e82179d41724f92881e287eb020b745",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:00.882232Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cb8d4873731d7241e108e20606056932",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "SAST optional",
        "value" : "sast_optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_596ffe8b6b894aa5b33154c82d627d2b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_da168c29-d3f8-410c-bcd0-789256f231fd",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_596ffe8b6b894aa5b33154c82d627d2b",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:52.285335Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8b1148f173b176a2070b957a6ab404b3",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_931cadaebb2c4929bd60d209dab1725c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9a3c3c21-942b-4693-85ca-64656e7213b0",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_931cadaebb2c4929bd60d209dab1725c",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:14.066078Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4fce91f47486f1e54374419c48ac798b",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d616ac9c00024a5a86f915d95403a955",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fe3633ac-bb27-4237-a0de-97adb9fd22f0",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_d616ac9c00024a5a86f915d95403a955",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:01.734825Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_8ca37694bc26308d89f4d9f6192c3e5c",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2d23889a78364d11a9541094f0944643",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7f478e83-f478-4352-968f-5d1d2c010858",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a181c6cfd4cec7b220e14a92ba1c267c",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_379bf35da6f84b1099dbd9b052d996d8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f7a5a1e8-4d60-45e3-958a-41f0827b44d7",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_683856f68f260eb475cc7c62e9002912",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d88115c98cfa452f932d4f27b4b1205e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_028f74e3-6019-4ecc-8721-a1c3f228ace0",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_24092b7f86898d64c3b3270e83771190",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0e5f92403b5a4124b0db65c6622b6f50",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c52b4f3d-6983-4c26-bf29-1f048e62830c",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e23a489ff0976234334f0a82612e93b6",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d3a4b8c36f7a459ebb6e6cbc7ee54af2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e5af13a9-4c2f-4382-bca5-fa86d4efb4b3",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_f804276a6f3bb5e8f70b59535a8fd62d",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9b543ec94ed244fe836b2eaedf88cc69",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7b8c9d42-e46f-4587-bc74-d7e5d25ec349",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_0091c9aaf24caf11d4f1488543242ede",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Logging enabled + sampled review",
        "value" : "logging_enabled+sampled_review",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f906afb56e834c3292e43513f53c70bf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f906afb56e834c3292e43513f53c70bf",
        "documentTitle" : "audit_logging Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:45.56782Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5995f0e4c6715f6db3db39d2075bc0ea",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + unit tests",
        "value" : "peer_review+unit_tests",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_94efb10f2b48443984fc39dec85f0153",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_94efb10f2b48443984fc39dec85f0153",
        "documentTitle" : "change_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:41.629811Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9f4fcde8977c0af52fccdfc86cdc4599",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard validation",
        "value" : "standard_validation",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e7f1982952ae46408f9ebe4aad1fb8cc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e7f1982952ae46408f9ebe4aad1fb8cc",
        "documentTitle" : "data_validation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:43.971396Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e79fc3986da87b667e6d7804f94ca01d",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "No",
        "value" : false,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9b5d44bad8134b88bd2ca6aa424e074e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9b5d44bad8134b88bd2ca6aa424e074e",
        "documentTitle" : "immutability_required Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:55.441151Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cfc1bd884083dc354e575210d6084b57",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 90 days",
        "value" : ">=90d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1c13d3b24bfd46bcbaea1b5c7801c33c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1c13d3b24bfd46bcbaea1b5c7801c33c",
        "documentTitle" : "log_retention Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:11.486376Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1f0490f43ef02c2b1bb5db6ab4aa33df",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Per release",
        "value" : "per_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fc5aac76493a4e59864c764c0f43f553",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_fc5aac76493a4e59864c764c0f43f553",
        "documentTitle" : "reconciliation_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:57.023704Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_e19918d16912573a2e7ddb4b519e21ed",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Active",
        "value" : "active_active",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c1e74963e04946a1a7d927090a655399",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a9c0f631-728b-4ead-8c56-fed7ac61ca78",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a606dc2a4fef460b754bc761f8c78c47",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.9% with alerting",
        "value" : "99.9+_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a0fa694fdacb4f588a00a0c1e80f79bc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_56ace412-f9f4-476c-9d2e-6db4849db8cb",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d5b1717c521665b56266c10464e56cb0",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "24×7",
        "value" : "24x7",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b8a378313f72468792ce1237556e104d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_702b32b0-497f-4a4d-91ab-124d6c628682",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e98596c445957eed5b1ee919c821dc48",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 5 minutes",
        "value" : 5,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6e71b7447ea84a7f80179dc6126a2229",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1904f8a2-15bb-4e37-8ea0-d2bd1148e187",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c1d24972ea96cd1d050e5801c71737bd",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 1 hour",
        "value" : 1,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_47b3e4787fdd4e88b0ab9aa346aa4bf5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7c382036-03c7-44ec-96db-3e2493c21566",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_742bf2807e9c8fb80a7e7ff091fa3197",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_67c78dc2e4f342659d8032f6b4b2d92c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_67c78dc2e4f342659d8032f6b4b2d92c",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:53.089377Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d039bcf7e9aea8d859b5b60be6af3278",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a9a8b4037e55497a83d1b6915e3809a5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a9a8b4037e55497a83d1b6915e3809a5",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:49.043242Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ccbb891c1eeedffa7c7838e0f4594eb8",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_35acef2ed6614d8d845a5ba7fa970897",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_35acef2ed6614d8d845a5ba7fa970897",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:42.367979Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1216a278f127e3c1c156e88dd0e62078",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_96393d3895924cc0b3bc722b503b1602",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_96393d3895924cc0b3bc722b503b1602",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:05.121157Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8b97af4c05da5e345edceb0c4de6a13f",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f75508f351ec4a73b6d28fcd6ad37a68",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f75508f351ec4a73b6d28fcd6ad37a68",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:06.901197Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_832bb36dd3a43c30d228e609476be022",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_84f5c22b440248fa890bc1237a0dad3a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_84f5c22b440248fa890bc1237a0dad3a",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:02.576902Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a6c5a6a42f0c3dd4a93a4977a7ab3097",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2dd4d6d5842a4eec99a2693dc82392e4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:33Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2dd4d6d5842a4eec99a2693dc82392e4",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:39:53.893872Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100005': {
  "appId" : "APM100005",
  "name" : "prime-harbor-103",
  "version" : 2,
  "updatedAt" : "2025-09-04T20:37:28.995742Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "0",
    "fields" : [ {
      "profileFieldId" : "pf_7e713dbe7cf6f066dbcfb4a94972f294",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Encrypted geo-redundant + tested restores",
        "value" : "encrypted_geo_redundant+tested_restores",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9e45a39df195486f989682ee268b770f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_09317e02-603f-4041-bcbd-498d3e22203c",
        "title" : "Auto-created risk for backup_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9e42c4be0ba9479a5e197b643221c0bb",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0ec2b62114d24527bba1b53b999b2058",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0da0b28b-4f2f-472e-a98e-59351eef1398",
        "title" : "Auto-created risk for chaos_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_afd0c5ed76a49e1a69932868d8c6f998",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Semi-annual live",
        "value" : "semi_annual_live",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_8900360ff0664e05bab9113954d39453",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ab46b8e9-4974-453a-a314-73c8f7085474",
        "title" : "Auto-created risk for dr_test_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_40ca940063cadb9e2b6b1d7868f80ac2",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Automatic",
        "value" : "automatic",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_21427cef19a440bbaada5ea1f1dc6cfe",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_96d0d5c6-92f2-41cc-a92e-8c42b44edecf",
        "title" : "Auto-created risk for failover_automation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6f57b944702a2b415acfbba2ebc9700e",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual live",
        "value" : "annual_live",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7702458ac5e1417eaa5cad309119df3e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5b8105de-64e0-42f6-ada9-fb73e6581a88",
        "title" : "Auto-created risk for ir_exercise field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_b7285e2925302a8654be7365b2390365",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Tested quarterly",
        "value" : "tested_quarterly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0953e9d149b04ffc842eb6679419a77e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a36dfeec-79b4-464b-b875-992da56a28af",
        "title" : "Auto-created risk for ir_plan field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8e5448b3bf120142b9caa406fdd76c80",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Certified",
        "value" : "certified",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4143a8cfc8fc4c5fa341c04e13dc71c0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9658a630-b815-4bd1-9dcb-cfb39e65f2db",
        "title" : "Auto-created risk for runbook_maturity field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_259da95586717df58b95cc757c96b77d",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_89dbc23963aa4b2abb3c19bbb33cad3b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d52608f7-378c-40f6-b4c3-06431c793315",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_89dbc23963aa4b2abb3c19bbb33cad3b",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:41.397567Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_287d27bf56f3dda4cc82fb351229eaf2",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_68f1887b4c42497fba73cec74935b039",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_501ce6ab-7a57-4aea-b794-92f8e3cf6f95",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_68f1887b4c42497fba73cec74935b039",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:48.42208Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2ba8ec09a0850c1be14c14b467534630",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8536b5733f7f4ebabdbf361c0b918c2c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_57af6230-080b-4fda-9602-5acde562b52f",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_8536b5733f7f4ebabdbf361c0b918c2c",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:28.438558Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_91770e0d8ce957676e30fc560629a58d",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e3c4b35ceff54fa7a97dc302d23fe6a6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c31ec0f5-73ca-4a5d-9a44-4e28381a5516",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_e3c4b35ceff54fa7a97dc302d23fe6a6",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:37.406971Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c3f4448df2ab42d933705327a3f7b4c3",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_00c5193175b94019a64a132bd282b65b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_13dacf6c-54c1-42a3-8c9a-9b69ec88b4c1",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_00c5193175b94019a64a132bd282b65b",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:31.723133Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b44e6e25ebf30aac585e53f360321aaa",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7b7fc69d63b04513baa8966dee685ed6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f46d547a-51d2-4ec7-9f15-59723fcd02df",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_7b7fc69d63b04513baa8966dee685ed6",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:53.595895Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_84fcc722011c58ae7d9e11347769d29c",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5c78d957138e48e095bacefb87b9eba2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5175c6a8-e12c-4ddc-8fd4-56c0b23701b0",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_5c78d957138e48e095bacefb87b9eba2",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:36.572525Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8b79aed4fc09142a1f134c822effae18",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d60f6594d6b644499a054c26e43c5f01",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8c7c4f24-f205-45ea-836c-58543ca79ca8",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_d60f6594d6b644499a054c26e43c5f01",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:34.23055Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0f8cb0ce22bb704557c78bbc438cbd79",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bac8a194a916494493372eaebf02277c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fd8a796c-28e6-4b7c-a14e-d0467f7321f8",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_bac8a194a916494493372eaebf02277c",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:20.281878Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3c3f4de62de7a784591994e31e9534b5",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_438ff6c3e07a48fe811f61fb31a0e480",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fa684744-4c77-48d5-9e9b-2a08abd3aaf3",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_438ff6c3e07a48fe811f61fb31a0e480",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:49.328561Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4bbc699e10d803c6887f01e11c4bad46",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f32fc9144aed46d58f89283763699715",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_78c6c88a-b7cd-4067-9c62-7cc5645b2b18",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_f32fc9144aed46d58f89283763699715",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:35.825128Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4492bc3515d7ab6af10bab416be17c1f",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8a2be644a7234121919cf3c05d5c5c88",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8df0e4d9-f954-4bf8-a27e-c718515ace99",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_8a2be644a7234121919cf3c05d5c5c88",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:43.055595Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_1e5e40b5c8f868ae4fd2c81caecde70d",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1194185e4cef42ffba206347522394d9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7c91c6dc-c484-47b5-ab4e-1f2948d75af4",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_1194185e4cef42ffba206347522394d9",
        "documentTitle" : "architecture_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:51.121723Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_624e6cda90cc652184370b2cf7db1574",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c558167fe877416186b399c1b5461e33",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e3c8ab01-d636-4315-80e6-50afaeb71944",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_c558167fe877416186b399c1b5461e33",
        "documentTitle" : "product_roadmap Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:45.763415Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_446ef940da327e59a433e1684f329bfa",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8b1b6e490a0442cf8422ce6fb6cb4560",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c70b08b0-074f-4cce-88a8-32f7414152e0",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_8b1b6e490a0442cf8422ce6fb6cb4560",
        "documentTitle" : "product_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:17.476231Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2787e4ae4f97b2d2d3240142fb525e3b",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a81123b895b0425298ee96f5279c7df3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_93e4151e-7687-4a18-8f3c-93fe3f4e8030",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_a81123b895b0425298ee96f5279c7df3",
        "documentTitle" : "security_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:42.224418Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fd40a66bbcc8a8ea22f4a7713c08f80e",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fad8521aa2864ceaba0f83d34cf21385",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7050275f-60a9-4be6-927d-30c5cda74b60",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_fad8521aa2864ceaba0f83d34cf21385",
        "documentTitle" : "service_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:54.414428Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_088fde093a005e556819c175f18ba72a",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a49ff95b076344d4be5447f0b5a9c863",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6f0c3122-ddb6-4301-932b-0327d42acc54",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_a49ff95b076344d4be5447f0b5a9c863",
        "documentTitle" : "test_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:40.622833Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_7a51bf3b83889c370f4db14db7eb66f3",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + daily review",
        "value" : "full_with_daily_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4e7796bbae5241cd85d73ca851155a15",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_851859aa-5146-4ca8-95d1-e92dc06ebcd6",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_891e8cab98c5f4bd2a521023b616fcd4",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Independent review + regression suite",
        "value" : "independent_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_8502038444614a2b9d5885eb8598d6d6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6dc6a0b6-a74a-486f-9546-6345ebfee19e",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_752a11718e69584b66c63c9e4f8b1c9d",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Dual control",
        "value" : "dual_control",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c305276c924d436e9cb7cfb9a178be52",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_04f29ad8-f53b-4d24-9290-a7bd11ec67a1",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d1e64f91deebcbb42877da68c1a7c985",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_905de4a47eb942e99af94a3423d33ee2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c149c783-931c-43d9-9eb1-6d32428110b2",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_caf056c401fd537a916b7c2a2c7bfc21",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 1 year",
        "value" : ">=1y",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9509c9d5a88c465e9e3d949a4af61d42",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2372d7a2-9ab0-41af-8f6b-894f537773ce",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_7bfff1e098ac07c35c60718f283a5ee3",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Daily",
        "value" : "daily",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_39a2152b6ed34d549174c3cb3e38a6a1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_46a9c740-bb22-4a72-984c-8c6f9f329481",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_0f153ea1cea6c728f54d0977193bd6eb",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2ad5e25d80aa4124baab5f70e8109a03",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_87989b43-175f-42cf-aaf1-d15edd13e5a8",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_2ad5e25d80aa4124baab5f70e8109a03",
        "documentTitle" : "ha_topology Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:34.984353Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_080f933218a97166b9dcd2ff53c4fe05",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6fe30c93ef8e42a7967096811db12f94",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5e174540-f7c6-4ca0-856f-c5a6650783c2",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_6fe30c93ef8e42a7967096811db12f94",
        "documentTitle" : "monitoring_slos Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:55.334723Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fdea5a4a787efd24cfa9c7d8e3d8f8cc",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4cb7a9a04d114e91a9ca7b70dc2bccc8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_996d6c2e-82c7-41a2-8ddd-22d31cdd1abb",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_4cb7a9a04d114e91a9ca7b70dc2bccc8",
        "documentTitle" : "oncall_coverage Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:38.1855Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_37480dca1a518bc5528eb3c9a2e8a88b",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d96f7210516c46158da67a4189666065",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_adb02656-f0dd-40be-8f38-ee2b7d9dbeab",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_d96f7210516c46158da67a4189666065",
        "documentTitle" : "rpo_minutes Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:51.883457Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_df04e68ec9c7e4c6405b621c6b98fb08",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_189384825116430eb0c528dd7f6009dd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ee11866e-cb8e-44e9-a3a0-4fcf3e2e5a1c",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_189384825116430eb0c528dd7f6009dd",
        "documentTitle" : "rto_hours Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:27.606304Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_9ba774b17dc8e5d6afc163d0311230d3",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0f28f1459aac4e27a5aecbb70d135548",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c4d7b47f-cda5-4da5-991f-6908f67e87c2",
        "title" : "Auto-created risk for access_review field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_0f28f1459aac4e27a5aecbb70d135548",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:44.832486Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_88f99c86a11b31b3aaf071ea87ebc145",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Public",
        "value" : "public",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f233c9b681504e6fbbe09af49d46f3dd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_194f8efc-8eb9-4b86-af44-b79ffe250456",
        "title" : "Auto-created risk for confidentiality_level field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_f233c9b681504e6fbbe09af49d46f3dd",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:33.434592Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_95b01650c46351a29a0b7fce24aee8d1",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_32bd1711ac9d4c5e8ab2d11c45a01eeb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ea1c2c72-c626-4a6c-898b-1e2905a9bad4",
        "title" : "Auto-created risk for data_deletion_evidence field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_32bd1711ac9d4c5e8ab2d11c45a01eeb",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:30.014671Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c71471ffaf8739cd8152a0fc77678d59",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Unrestricted",
        "value" : "unrestricted",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bc0b50db7d804ccf8e9b905d1f011d35",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_42185ff3-67df-4c27-bd90-b844bdcab34b",
        "title" : "Auto-created risk for data_residency_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_bc0b50db7d804ccf8e9b905d1f011d35",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:38.958175Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4f32dbfc54fc80843a65e5dced1fd4a6",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_99d45c7b76294f85bbd22a84998938c6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a6594823-05dc-4ce6-9a18-09a53314488f",
        "title" : "Auto-created risk for data_retention_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_99d45c7b76294f85bbd22a84998938c6",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:43.930862Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d79b14f673f52a65ba8b6544369a6ed3",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_783d5408816247b898ebc5e00ec4c5de",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7f236614-1af8-4697-9340-72bb1bf0adac",
        "title" : "Auto-created risk for de_identification field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_783d5408816247b898ebc5e00ec4c5de",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:46.606698Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_86daabc78a56c8a53740198f339e1747",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7556aa569a0a44df8adfe3a9f9ccf865",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:34Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b9fb09f2-532d-4ef0-926e-9d1d8b89de47",
        "title" : "Auto-created risk for tpsp_attestation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ {
        "evidenceId" : "ev_7556aa569a0a44df8adfe3a9f9ccf865",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:52.782244Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100006': {
  "appId" : "APM100006",
  "name" : "rapid-circuit-378",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.099076Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "2",
    "fields" : [ {
      "profileFieldId" : "pf_eb004d005a92d5708ea25c2d6b0fb208",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard + periodic restore test",
        "value" : "standard_backups+periodic_restore_test",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3373a54121ac45f8b40e524305ecea4e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3373a54121ac45f8b40e524305ecea4e",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:11.802858Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2b8fe98a1c4bd359913eb4dbb5ad943a",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_193d246a4a7549ebb7f62d2bf327096d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_193d246a4a7549ebb7f62d2bf327096d",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:28.780009Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e2be5b37603ebc6c03a68ee2377dd184",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Annual tabletop",
        "value" : "annual_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2a6bfa5fbae44167a024eb589ce09aa3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2a6bfa5fbae44167a024eb589ce09aa3",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:13.415715Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b5bd43d7abeaf9c4f391bd039828a43b",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9a00f1c70bbb4c279ffe644a2241b8cd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9a00f1c70bbb4c279ffe644a2241b8cd",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:23.621501Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6db75c89ac820ca5652993f6468cb150",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a8a16337845a467a9f8833baed10ef3e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a8a16337845a467a9f8833baed10ef3e",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:05.905892Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_92650fca4da1bd3ff318b394a27a7a07",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Documented",
        "value" : "documented",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_635ab729e8b5488b97faab575bf2036c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_635ab729e8b5488b97faab575bf2036c",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:27.10853Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4ef34228851082830d65ad57f05f0e1e",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0c18a435501a49ba84baaaa5f5c9d190",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0c18a435501a49ba84baaaa5f5c9d190",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:17.622911Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_dcd5c77b87ca36944ec9562c7c01b7de",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_317ee7afa0af425db88eb4858ea8a219",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_317ee7afa0af425db88eb4858ea8a219",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:01.29084Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c029fb9b1651948f5c76f2c0fcc27082",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_eaa8bd4f44524397a8972d219090134b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_eaa8bd4f44524397a8972d219090134b",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:24.4416Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9c4f2f479d751b53299997258268c47f",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0502bf44de8d49269a8fb8c6b361ece7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0502bf44de8d49269a8fb8c6b361ece7",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:16.728142Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_7353fbab3ea3a4c320b8f2a1849583f8",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5a66b63228344f68b14676cba1b0bccb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5a66b63228344f68b14676cba1b0bccb",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:26.189439Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5ae9dad05890ae20a53353ef528abd2f",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5bca5b92b7a84b4fb6380e6738881e9d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5bca5b92b7a84b4fb6380e6738881e9d",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:21.015359Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_094f7e73ad7b407172d01f3e9b7023aa",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_58e60e453eb947ebb11d927e33b1c02f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_58e60e453eb947ebb11d927e33b1c02f",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:03.230113Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_97965b072e936d47c1a4d00492b19880",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_607189535db84f98a1b508fe4665ca67",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_607189535db84f98a1b508fe4665ca67",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:57.040581Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d3f5a7442ba7a0d1f524e32823e803a5",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_49f81ae738244a04bd411cfb3836000c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_49f81ae738244a04bd411cfb3836000c",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:15.879807Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a204b99a8e23360dbcc6084029245036",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4283972c383e4646b4964eaa9e2b643f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4283972c383e4646b4964eaa9e2b643f",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:10.213097Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d7c0c3945e0931e4ab8feba1d1666936",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4dee0be4cf394301befbacb0760955a0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4dee0be4cf394301befbacb0760955a0",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:12.621942Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9d71006bc0d62f6cf5fd547ab1572d4c",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5d54bfd0db7f4a68b8b825f3b02fa198",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5d54bfd0db7f4a68b8b825f3b02fa198",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:27.900205Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5aab2d2ba2cb376efa9f0109659b3cc4",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b4c1fb1a2d6f4d6486007cf8b4afe1d4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b4c1fb1a2d6f4d6486007cf8b4afe1d4",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:18.417078Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_1c627ef0936fde4af3bfbe8d0cbf8d2e",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_413d76ca1786413ea04f3654a8a73bc0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b7468aa1-5c96-46d2-8b2f-ddbc88ed85e3",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d0663a4fabb75088829862a6e9df78e0",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_5dc0695cb2fe4dd787b791b2ca29a006",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_baa9158f-6d2e-4f64-a80b-782ae409531b",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6607975d8141c682a6a58fef3d5a7f25",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_df8c9be14c3d43bf9517f6437ad39603",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5213c00e-d854-4be5-a878-3ae01c5841d7",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_01aa0800788939360eef06fde4fa7e26",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_bd186067e7234d7293841a20d401563c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4d8f9247-0fe6-4b92-8257-255cdd4b4382",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_7277ad4d0369500e303412e3c4a05b51",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e337b5e089ab4f8dbdafe4fe63b43590",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7e7d9091-8065-40d7-9adf-a7d68834eac6",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ea57db53812c4afb976f24006edb8ff3",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1b2f5a64d27c4dec9dbe8e41da071488",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1d07f8c1-b48d-47f9-9b1b-bbdf3b2ad444",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_0d2f85c10ee7d2c3b39e0742746d96d1",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + periodic review",
        "value" : "full_with_periodic_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_afc9f2e2ab3b41259de0525957aad159",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_797a747e-1d43-4622-8335-d471dad0b432",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_bbe95922dcaea7b9cb089f91b5587362",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + regression suite",
        "value" : "peer_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9bd8fbb990384bb1a9c57a4d73710c7d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_47b658a9-fd01-497f-9988-a5afeaf27659",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_cda27d8ea59435e7c709bb2b2ab4b3eb",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Strong validation",
        "value" : "strong_validation",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_19bda6ded5134a5c8a4e379539eda562",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_18f0fb59-346c-4686-a980-bad444a559e7",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_40e86fe28205fbed7c522a69b2f76be2",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_944e47b3b2734db0b488b6e2a57ca47b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a1ba22d5-4693-4998-92fb-009cba255ed6",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c05d58cb2b794c4601a02c09a4944efc",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 6 months",
        "value" : ">=6m",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f17848dac7e74f96a1dcd8f85a154988",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b5ca91f6-58bf-48a6-a604-e3e11af1e4f3",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_27ab1649bdb816e3f0464be4991068b3",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Weekly",
        "value" : "weekly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c1f274ef9eed44519e160e41b348ea5e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_52d3ad37-2c91-471a-9501-5d78b34710c0",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_aa5910bb58b92551ce58cbd58ef0557f",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Backup/Restore",
        "value" : "backup_restore",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fbde7579803b4fba83b693c797bf6eca",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_fbde7579803b4fba83b693c797bf6eca",
        "documentTitle" : "ha_topology Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:21.841444Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_11183c23199402c8f637ba6e87ed2a30",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≥99.0%",
        "value" : "99.0",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0337de40fc474449afe0a0de982bf254",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0337de40fc474449afe0a0de982bf254",
        "documentTitle" : "monitoring_slos Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:56.115356Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f3032626ffb8ab6c699998d718a6acb0",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Business hours",
        "value" : "business_hours",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_07bb609f13cc46b987c2a5554b0096e2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_07bb609f13cc46b987c2a5554b0096e2",
        "documentTitle" : "oncall_coverage Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:14.255278Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0b1c8a8166dac035e2008b3ea3ce3933",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≤ 240 minutes",
        "value" : 240,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_67421eb8759f489d8fc81dd0794309f0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_67421eb8759f489d8fc81dd0794309f0",
        "documentTitle" : "rpo_minutes Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:00.419108Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9952ddbc2457bd6a3ccf9f2cf2e66edb",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≤ 24 hours",
        "value" : 24,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_954ff95efb2a41c1adad995e88d3f43f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_954ff95efb2a41c1adad995e88d3f43f",
        "documentTitle" : "rto_hours Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:11.043685Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_b2fa3efca04ba0f40585cc5b90656b87",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_82458e42a07e466bb51536e9911bf99f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_82458e42a07e466bb51536e9911bf99f",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:15.088626Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c15a22f05ec63ee193e0bb16bb05391a",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Public",
        "value" : "public",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_942dafffe3f84042994269933cc0e997",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_942dafffe3f84042994269933cc0e997",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:31.835738Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c9d6124cb3569e4cfaaed6e235423523",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5629dfd14b4b4bfeb699f78ae2ec9122",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5629dfd14b4b4bfeb699f78ae2ec9122",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:20.191712Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8df134dc102550f3dfbc678e2251c57d",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Unrestricted",
        "value" : "unrestricted",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_787bed0fe8ed41aa9250a844d5a65b04",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_787bed0fe8ed41aa9250a844d5a65b04",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:09.390774Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_19f0b8b782961b28f9baa8b85152a776",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3966f2498e984ef693e3fa46459d3a1b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3966f2498e984ef693e3fa46459d3a1b",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:40:59.523096Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_54f2fbb858b8555b1bd97f08b4f5f53b",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c814c67a93244bf2aa6cdbd77cb6b175",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c814c67a93244bf2aa6cdbd77cb6b175",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:32.720207Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a0b5f8d51d3bc6ce3f687c8110d480e0",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9ba16f14938b470dbfa6cc200d173337",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:35Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9ba16f14938b470dbfa6cc200d173337",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:07.649095Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100007': {
  "appId" : "APM100007",
  "name" : "golden-forge-222",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.222415Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "2",
    "fields" : [ {
      "profileFieldId" : "pf_00d61e88ce71384ae74de48efac33c64",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard + periodic restore test",
        "value" : "standard_backups+periodic_restore_test",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0683370783774316bbcd11263c7bf568",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0683370783774316bbcd11263c7bf568",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:55.441074Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b50953b275c7fa3382324a78cdc2661e",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0321b74a5c194bcd90817e764fcb04a2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0321b74a5c194bcd90817e764fcb04a2",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:44.168754Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_27454586c9eaa227d9934b947a50838f",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Annual tabletop",
        "value" : "annual_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_cc34439d9cc74321842de5365a682159",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_cc34439d9cc74321842de5365a682159",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:35.757831Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_42562800445ffd7120cc0546d252f89b",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_97fa6d510f7340b6b9ece4ad8bf1f31a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_97fa6d510f7340b6b9ece4ad8bf1f31a",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:01.562932Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_bbf8235c4d5443c42ba8596a8163eb70",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_21cb1ce4f1404d11ad0886b03e3686de",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_21cb1ce4f1404d11ad0886b03e3686de",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:34.56006Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_db3847126255ffb7f2cbbfe31a2c27eb",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Documented",
        "value" : "documented",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e9e9a58cf21642cb9e7455747fa91c55",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e9e9a58cf21642cb9e7455747fa91c55",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:06.94639Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3fe2405f9eac89ce1426b0595e70f5e1",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b155d095f5ba4e7593acd2ffbb1149da",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b155d095f5ba4e7593acd2ffbb1149da",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:47.69012Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_3fb4ac346d1065114758c56a1ee6b720",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e8f2fe047121475abaca5146b602299e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e8f2fe047121475abaca5146b602299e",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:49.522012Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_960c1fa38804b63c062077325a21689f",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9ba816a4e9014624a266790fc2457d2f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9ba816a4e9014624a266790fc2457d2f",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:33.586219Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3098c1dc1ddf4997efdeaaa5acbfd75c",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_20ded28b1e7e41299518c76d4d323965",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_20ded28b1e7e41299518c76d4d323965",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:14.293672Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c3d31a52d55de7a9eac8ec2a2c5be0bb",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8905f1bff2e24853886a72d9f55c237f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8905f1bff2e24853886a72d9f55c237f",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:51.240704Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_73665066af084de668fea147de193d09",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d9c1b57d84ba4c99923d432ac63edff3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d9c1b57d84ba4c99923d432ac63edff3",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:06.137671Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_24106587b8f326cdf560e489f035ac94",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_359b02a7a9714a2290f051d4410bcc8f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_359b02a7a9714a2290f051d4410bcc8f",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:59.701241Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ad6b2765b93308de6941ddfe555b2715",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_667af08afc614ac180f7db802f9ea01d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_667af08afc614ac180f7db802f9ea01d",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:45.055505Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e9a2a69a262ebe71e6b6db47d9cf3645",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_834186bd09c24cb19444247f21be4ac7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_834186bd09c24cb19444247f21be4ac7",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:00.655335Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_590599fe4f59ce0f4735c779f2bc0ff4",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4e1b185c7d8c4175afe4f5c83314bfcb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4e1b185c7d8c4175afe4f5c83314bfcb",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:04.427248Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a6eac1c872a4cafe3f180b97ca10f077",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_22035b01aaeb4852a55ffb5d443e8db6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_22035b01aaeb4852a55ffb5d443e8db6",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:09.615013Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9d6b114a26748f5d80a72d55b1af35eb",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9c6b644446094be4ac11d3467d13282c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9c6b644446094be4ac11d3467d13282c",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:48.530695Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_96b110b160c94052658c32b2cc0928f7",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bad3c2b8e07e452aa52f681607c2d909",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_bad3c2b8e07e452aa52f681607c2d909",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:58.866992Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_c16746d8abe3ba2f0c0e7196027da0b6",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ef8eb5e3953c4814bec6f0c4933c20bd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d72ec576-02e7-42fc-bd22-60d57229d9de",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_546e422439106116e42e45d136bf4255",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a71a52a3ca144b8484f4d740ce6f900d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_92944bbd-d5b2-4d66-866c-49d8b74d093b",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_452d4c65e37429d49aeac6d9ee8907a9",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2e8cc7fd90fa4ef28c4582e7f5bd6e5d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e198f4d3-105d-4336-93ab-1cfd5dcaf4b4",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8b6dd42bb05813627d2bf49d87e96d96",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d859ff618b1f47498af190d095a30b12",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8d04d460-90bf-417f-9009-7d93cf4e2b7d",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c372963d62bcc0f24e21f277c11ce6fe",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_39b50fe723044c29bf97063db167f88f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c03f7588-ddb8-4144-a2b4-f7874cf4b19d",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ccca14dcf1c0569b5aadb39e1021ee69",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1f20c7aa20ee46afbd6220cc3c9014b3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ab5f1975-7ce9-49c2-b9e7-6dd5b1c147e5",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_0a95a8fa5a4646f37f84824d7e6e86fa",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + daily review",
        "value" : "full_with_daily_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c824beda74ae4267b55e34e55c60d4d7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9bc08e59-9d37-45eb-8444-1edc38eab44e",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a44f5c4ea5a560b13739e0784cacfca7",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Independent review + regression suite",
        "value" : "independent_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0305839315c348b0a1f41cf1a72e0931",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_98318366-9556-4532-a19a-f19d3390cf7a",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9e8073394db3b8e7512c1cf24f5759e4",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Dual control",
        "value" : "dual_control",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ffc19546676b447684e5435ba7d73cda",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fc83b1fc-f174-4f75-9f82-3ad78523ddd7",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6693acd443c8fbeb01a4113dd2a2f24e",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ed6ded2f48034ba18aa0d15d888f1cca",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8b466268-e179-4424-ab07-16f3aa5a242d",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_44a78a39b61f00c3409cfb3211573beb",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 1 year",
        "value" : ">=1y",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1fded733ec004b689f9ffffd593431f0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_35301b4b-d24f-4403-b406-0977aa9ca98d",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8b750260d0ad5ab85179b16f9637bee7",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Daily",
        "value" : "daily",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_36f4698bff1848d7aaa4f8b0c254b440",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c6a77098-80c1-4ce9-ae9a-c30306e560ce",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_987c3c6d3e67790e4d7310c3da4aa865",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Backup/Restore",
        "value" : "backup_restore",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e1a8418fa6994f11a858aece9dec6ab7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e1a8418fa6994f11a858aece9dec6ab7",
        "documentTitle" : "ha_topology Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:13.144181Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ce47ef1d9da706cc74d62da9fcd27ac1",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≥99.0%",
        "value" : "99.0",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2403892575bf47298470144b38cae402",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2403892575bf47298470144b38cae402",
        "documentTitle" : "monitoring_slos Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:52.012512Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_65212cea987f9d260736563e4fc21b04",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Business hours",
        "value" : "business_hours",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_26f0401eef554e2a88514c2dc4944465",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_26f0401eef554e2a88514c2dc4944465",
        "documentTitle" : "oncall_coverage Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:43.320891Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a05af013e773aed0391768a487971e1a",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≤ 240 minutes",
        "value" : 240,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9aa63be3da5148ad90b5b771ed6b2e66",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9aa63be3da5148ad90b5b771ed6b2e66",
        "documentTitle" : "rpo_minutes Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:53.788484Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_532a59980e8508c3057024c49e2f1ab0",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≤ 24 hours",
        "value" : 24,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0763d8f3ada5474c9e3be50f5c0d6b83",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0763d8f3ada5474c9e3be50f5c0d6b83",
        "documentTitle" : "rto_hours Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:50.450022Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_6dd5f7dcd76f54c648ab5e5c50511b4e",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_50fd7f735e5445baa5a6a950bfc95c87",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_50fd7f735e5445baa5a6a950bfc95c87",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:52.938878Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c93150623e4d9eea095b4f205cdf2af2",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Public",
        "value" : "public",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7a529a68d1cd4193a5b16b971b93449c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7a529a68d1cd4193a5b16b971b93449c",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:57.047038Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_473843d5b62214641f6538d57360ffc9",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f664cf2b9f3c43ff94ff45e9d451a917",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f664cf2b9f3c43ff94ff45e9d451a917",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:08.735912Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_09fe8c8cbce667c5eeada5acbd522501",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Unrestricted",
        "value" : "unrestricted",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c027916f1dc149efaa4feac851aabddd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c027916f1dc149efaa4feac851aabddd",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:46.787824Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0fd74af32526d5c3b32c3d65d881c623",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4edd4f99327b47f881faf32c9a4ea7fb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4edd4f99327b47f881faf32c9a4ea7fb",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:54.606301Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_27a1f888002405dad49fbde1eb053a33",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9d830b36e9c94c758851a0a33d5a79a0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9d830b36e9c94c758851a0a33d5a79a0",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:41:56.286577Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cc5bdab95a55dbe5bb75053f2ba33a30",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3cd107f582904f83a4c4dcc234ab68b5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3cd107f582904f83a4c4dcc234ab68b5",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:03.509988Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100008': {
  "appId" : "APM100008",
  "name" : "golden-harbor-941",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.35396Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "3",
    "fields" : [ {
      "profileFieldId" : "pf_3aed4a175a6380449c368066e898e4a3",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Standard backups",
        "value" : "standard_backups",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_387e8453de8041c696ee3cdea5c53ebf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_387e8453de8041c696ee3cdea5c53ebf",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:28.237846Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_aa45de8055b4c014bd8ce5947ff25e3b",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_69c7627d27594df689e325f4d6583c07",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_69c7627d27594df689e325f4d6583c07",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:48.517363Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1b582e70fd024063a8f2338d85bc3d96",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Ad-hoc tabletop",
        "value" : "ad_hoc_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_14f5c8fd9f5b4361a8aa996a9709feea",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_14f5c8fd9f5b4361a8aa996a9709feea",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:29.141635Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_21c5b7b8a1aa293449e13607dc6ad187",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d44afe6995b140148b8a55012950bf4f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d44afe6995b140148b8a55012950bf4f",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:32.71416Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a79a93aa4d7338f7bee9301315003412",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e584e53907d344c7a44ca0aa9f98447d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e584e53907d344c7a44ca0aa9f98447d",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:22.048133Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0b4127dfb8a50f66e935b24aaab5af51",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ee46abf67c8a450f8ec6f7174f14e93c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ee46abf67c8a450f8ec6f7174f14e93c",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:33.562238Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_22245eeed7976d642cfdcf56f10addc4",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_47d2234a30ee47cba73bc2558db0b475",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:36Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_47d2234a30ee47cba73bc2558db0b475",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:41.48322Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_87b39062a39f12daff32d74d768cde91",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "SBOM recommended",
        "value" : "sbom_recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b0c434364457476e8b117241e0462452",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ef8331e2-56b1-4df1-821b-90b8d4e64b14",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_660389b067badef8e1b4709e27f7fc91",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d7c9c44ca9ee400e80940fd179bd8745",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_bb55924c-51fc-4a87-9e4e-7c86d282b898",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_39df12e0f5f99a62fcb55b7f6854413c",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_48bdd3e9f9c8453a99b4cbc64e3e07a9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_90781751-d1dd-416e-9faa-b9383afc3a1f",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6d5e323fae6d5773e883b4307311db74",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_06cb2a7d079e408ba30e8736d5ec0241",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_bdf7835e-01aa-44dc-9e83-c45fb1b8aead",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_f83ce748d45908628c06cc4121945d00",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a48ca84ba1ba4423bc62a747a41a5d52",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4246be64-caed-487f-bf78-88f9e1f70794",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d2032e82858dd024e383a7bf4f07a3c2",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Segmentation required",
        "value" : "segmentation_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ca8fb82f97e848938bf1ff0c0f1c3de4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fe036f37-0fd9-4bd1-9bfc-4bfb96b86f44",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_be80112d123bbc25d840ea3012d57116",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Critical ≤60 days",
        "value" : "critical_60d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_cdbe9c36f8ba4a029db10671eeb134a1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_18af02f2-edd1-4de6-81fd-7f144f6a1f42",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_b4244e053ddd973d7c529c0092b7617c",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_686e7b3d96fb423e844692cfd5b9f72b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6e0886a5-5fed-410e-94f0-275cc0a6e6c7",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_badc8c08ba230dea4484a28305c5006c",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4cbaa82be1754e80ba1638c90fdb3dcd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6458601e-27dc-40d2-aff7-5a922e981d0e",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_41e09eec8453f7cd19d6abef156b2270",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "SAST + quarterly DAST",
        "value" : "sast+dast_quarterly_scan",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_33bda5cde39a4965a2ea084ec452f2a5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c7ea5bd9-545c-4620-a11f-6680bd5550f4",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_fb1c310fd42d0870f54ab69a7f736962",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7d2d036254ec44da9d3f11e88b0a8369",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_94b44c4b-faaa-4917-ae20-77eb1e8644b7",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ff86f6e69585fabcf67ddd18df85f1b3",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d1889c01f44f4c8192d94388af1b7219",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_df81d01f-92a9-4ced-9309-e18cddb15604",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_ea2c58c51aec6f2ca091fd0c9f04c968",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_10d853f9224b4ce6a8852e1359c44807",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_10d853f9224b4ce6a8852e1359c44807",
        "documentTitle" : "architecture_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:37.027646Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9fdb094d3b9b71fe19ea5e0d2a262c9e",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_db2ca2600ab84119ba36bcbd6a1c8935",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_db2ca2600ab84119ba36bcbd6a1c8935",
        "documentTitle" : "product_roadmap Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:18.57425Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0cb5dbdbedb25803a6c284e661546a45",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8eb9d6c153e44b6090aba4d8f9375d9a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8eb9d6c153e44b6090aba4d8f9375d9a",
        "documentTitle" : "product_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:31.83845Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d823da62b0d0016c7c2e09880c12b41a",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f8a90aaeab034b73837cd177eb7cc14c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f8a90aaeab034b73837cd177eb7cc14c",
        "documentTitle" : "security_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:15.069705Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_dd47a92b7201780d19a89e7aed56eae4",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_38d70b8431624e0eba6b87ca0c04f35f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_38d70b8431624e0eba6b87ca0c04f35f",
        "documentTitle" : "service_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:34.438685Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_00459969b46cf183f8b6bf1ff14a03ad",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a0059e131d944d04b812b2d30c152e64",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a0059e131d944d04b812b2d30c152e64",
        "documentTitle" : "test_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:21.218816Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_f1f674f16b875056372b5975991bb947",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + periodic review",
        "value" : "full_with_periodic_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fd0feb336a6b4fb8a26a3651d0191be6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_66b3ad73-347b-4b1a-ba3e-03a4c70c302a",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_0e3d83dc26d7e2dd231ce21b286b1ea4",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + regression suite",
        "value" : "peer_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_19883dd025134721b407e3f9a4991fc2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6099dd3f-63f3-4b28-b083-2370aa2c6623",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5842c69c94637ba00a1cc196e33caffa",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Strong validation",
        "value" : "strong_validation",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6f03b7f443b84901b1589abe511f2285",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f41e1209-c764-4b53-b427-e34684903a68",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_769a4d54d619cfafbbf95b677f9348e1",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ee76b0e6957f4e19a123f539762c7ea6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_af44666c-3899-4f8f-af10-83fb0ff20734",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_7f8b2d242eb540785e3161aab57d401c",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 6 months",
        "value" : ">=6m",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0f5cca2d574d4d7c82229419d0b60e09",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_96f13624-2712-44a4-a98c-c981fb85f678",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_573cbb799a7cac93a05ee7017de991ec",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Weekly",
        "value" : "weekly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_51749440e8e34e319683f3981a36ea2c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ab923f39-01a0-4717-9cdc-e3715a65a03f",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_1463be7baa069670b5da2c6006062031",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Active",
        "value" : "active_active",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_81aaa730139e43aab6ec7300650fbdbc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_76f5b886-e613-4110-bd63-574923d7f36e",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ab3ac15677842227e5397ea8779fa9b9",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.9% with alerting",
        "value" : "99.9+_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7431ce6a55204c05bf36c261edbc904f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0ad27e1a-0f0d-443b-acd3-7888f5e89a91",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_08a3f933804997832ceb5b599f653da8",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "24×7",
        "value" : "24x7",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_db24729762534aebb882c68b432467de",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_718bee3c-4729-4b60-a61d-7d739e9d1fe6",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_763f7b96ca560688eea019b17f199ceb",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 5 minutes",
        "value" : 5,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_009da1ef80ff42d18596b602ba9391e8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_aedb002f-8f2b-41f9-b726-2fe5f457b554",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_4508c39a4bb19a7e0a5b6e4d7176bdd1",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 1 hour",
        "value" : 1,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_dd1a4f512024454a9bd1a4230754e8e8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_adb19fc4-c89e-4134-a256-8cc2f57229c3",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_2e64f835ae966578a3c95976f25ff4c4",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Quarterly",
        "value" : "quarterly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f2f34ad81e1b4dd0aea78eabfd8bb2c2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_33f2334e-35f3-411a-918d-34447b70d7bd",
        "title" : "Auto-created risk for access_review field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_7781f351a7673531655db66c508042e4",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Restricted",
        "value" : "restricted",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e0018ddc7f074090956d056d966dd11e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c5705176-ee4e-440d-92fd-12e11b216ec6",
        "title" : "Auto-created risk for confidentiality_level field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c7f353c6a9e0be014b11638d3385e7ca",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_15e73f289d8b4a8e8c5d15fc9188f0cf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c97a3677-614c-4d3e-b8fc-9d3d3c9c608c",
        "title" : "Auto-created risk for data_deletion_evidence field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_008dce91ec76b7dd3e295732d3c7122d",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required in-region",
        "value" : "required_in_region",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0a3e47cfe0bc4542b40a6d983d78e444",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c981d220-7c6a-40f8-97ec-60b708bd489f",
        "title" : "Auto-created risk for data_residency_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_cb4410f45baaef14efb4213dec2cf1b0",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Defined & enforced",
        "value" : "defined+enforced",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_50b686bb2ecf44f1acab3f7abb04dba1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1f1aa5a0-2436-4f90-8c02-5e325fed3c32",
        "title" : "Auto-created risk for data_retention_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c2afdfc6eb7ce843a6a4a222020255ac",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory (strong)",
        "value" : "mandatory_strong",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fc4c3e4c01da48e4890a3a502b134803",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8f1092d4-4afe-4048-910c-8c861cd24941",
        "title" : "Auto-created risk for de_identification field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_279e813e05f61deed5cc999b199444af",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e472ff6a0a8f45cbbdace6f9f0dda6a7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_89feec44-c761-4ef0-924b-0ef3ada2a541",
        "title" : "Auto-created risk for tpsp_attestation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  } ]
},
  'APM100009': {
  "appId" : "APM100009",
  "name" : "rapid-atlas-842",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.474973Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "3",
    "fields" : [ {
      "profileFieldId" : "pf_9b2288ee652e23bbb3513c272f462a8d",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Standard backups",
        "value" : "standard_backups",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6dff776813ae4e73bc238d651b5ba5e1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6dff776813ae4e73bc238d651b5ba5e1",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:26.895812Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fb9e997a1c90aea0604758589bbaf076",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_31d0ad22826a414eb3fd65c1a1949930",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_31d0ad22826a414eb3fd65c1a1949930",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:53.032259Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9682a5274672b9b0574a630cdf2d0818",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Ad-hoc tabletop",
        "value" : "ad_hoc_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2a233da0f1204da8aefc73dacf349299",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2a233da0f1204da8aefc73dacf349299",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:57.941511Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8151f55214cb218cbf807cfc11effb64",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_253f90fbc062454dafe9f0fe9acfee11",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_253f90fbc062454dafe9f0fe9acfee11",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:54.668645Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_def2309a3e240dd9e327a88c36f4c378",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a10100c18d7e4719a50af15f11c5237e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a10100c18d7e4719a50af15f11c5237e",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:08.925548Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1529d4eef87d3f0b343be06a2508de1a",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ea1636e6094c4a73b7afe5b709cebaa5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ea1636e6094c4a73b7afe5b709cebaa5",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:01.429672Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fd3d86458f3c538addbe69ec09c4d77f",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bd26f5c3aa694c34866808b905789758",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_bd26f5c3aa694c34866808b905789758",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:02.43474Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_0bcc6385496774ce0bb9bb5a16c161ee",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6b99391e52d24076b0f4e74445b01034",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6b99391e52d24076b0f4e74445b01034",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:20.039972Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6109cbb3074df705d7af3c4afb49965f",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d2aab04b84c243e19bf003cd1001e92c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d2aab04b84c243e19bf003cd1001e92c",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:25.228132Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4f61831a03149bd9ff2857f5ea1a425e",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_cafce6240b92479381199d991e376728",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_cafce6240b92479381199d991e376728",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:59.564976Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_75e83b29ed511dbcffed0313675ac11e",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_030fb653d4114d7492d631907bdd46d2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_030fb653d4114d7492d631907bdd46d2",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:00.542387Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2d99714e9d555a7ab152361d6c23228c",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9e7aea4da718480da9b54ddfa6f1d6f6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9e7aea4da718480da9b54ddfa6f1d6f6",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:20.902225Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3c9a3c68bc03bc41403af9822344c94d",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_06e4776d7229441ba686548d7f1b8b5f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_06e4776d7229441ba686548d7f1b8b5f",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:14.215095Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_86ae7fa845f726ff0167ab78dd8864ec",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c221f5e3e2804f3aad09b48a79b0714e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c221f5e3e2804f3aad09b48a79b0714e",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:18.20142Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_04c0aebe349ae68cbe87f639aa5cbc51",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e6bfb5f4a7b04fc98297b79fa761f5bd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e6bfb5f4a7b04fc98297b79fa761f5bd",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:21.761206Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e4cd1e4f548bd12e842e89b218f59d08",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_37ad192dbe74414aa5820dbcf915858f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_37ad192dbe74414aa5820dbcf915858f",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:10.760559Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d7aaf8f8659bfdafff532b44c176554d",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fe03a38005dd4d848607908fca9fd6ae",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_fe03a38005dd4d848607908fca9fd6ae",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:15.161481Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e0ce798aa15e6ff3335801f9813952d2",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ecf8ac10ecc44e4192e804d2a800acbb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ecf8ac10ecc44e4192e804d2a800acbb",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:58.748484Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_256dc4e9ab6970653ab51d353ca326e9",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_dad7dce31f914f218a7a62b8905f456a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_dad7dce31f914f218a7a62b8905f456a",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:27.771388Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_e90f46f0f0a6ae73551b88f4d8c2003f",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c88fee5f35f54e52935c6430fe92f034",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4df8e0f9-0e1b-4f9a-be4d-cc112c728eca",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a611484f741ebaac290fe4caaadcdc20",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2c0dcfe2ea294cb5986b492d7c6a77e9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_32614a23-e13d-4e1a-98c9-81aa4fe2901d",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_f1f0e9c7017ee72602b52b70c337a66c",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4a00f75b6dc542199c81ea2108b49b4e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_3982c578-056b-469c-83fe-a112976904ed",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ec0b270b1b4f3da6be2ebb16677ca408",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_03119d5c671642139cf55dcdbb4b64f2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_74c02e38-a686-4f63-b5fc-fdf47ce696cd",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_480641ebc3605ee1b209c4f41f47ac2d",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e21279fcf02e43f68734e522285e16a6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_66cba755-1caa-4a60-9fbd-9b780db0a4e2",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a5a076220561d43e1ea7cc810c607b19",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_81aebc85e79a4bf0a83d74f6178208c0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0c4ad7e8-31ea-4c00-8c3a-c9aed507be47",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_5d312b7bcd1b3e9638cdca4305e5205b",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Basic logging",
        "value" : "basic_logging",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_644292d7a7c2490296034771bd367cc3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_644292d7a7c2490296034771bd367cc3",
        "documentTitle" : "audit_logging Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:57.178508Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d76d8aa62b8ea108440e33e7444bda64",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Optional peer review",
        "value" : "optional_peer_review",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b2e9cba4a5c1451d983c564c61bb1d0b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b2e9cba4a5c1451d983c564c61bb1d0b",
        "documentTitle" : "change_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:12.461541Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_079f2f7209611433ed2a9594998530e4",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Minimal validation",
        "value" : "minimal_validation",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1d00ade757204d0cabd644930edaa439",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1d00ade757204d0cabd644930edaa439",
        "documentTitle" : "data_validation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:23.60514Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2a80618e87fd056baac9b2d0a9ece03e",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "No",
        "value" : false,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_73975fb5cbfc41e395d3db35f9453de9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_73975fb5cbfc41e395d3db35f9453de9",
        "documentTitle" : "immutability_required Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:55.529238Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3d8122e107096c381d5deb4e036ca84b",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_339b5ae414114c78958a457c8721159a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:37Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_339b5ae414114c78958a457c8721159a",
        "documentTitle" : "log_retention Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:29.398225Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a8213a1f3bdffaa0cd9c04f1896b4e80",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Ad hoc",
        "value" : "ad_hoc",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7c76a902e95845b58e49c2c45295327b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7c76a902e95845b58e49c2c45295327b",
        "documentTitle" : "reconciliation_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:28.621163Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_d85d92f6e6bf04c2df96a6c47fa0828d",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Backup/Restore",
        "value" : "backup_restore",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8ae7cfd5a9fc49968a9616463eae2942",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8ae7cfd5a9fc49968a9616463eae2942",
        "documentTitle" : "ha_topology Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:19.223784Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_eaa964a90a7c9820a68178a381248d16",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≥99.0%",
        "value" : "99.0",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a4d9e84717ec46738e88e8f614cc3cf1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a4d9e84717ec46738e88e8f614cc3cf1",
        "documentTitle" : "monitoring_slos Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:56.369133Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f74531d6ad9448ac3aee915c1c41e17e",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Business hours",
        "value" : "business_hours",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ecb03ac4cd83482581fc3825d965a252",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ecb03ac4cd83482581fc3825d965a252",
        "documentTitle" : "oncall_coverage Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:08.121464Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c02a77938be574530ba0266c1b5fc422",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≤ 240 minutes",
        "value" : 240,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_313fc9954e6d426cabd5069e571782e5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_313fc9954e6d426cabd5069e571782e5",
        "documentTitle" : "rpo_minutes Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:42:53.84526Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_84e0f2292e4168f26611a7d39234c892",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "≤ 24 hours",
        "value" : 24,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7d2bb67a933441cb932bd5a70edc4df6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7d2bb67a933441cb932bd5a70edc4df6",
        "documentTitle" : "rto_hours Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:13.319827Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_0eb161e8378464c970247ea2c06c35fe",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_81e8914ee6ec45ca80dd94c0442b9fc4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_81e8914ee6ec45ca80dd94c0442b9fc4",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:07.284451Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2430fbe0b8c2881935dd7e1c075d9078",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_201ddf1aa9704600a5bca645aaf96840",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_201ddf1aa9704600a5bca645aaf96840",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:06.486091Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_76e7b26d8af75d031ecca9c81142b346",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ae7d2c40a33c465686853e082da39951",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ae7d2c40a33c465686853e082da39951",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:16.125562Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_271455149801fcbf59e5b5817bc103e2",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_08fb91f537cf48519c6a39f5f307176b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_08fb91f537cf48519c6a39f5f307176b",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:05.500697Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_62e75f348d576e1ba42ded8003d1c029",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_44f84eb8db574f53923106566f0a98a3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_44f84eb8db574f53923106566f0a98a3",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:24.413308Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_79614ebaef48ea222235be342b3b5a2a",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_66f3239eb14f472cba7e4991c16e6af6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_66f3239eb14f472cba7e4991c16e6af6",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:22.671426Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6d2a3f0146e9ae358c79b69c8f17bdd7",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_06e991db69a84de682e6546e85c278f3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_06e991db69a84de682e6546e85c278f3",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:26.003941Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100010': {
  "appId" : "APM100010",
  "name" : "stellar-cascade-598",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.590067Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "1",
    "fields" : [ {
      "profileFieldId" : "pf_ff153167b1a4eaf13a46724fe75dcd27",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Encrypted + tested restores",
        "value" : "encrypted+tested_restores",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9c756d036c0449bd82476e18f11a77c2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ab3ceb16-5ad1-4194-a578-15f055e2ce69",
        "title" : "Auto-created risk for backup_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d1d279d74af6ab354c7bdfdc38d4dbb5",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b1039225a7534e37aadfe986be821efb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_16ecd7ca-1a85-4e5b-99a5-962984e408e3",
        "title" : "Auto-created risk for chaos_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_802538b5a53ce4ef19b18f58113184f2",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual live",
        "value" : "annual_live",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d63399f8d17b4398aa9798b200d04c51",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7fa4d9f8-fc3c-4fc6-a1d7-eef7fb41fd0f",
        "title" : "Auto-created risk for dr_test_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_0752de84f88e8bb0627d4c64b7d7726d",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Semi-automatic",
        "value" : "semi_automatic",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_30d3cf0ec907402a9fcf0fab655d0cbd",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ffe6cd2b-4422-4c5a-abf2-1bdfa995c9aa",
        "title" : "Auto-created risk for failover_automation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9d39a4eeb85c51e8fb64e14e1693aa1f",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tabletop",
        "value" : "tabletop",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4b3d21b9fea04b3cab03c0731d0a1703",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_aa989484-a092-4895-86c2-ac4286451aba",
        "title" : "Auto-created risk for ir_exercise field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_0c16fcbb5f2f2ebde121d5c386c53bed",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tested annually",
        "value" : "tested_annually",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_039acd863b5a42a88a542a945ddf0c94",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d5485cc5-6081-4522-9d68-d81d3247aac7",
        "title" : "Auto-created risk for ir_plan field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_44b916a3cdc66f28dbcda8a617273a39",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Approved",
        "value" : "approved",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fad1f29845484e598c73b4cf9bdee73c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e1178420-9d00-4877-a04a-e5a62fbafd72",
        "title" : "Auto-created risk for runbook_maturity field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "A2",
    "fields" : [ {
      "profileFieldId" : "pf_1b850c0cbb8b21f63aeda59bf205ce0a",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SBOM required",
        "value" : "sbom_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_664ca9767c7045f0892805ab37d75423",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f6c6a4dc-b2ff-4107-964e-79592b4f09d0",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_269836630250b1f3079cecdcff37f960",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_306d351fa9684d9ba61766e1b2e9ec7c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_68f064eb-f246-4962-91ad-903685a6f78e",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_af255a0057f3a2c869af89ed351cc22b",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d8f0936fdaf44de5a6590dc5751e1ef7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e13afbb3-7982-414a-9adc-96f0e6364dbb",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ba5dc5ea794fc0bd38b51a1fa165195d",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Rotate ≤ 180 days",
        "value" : "180d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_84e01d0328b7453f9dfe0390d8bb9dc9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a4afb777-f207-47da-b829-b7fa964a7eaf",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5a3f9a34be708ec8344aa2fc4e54e608",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_13a67333338f49e4bf1e23f3694f0ba1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_58af1230-2ff6-4f7a-8324-7277649a2264",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_02dae8038010c3a84d7bfcea549c7d3a",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Segmentation required",
        "value" : "segmentation_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d0f277cdccd24d4186870d0730d50636",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_355ec8fd-05fa-410b-a849-c6465a16c279",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ba569f47d51b18cb1fbd14996cf73382",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Critical ≤30 days",
        "value" : "critical_30d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7990143bb9f44067a14d948baf731a16",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_11d0df9c-fbe4-454f-8cf2-e7ac53e83ddf",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5160ea5a08d956e2e1c5c70839910b71",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Centralized (required)",
        "value" : "centralized_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1dab203d6cd14ed3b3bc297a42b1b1d7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f79f486e-0a82-4f16-86dc-e4e11f8defcb",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9ede4b38d61662b728bb4b2f92b2e48b",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Centralized (required)",
        "value" : "centralized_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7a86dc52ff5a493eb2271c6b0c598826",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ae3a3196-84be-44f6-9d10-aba0f0a9258f",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a969ac3448f57ea3e41d6d339f2ee18f",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Internal pentest (annual) + continuous scans",
        "value" : "internal_pentest_annual+continuous_scans",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_5c9ca5c7f4934f5380aaa6dbf2698dfc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_87c7876d-6eeb-40a2-b716-467b648e07d5",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_412e623987b7420d1c77b6ea782ff2f7",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d6f4e5ae7b154a5d87d4ba7e7d93e094",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_142eb31c-285f-48a0-9449-b5eceee1b7df",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a3661fc5f32fc4b90819995671d1696c",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7ce224916ef347b6bb865e1b2442346c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_12ad29da-5f56-4280-ac24-ed48168abb38",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_0e4e471c0087d95f3b57041eaa16a5ce",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_232834a6a6e44d429a00ac6e5ca9375a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e8f6bc60-bf72-4aef-91e0-a3b40b36b9d0",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_9896cdb988b5912b991f453a088256b9",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_cd10decb2c6f416c97171efe81d422b4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2b8a1975-d6b6-4e5a-aa66-998acb1d7896",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_04b1180310ed5e9089f2515a5e1652d9",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1cce16b282af4941aec266212b468cac",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c231f0aa-a7db-476c-a948-2ba3b16f5a05",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_b63f4b97d0c804fb050a89d411c6a17d",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_129b82fccd074dde9ced2a5a4b0a1720",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4a4a434e-f406-4b8e-9fbf-2df9f6056a8b",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6002c16b285a0604d8ba8f0b4029c902",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d26997d8052a409cbebc656531617add",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ad0185d1-7286-4bbd-9c1e-b2012db02919",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a9e312c064479e415557d57affdd444d",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0d1f04740546438d96570638e12962e0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e7666bc8-19f2-4699-ad74-336e16d2cbcd",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_a5e6b44851107e7d38a09fa6cb784392",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Logging enabled + sampled review",
        "value" : "logging_enabled+sampled_review",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ca003bf3af7e407d86c539227ec7c8cc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ca003bf3af7e407d86c539227ec7c8cc",
        "documentTitle" : "audit_logging Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:49.672474Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b87a3980b070ebcdeebb3a937161ae1b",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + unit tests",
        "value" : "peer_review+unit_tests",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_09fb356b3bf947c39966d67fcd54badb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_09fb356b3bf947c39966d67fcd54badb",
        "documentTitle" : "change_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:45.156999Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d36dd7fdcba1e2dfbafa98ed516a8fd8",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard validation",
        "value" : "standard_validation",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f948e3b9acc64837afbe18a28c03146e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f948e3b9acc64837afbe18a28c03146e",
        "documentTitle" : "data_validation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:03.614615Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3d03ba4db02c635585118c84fa42517d",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "No",
        "value" : false,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6a39ee82f14c411ab890b5513c8ae791",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6a39ee82f14c411ab890b5513c8ae791",
        "documentTitle" : "immutability_required Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:56.724719Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2ba281127061bf6c1e4e944782287586",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 90 days",
        "value" : ">=90d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1eb90414a19044b19df64daf9e32d4e1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1eb90414a19044b19df64daf9e32d4e1",
        "documentTitle" : "log_retention Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:40.918643Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_7d65b9f39c73c905e668a1e7f728a3de",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Per release",
        "value" : "per_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1b34f25849984df685cd2e9b4934b208",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1b34f25849984df685cd2e9b4934b208",
        "documentTitle" : "reconciliation_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:07.13664Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_740442cdc7b66a82600499313a628ce2",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Passive",
        "value" : "active_passive",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_3d8598bf04d74a9db737a119b466619a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_68827173-336c-4277-ae11-c083d4e41b25",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_f67c74be56a1151cd3207be69b2b910d",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.5% with alerting",
        "value" : "99.5_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_600b47262dc14ee789061bc5083afec3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0cb90023-b285-41c5-a87d-f26b3c926f51",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c90b0ffbb7c333804a3e44990055b957",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "16×5",
        "value" : "16x5",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4b1a3e0b66ed405f9b91a21de175f2b6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_20a5cfb6-0f20-4c03-ac02-51929973d22b",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_58f5f45ad0314b8a8ae05375f32257d4",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 60 minutes",
        "value" : 60,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4165c46f13e9403283a019664c2d8f68",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_175836eb-a438-4176-9f31-00cff247893a",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1981b3c63d3917d0461f141739cb64c4",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 4 hours",
        "value" : 4,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_18b066b381d94837b8552625df5d6c8d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1ff16022-b080-46d2-99d2-3425c8869d83",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_443880eb65f087e2f3de475d96518e1a",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b474c1ab672141fa858ae38c0d21ce7a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b474c1ab672141fa858ae38c0d21ce7a",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:06.338209Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fa717aef8d4969ff5fb6705d3a1902a7",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0feb80ea71854afbbf0ddf546cd71848",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0feb80ea71854afbbf0ddf546cd71848",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:07.939555Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_dfc91c7e7c42e71fc0f393fec1baf57f",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3ab856ba2af544afbcf4969921993a0c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3ab856ba2af544afbcf4969921993a0c",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:57.57651Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6ed522e87c298db50c218c6b5c6407de",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_cd32991d06974c21b524ba60bfa62f66",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_cd32991d06974c21b524ba60bfa62f66",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:43.521114Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c783b583c54e58a30838d47a44a4720b",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7333d35d747b4069b637a25437c068f5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7333d35d747b4069b637a25437c068f5",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:32.275009Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_18445b9e55f1449ce271f82ab8a865a0",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_533c33194ed44d6299c5d827e4cb6d26",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_533c33194ed44d6299c5d827e4cb6d26",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:35.719832Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_502a933f04e6ab1d523688fbf3a29c29",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c0a6476f63a54369a0b3a1960af45d37",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:38Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c0a6476f63a54369a0b3a1960af45d37",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:43:41.75147Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100011': {
  "appId" : "APM100011",
  "name" : "lunar-nova-239",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.705423Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "3",
    "fields" : [ {
      "profileFieldId" : "pf_23e8156be2352f30c81dc7a54dcbaf81",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Standard backups",
        "value" : "standard_backups",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1693cb0c961e49da97337a2d53151f41",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1693cb0c961e49da97337a2d53151f41",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:45.440203Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f1989c5b28427a378ceb06884fd38be9",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_fb1efa41d4844133bcbc9a4affa17042",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_fb1efa41d4844133bcbc9a4affa17042",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:17.587631Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_863bdea127719be88f5d28113def2653",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Ad-hoc tabletop",
        "value" : "ad_hoc_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_979a529d70a948369e6c2f4b4d01db08",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_979a529d70a948369e6c2f4b4d01db08",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:39.342959Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d238e230431de767d162d185fc870261",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6360b4f02f194464b494d604be59667b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6360b4f02f194464b494d604be59667b",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:44.572013Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5947c4db77b2039ab272591bc03f986f",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8d199b951222402c8dd89b217007dd2d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8d199b951222402c8dd89b217007dd2d",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:32.502334Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_062e7c5cde01e062be6885dd16507ead",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_28687836d0214a95b69efbf712c8042f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_28687836d0214a95b69efbf712c8042f",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:12.282491Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_70b8a9d8f202962962a34c042ded26ee",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0a9c994667f94a0b91065d41bb80b186",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0a9c994667f94a0b91065d41bb80b186",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:14.861586Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_f0e3323da6e08813547bafb7506895de",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "SBOM recommended",
        "value" : "sbom_recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_640a27d922e24b57aa4b805371c2da14",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_61e83007-7041-4221-a939-25f3a213c379",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_fd69ecbadd2a97ad107c24ef7c31d8e5",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ee4298659b654107b362dfa57f65fae0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1c1b99ef-712b-4bea-8ed5-b107e8fd871e",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e892a1204c759a9f22bbca1d63809aec",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_151feb41b6ca4cb1ab04d2325293fc0e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_945393d7-40ed-4d8e-aaba-1ea991161586",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2481cfc9d7a7dc76884323d9acf9c15a",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f3b549e0f22240db875d7ce0aae6aa41",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_527e4e0c-ca43-42ce-b8f6-75dbb188f4ed",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c72805a874e303a92f366a17c3cf3901",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_685415d6f6fe4af48d1f9fee6325d558",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_89ae36c4-e6d0-4fde-bc50-b2b90c03e515",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_19b0e5ff743add0c733fca12f913edb2",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Segmentation required",
        "value" : "segmentation_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_455c71a75a61411a913a4622a1b61ff0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c69efbd2-0663-4106-86af-1da3556db10a",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ec5431bec74508e6f572ced0b6fa0079",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Critical ≤60 days",
        "value" : "critical_60d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_693782eb3a3843d2a620b9e0865f6ef9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_77640afd-38fd-429f-95c4-64046a0563e3",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ff4e81bd7888b216f98b79e679045c94",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a40cdf9ad5184402a65bcf26f402f205",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_78851ae4-735b-4e5a-8cc7-e6de98773886",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e5779c8c42289757b3068277e39d015d",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_061650d5f3c34f68bc7a7b8d0c2c01bb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2c461642-7118-4a8b-84d7-bda3fad9b1e5",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_be3894bc1d797032bd30f6c5fb626e71",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "SAST + quarterly DAST",
        "value" : "sast+dast_quarterly_scan",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b3bb2a1a19754e768dd18bf8c279cfac",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8dfa4e35-7662-48d3-8d76-fff6a3bb48e2",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c3a198d9ca0ea4f4bf177c519de4b982",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b4ba82ce51384ed2904414ed7913eb58",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ecbae74d-443f-4671-b0c3-9d8bfae83788",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_737182ab955a936c64ace8e985a2a719",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_34ac8a925f2347308976e66052cc7847",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e8a42927-ee80-4560-a38c-9456d052cf3f",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_e8d8dec3530a1d6a9f1a33be5422d2eb",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e3e96a342ba24f37b0c7bd5dcdeb3578",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e3e96a342ba24f37b0c7bd5dcdeb3578",
        "documentTitle" : "architecture_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:11.423035Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ecb558ffda82fced4baeadb9f8e5dd50",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4f9f6c61fbb9445ab458a80927903e9f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4f9f6c61fbb9445ab458a80927903e9f",
        "documentTitle" : "product_roadmap Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:24.417039Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_510a555b9f9bb92df2fa371be1dc4fa7",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_eb44654699cb43468f844cc0ecf6b54b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_eb44654699cb43468f844cc0ecf6b54b",
        "documentTitle" : "product_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:26.10485Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2c89255241f8237b301b2ec25fde06ce",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6f7238e2717e42e0aa853236f703c55f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6f7238e2717e42e0aa853236f703c55f",
        "documentTitle" : "security_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:25.234525Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_05d56958ee61d82f12edd49a7da63349",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3baa12812bfa4266b186dd2a1666a0c1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3baa12812bfa4266b186dd2a1666a0c1",
        "documentTitle" : "service_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:28.658253Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1ec833f74d556cb171a81eeaa07ab5bf",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_05887ef232d8471987c150b7274e66ea",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_05887ef232d8471987c150b7274e66ea",
        "documentTitle" : "test_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:31.40431Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_f6924605f0f486fe1e120ddbb0cb957f",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Basic logging",
        "value" : "basic_logging",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_65e20a1deecd4a14bf9633f33dab9aac",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_65e20a1deecd4a14bf9633f33dab9aac",
        "documentTitle" : "audit_logging Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:21.923767Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cee5a921b119811fdd9568ade1b17fe0",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Optional peer review",
        "value" : "optional_peer_review",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2bd08ee34a0c44c496ce0456a5347349",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2bd08ee34a0c44c496ce0456a5347349",
        "documentTitle" : "change_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:26.941741Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fa504d60537b562e3efc5973eaea903a",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Minimal validation",
        "value" : "minimal_validation",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7c30f33392a943bab682251dc624a9ae",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7c30f33392a943bab682251dc624a9ae",
        "documentTitle" : "data_validation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:27.813425Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_66a10b0f57e24242d8662f3ea6ce865d",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "No",
        "value" : false,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_65db3f51180d405080f2dad07ba475d3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_65db3f51180d405080f2dad07ba475d3",
        "documentTitle" : "immutability_required Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:38.5694Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_954d97394529c1d1e92f887193e47d5d",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f1122b06c7fa43428fe74808867869e7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f1122b06c7fa43428fe74808867869e7",
        "documentTitle" : "log_retention Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:35.151667Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a32507dcc9c08ebc5caeea3b6844a35d",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Ad hoc",
        "value" : "ad_hoc",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_67ae619a60444caa93c764eacbda0565",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_67ae619a60444caa93c764eacbda0565",
        "documentTitle" : "reconciliation_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:36.03037Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_10eaeeacb19ae5c06d2982ee28890f80",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Passive",
        "value" : "active_passive",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6436dd1476344aecb8303f209ea43af3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_aa7015bf-6101-43fe-9f0a-cc4b3eec1b30",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2e074afba5635e41b1774045067100a2",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.5% with alerting",
        "value" : "99.5_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1703fab0abde441aabfdca06dc7ceba5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_85d90a4b-612d-4d39-8def-bb78de045e36",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6976ad9a84dc7e8a5032e57162f3ff85",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "16×5",
        "value" : "16x5",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_11996035bfcb4e819d9ba9691209ef5a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d4a901e5-30f2-435b-b01a-c1ea29f4271f",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_d54dc83500ec64857047fa7b24ab647d",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 60 minutes",
        "value" : 60,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9f06b0e7e8904d5c937c347bdd138dfa",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_27d5ee7b-008d-4dc4-b2bb-e4dfd9675929",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_704027561a94c2ba298125b1102cc84b",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 4 hours",
        "value" : 4,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b5031840c49f4ae1be3a0019b609552f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2ddb311f-61ed-4566-86f8-9038c5ee2a72",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_480176ac63fe315f5c700bd9f40a506d",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5b4b80ae2c704d86860b3dac8436c3d7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5b4b80ae2c704d86860b3dac8436c3d7",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:08.778977Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_38cc48a0bae5ba6a814d71718747442b",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8e4277b8a759451eb99ee18a3be54c45",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8e4277b8a759451eb99ee18a3be54c45",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:33.38908Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f33e3736805743d2d5491583aa25ba9d",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f658eb8eb3fc4061967e2f41dd8a541f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f658eb8eb3fc4061967e2f41dd8a541f",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:42.889738Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e44fc929f78bb870dd8c3251442ed0af",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9e49f2e2f5c046b393ef687ab82e4d26",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9e49f2e2f5c046b393ef687ab82e4d26",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:13.991556Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_165af2daac5f585339303aae6530433d",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c31b4394092d47cca7707aa7ca65bf33",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c31b4394092d47cca7707aa7ca65bf33",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:23.599453Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f09b42f91bdb996449876ed074357736",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ad9fc3b16e0d47b3b24c9758a86803e1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ad9fc3b16e0d47b3b24c9758a86803e1",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:21.109934Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8ba6b3988622c7617f23ec56dd867e09",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3e1a486ed6f742048994c780db5fae52",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:39Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3e1a486ed6f742048994c780db5fae52",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:40.186075Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100012': {
  "appId" : "APM100012",
  "name" : "vivid-cascade-164",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.81042Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "1",
    "fields" : [ {
      "profileFieldId" : "pf_44c9f848927faa9b066cbdae6be61696",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Encrypted + tested restores",
        "value" : "encrypted+tested_restores",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fab30723e9f8429b81e384a95ae69ba0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_31283e4f-7133-4b20-ac66-9f6aac0254e2",
        "title" : "Auto-created risk for backup_policy field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_af1c3a19c84ff234fcd9cab984791eb7",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7502963c5ae547d98d687999bc319989",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0482f4ad-83e0-4849-91fe-0d0bd5de3d07",
        "title" : "Auto-created risk for chaos_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6b64f91a62ed1193b7e6623cf6404019",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual live",
        "value" : "annual_live",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f139e8fc602c4707a2a1f5490b1f67de",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fdbe9644-a4fd-4ad9-b0cb-6a965a3f6bc2",
        "title" : "Auto-created risk for dr_test_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8e4db92e55be936ac3cd78e449562371",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Semi-automatic",
        "value" : "semi_automatic",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_666a114f19ba44fcb51da756f9cc5ec9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f40e71aa-f67d-4c63-9eff-e7237e8dc2e3",
        "title" : "Auto-created risk for failover_automation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e102de03513daccec81ef2bf9ed30afd",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tabletop",
        "value" : "tabletop",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_68b5480634a6479f822125c91df4ae44",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1dec2a37-6fc2-487c-a3a6-168711f13400",
        "title" : "Auto-created risk for ir_exercise field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6116115bfec07f8e92f5d7b7fefa6ca7",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Tested annually",
        "value" : "tested_annually",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6c7e911e7ae54686be5bab0a300995cb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6019409c-1911-42cb-8ccc-70be29e2e053",
        "title" : "Auto-created risk for ir_plan field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5d494c8aac6cc97d08527f76686433da",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Approved",
        "value" : "approved",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e4339013fc06450bb8453c42f823b513",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_57f9de06-c443-47fa-9028-eb6d5b20b355",
        "title" : "Auto-created risk for runbook_maturity field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "A2",
    "fields" : [ {
      "profileFieldId" : "pf_66d3b8231626db7cdf6e5b7f32d6ccf6",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SBOM required",
        "value" : "sbom_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6daa2977125d4b279d4b9811b6359a84",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6dbdc522-5b3c-49ca-af03-a2eccd8654e4",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_6d1d1571c7ff34cba1e293d9779e63fc",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_8b94b4da10cc44269f1a9ef68b5bd5af",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ca9f4caa-bf5c-406f-a5bf-49224fa4feed",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2d7b8331722516b5f5f55e42d12c113c",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_abd8464b49d84d9b95b84c00b9865970",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ac36ef54-9a58-4a42-9497-099af01cd3af",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_794d2c8324f9de70c3c42733e4ead5c3",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Rotate ≤ 180 days",
        "value" : "180d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a0b3587be42945aa9685ef28fa120848",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d84a99d5-5594-432a-bf90-6d65368a9387",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c118cbc1f4236373b5b3d49ba14a9a90",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_42d6bbfbbeac4126a323a358c1919d36",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c95dbe23-cda0-4bcf-9afd-08adda7e012f",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_71c52c22f57702f585b13d237a40bc72",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Segmentation required",
        "value" : "segmentation_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9cf58bc48d08464299dffd3e4de148bb",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f5524f0d-3511-4020-ba38-a11fa14098f0",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_32343522c9194b403254c04301a0b769",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Critical ≤30 days",
        "value" : "critical_30d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1ab9c4e7a96749d3b41405b85663d036",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4df6a2f9-e0d1-447d-984e-43955e7e758b",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2ef470ce7d15f6dfbc37f1c41f46f8cc",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Centralized (required)",
        "value" : "centralized_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0524a18948ff46929e8b9b828ed74fe4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e5d33df2-0451-41ef-b21e-25b7b2bbaddc",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8eef8ca6692000992b5b6c70041d678f",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Centralized (required)",
        "value" : "centralized_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7fa6ecd9884f4f83a8f70baa6632a8bf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2dbd4bfa-2810-4111-9a93-a2f0ce34911a",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_baca0fdf4f5b285624215e9bb5917a70",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Internal pentest (annual) + continuous scans",
        "value" : "internal_pentest_annual+continuous_scans",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b982b38d525d41e291e16a9ba5ab25bf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_677e7e59-e80e-4a50-9319-af6891af7a40",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1833dac2ad58b80f26caa0677a71986d",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0a4fc2dd56e94c15be845d517fb35de6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_83addfdd-c82b-438c-89a3-31d0e04c4e99",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ecfdc857eb41e520a97756de9e6cd304",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_4490950de6884762b42a81aff2b4915f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ebb769ba-2957-4b91-bdcc-dc473604d6f8",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_325d6cfc306e2137b77b2e4beac7781c",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4dccabad5913451997ff65dd41b1920a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4dccabad5913451997ff65dd41b1920a",
        "documentTitle" : "architecture_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:12.511638Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a4bc30dfc35f766f8cc1eda83db19be3",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f30ac605ee9e4a2e91bbe3ef1f68d608",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f30ac605ee9e4a2e91bbe3ef1f68d608",
        "documentTitle" : "product_roadmap Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:08.101881Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4089438a20244cf9c348399660619030",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a4ab7d696c7747268c489e776fd71995",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a4ab7d696c7747268c489e776fd71995",
        "documentTitle" : "product_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:58.829078Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fdd355917830ab2fa11da38199d6bae4",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a1ef48fdbd11432fb83b97bc10cb7851",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a1ef48fdbd11432fb83b97bc10cb7851",
        "documentTitle" : "security_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:06.401488Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_34bbec726d2f97ac786002bfc0c0fb39",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c7dfae363dca4b5a9bc5837bb08e358c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c7dfae363dca4b5a9bc5837bb08e358c",
        "documentTitle" : "service_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:09.87044Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1de5e2d73ab2c40bece2ecde20bd249e",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1d67f64fc61949ac97066ec7fa31a0df",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1d67f64fc61949ac97066ec7fa31a0df",
        "documentTitle" : "test_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:57.903021Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_645c49b17609d098da2f4a47c37545c1",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Basic logging",
        "value" : "basic_logging",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_74806b7eed8d436eaada8ab4c5ac751a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_74806b7eed8d436eaada8ab4c5ac751a",
        "documentTitle" : "audit_logging Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:56.119296Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5bbd1d1e8fe4b8359fc12c682c23d387",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Optional peer review",
        "value" : "optional_peer_review",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8c6d560b74bd4959b7037b0f925480e8",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8c6d560b74bd4959b7037b0f925480e8",
        "documentTitle" : "change_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:59.625704Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_de7fb5fe0a51571549993c1be95a021c",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Minimal validation",
        "value" : "minimal_validation",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_863e93ecc259488c8c2d45de8823ebb2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_863e93ecc259488c8c2d45de8823ebb2",
        "documentTitle" : "data_validation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:04.602284Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_61fc169ce5511f355342a30660f0b098",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "No",
        "value" : false,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5fb73b55a71e45e38bfefc191175c765",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5fb73b55a71e45e38bfefc191175c765",
        "documentTitle" : "immutability_required Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:03.722484Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_abaf4d5c1616bce95fd46dc77955767b",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6613cb4b38174993ad128ecf55b058df",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6613cb4b38174993ad128ecf55b058df",
        "documentTitle" : "log_retention Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:08.966112Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fcf2b60466aa20906dabd1a1f9f4d170",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Ad hoc",
        "value" : "ad_hoc",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_23208a95f8e94e5f8469ca66a6be2dec",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_23208a95f8e94e5f8469ca66a6be2dec",
        "documentTitle" : "reconciliation_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:51.684944Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_6c1d58bbc8af95c055b0b84be12f2066",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0964b3fdce014bcaafa80f434e3ad421",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0964b3fdce014bcaafa80f434e3ad421",
        "documentTitle" : "ha_topology Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:11.66845Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a4040d1a6f436f1587e6f56f2d6b8193",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3876ecc5169c44cab5ba474dd1c6b204",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3876ecc5169c44cab5ba474dd1c6b204",
        "documentTitle" : "monitoring_slos Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:16.840685Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e00379a3dab1257e35e1f5ffe20f9ea9",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_61fb0050b1684065b887ba0786be2a79",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_61fb0050b1684065b887ba0786be2a79",
        "documentTitle" : "oncall_coverage Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:13.34993Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_41ea91af95d92217848befc1b822e11b",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b1741bc9a64f4d228ad5aabba5e451c6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b1741bc9a64f4d228ad5aabba5e451c6",
        "documentTitle" : "rpo_minutes Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:49.943019Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ff6aacf5f16f696f1b71b0394cd8d9fd",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ced97856637c47e381849c688a93069e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ced97856637c47e381849c688a93069e",
        "documentTitle" : "rto_hours Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:53.468129Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_96b97425787cd27ccf82c859f5c5d175",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4840a748a969495faeebddcbaf842f7c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4840a748a969495faeebddcbaf842f7c",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:47.256059Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c99137cca2c56443afed07ca1e54c2e7",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_376cc0eb43154b6b8d70fbe37c7f7432",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_376cc0eb43154b6b8d70fbe37c7f7432",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:49.094786Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_995fb9139043f4bfacf240ef64b60039",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a4483f07d66f41edbfd079f8eed91827",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a4483f07d66f41edbfd079f8eed91827",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:44:46.267186Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_20a88fd3db95b6df096b41ee3fcf8409",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_570695f49f75490083e16885fe729429",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_570695f49f75490083e16885fe729429",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:15.056308Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_53d14d7e9e28b61a062b48685eed81de",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0c8ed431dd6a446694146d6a89dfdaaa",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0c8ed431dd6a446694146d6a89dfdaaa",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:18.687649Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c670b2c78556759c57471881b674d68f",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9b0d66879695492e9895ea3199da80f7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9b0d66879695492e9895ea3199da80f7",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:01.582173Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ce8833e014581fb9254319de2eb23cc3",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c61c8867f42542f2a9c00bb76fc7a676",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:40Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c61c8867f42542f2a9c00bb76fc7a676",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:00.687229Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100013': {
  "appId" : "APM100013",
  "name" : "prime-atlas-740",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:29.907267Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "4",
    "fields" : [ {
      "profileFieldId" : "pf_0dc30973e0c68d479c1a9056a225aa60",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_b37b6b3a4d634123a21d518ac3232c9b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_b37b6b3a4d634123a21d518ac3232c9b",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:32.414522Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_48d880c1d61959a9d22dcac8d7427f84",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_21db22af65c6408b93f33ffa3ecf2497",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_21db22af65c6408b93f33ffa3ecf2497",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:49.117134Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1db5cfcab6e64e2f7943da57a718acff",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_98f323b166a84c02a2bb12dd83b96d9c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_98f323b166a84c02a2bb12dd83b96d9c",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:45.407237Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1cf00a72e51d4a90aa7061f4adb603d8",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ecc84f3731d5416ab00672729889bd75",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ecc84f3731d5416ab00672729889bd75",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:29.704492Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5068a8067ab1d5e6fc1b9a8375dd4d08",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_2ef3c48638404365819827e14feb18d7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_2ef3c48638404365819827e14feb18d7",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:25.511631Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f3a09153f8c21bc4dfca82d6a7e75146",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5a66dde98bb74263bbeb1603b3c0ae3c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5a66dde98bb74263bbeb1603b3c0ae3c",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:52.671678Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_962cb6f51c72a00881b68176e3e4e479",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c1b1ba8f11454caa900f9c14c24d546f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c1b1ba8f11454caa900f9c14c24d546f",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:28.081119Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_ee4ef3cfb424813872252177cff312b5",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d0c06087ce1148e984b1bc7f82051ec9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d0c06087ce1148e984b1bc7f82051ec9",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:44.536502Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a5449c92d426d376b64eddead720c1f1",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_cf3554cd57924930850ee51cf0cd71ab",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_cf3554cd57924930850ee51cf0cd71ab",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:34.133879Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c82579e4ba5c3abe30bba46ef79df772",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_03f35b6d211945bd9f0280e70a8b6c7d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_03f35b6d211945bd9f0280e70a8b6c7d",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:33.255305Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b24e9243f249295b52fc29c54228fd71",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d31c0f04bcf4461ca229e824b9dd0637",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d31c0f04bcf4461ca229e824b9dd0637",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:43.707631Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0be2dd3a3ad93368137b10701a163140",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bcdfac7d4946467c8c20f9719c8dbfbe",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_bcdfac7d4946467c8c20f9719c8dbfbe",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:30.593737Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_14f2cfb90995174eb1d0c7d8a6428866",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d0096167036b489e8ee5623a09f80103",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d0096167036b489e8ee5623a09f80103",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:36.728307Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_bb03c4862c7cb26646ec712efdbfba42",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_29f036cd3aa842e19e48efb948039230",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_29f036cd3aa842e19e48efb948039230",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:59.610705Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cc93446241593f36807379500eabbed1",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a3ce006f828748ee974123cbf6a21724",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a3ce006f828748ee974123cbf6a21724",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:41.028247Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_e7a5383b075cbaa794697703ae1344f4",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c232aaf4bd9a480aa4e6416e38d1c06e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c232aaf4bd9a480aa4e6416e38d1c06e",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:47.269207Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b64f4f4429c7a77d01992ad8b8294405",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1d9c0dcb2c8d4f3a8d2c0727af6d610a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1d9c0dcb2c8d4f3a8d2c0727af6d610a",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:54.409281Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3bbad9363b8108e9239e2cfb5e577509",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e4a447e71dc04605baea824b2ef7a71e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e4a447e71dc04605baea824b2ef7a71e",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:39.299153Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cb2a1aa02b760b1421367f2c5b5be5f8",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a1d8659c5f8040b9ac77f59d4b8b0c8b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a1d8659c5f8040b9ac77f59d4b8b0c8b",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:57.881294Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_e1e8402d49fe23d47f916be68db6eae9",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_45b7b74fe3a44df683c8402375c01a8d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_45b7b74fe3a44df683c8402375c01a8d",
        "documentTitle" : "architecture_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:53.601646Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4fc268f0adc6d8f41bec31a8d84de487",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_54b126ab02e04c19b0825a017c494c00",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_54b126ab02e04c19b0825a017c494c00",
        "documentTitle" : "product_roadmap Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:57.058124Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a098a0d9b5fef0c5f22e09b2cd928d72",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5d5c4e30d9c147d79581352bb6d03d8a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5d5c4e30d9c147d79581352bb6d03d8a",
        "documentTitle" : "product_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:40.22111Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d9eb5f335bfb15102bad609817fd6e04",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_af0044f94c294c28bb8943806c086e37",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_af0044f94c294c28bb8943806c086e37",
        "documentTitle" : "security_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:56.265288Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_bd289f3aa5a3d4ef3ab1f63561d22da4",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5ac8f1f92a4443a59c685e705b076f42",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5ac8f1f92a4443a59c685e705b076f42",
        "documentTitle" : "service_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:46.289619Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_804870c028b238a030defc99c62325c2",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f47144b99e034b6980d10d034436e555",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f47144b99e034b6980d10d034436e555",
        "documentTitle" : "test_vision Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:24.657778Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_d391316461ea97e3c687c2cc6c2f2ab2",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + periodic review",
        "value" : "full_with_periodic_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_6123279d347a4feab6a8a307e753d5c4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_577f6e9b-cad9-4f3d-a8d0-b3eafce1c21a",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3651503071151f1be7c4d8354eafa356",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + regression suite",
        "value" : "peer_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9880b020fda348369dae2d16fbbf5e25",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_9d6cd76d-8ea5-473f-8359-9012fd7436e7",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_0957fc9a21478c34011eb5395a265f78",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Strong validation",
        "value" : "strong_validation",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ef839f7a5d1844f4913761fc029433a7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f9f7d2eb-8b2b-4810-b119-cf6cbb805613",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_fc23a226a64dfe16b9ce637481a1d507",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_76fc47db8b5b437c91af84835a76b00a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0d29bada-5b4f-4c8e-a787-29278dddef03",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e6b5e0b2f73ead228ad9e94a920235a8",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 6 months",
        "value" : ">=6m",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7481d73e31c44597a5dab775a46de782",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_62e97909-9288-448c-8099-1d5528e2e70f",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_e7ec525e2183c41d638031b0c991d44f",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Weekly",
        "value" : "weekly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_34eca9939edf491f8a65c37d8bfb2743",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_43ebbccd-6095-41a3-90c1-da4dc8272964",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_915b63dc60172e6a0317e099a2e13f8f",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Active",
        "value" : "active_active",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1c38856631914a208d7d8d218a8bc346",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8156ec67-d0eb-49f5-b6ab-66976f38275f",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2b8d59496354dbdf34d07014abed901d",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.9% with alerting",
        "value" : "99.9+_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b4d0c5cdbbd34415b1c4412e3872d17f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2bca7e18-cb0b-4d01-a691-b9fe773fccee",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_bbc8433703a9b5f39df29576d47923e9",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "24×7",
        "value" : "24x7",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_55686b6e67db4ec988117054e30ea00d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6eec4498-32d6-4c30-b0e4-319447ba5813",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_f640cf48dd5ade58f99b800d73ec07a9",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 5 minutes",
        "value" : 5,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_02ec4d1a91184e7b8ccf06dba8fd0339",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2ccc4bda-6bf5-46ce-ae40-ef4435debddc",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_229c05e083b6f370f129c5b10086d658",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 1 hour",
        "value" : 1,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1ff695f32d5c4f8ba40bdc2154fc1e01",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c0574af2-f320-44a1-962d-0058ac060109",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_c1d41d60c280500584df403acfcaa2cc",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_901b11e6412e49d4b2c5a3b4d5e3d6dc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_901b11e6412e49d4b2c5a3b4d5e3d6dc",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:55.318384Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1f5194eecb1e31e0d2ece1ed07e8480b",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Public",
        "value" : "public",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_57da9c0726e440ec83e25a81478b8e5c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_57da9c0726e440ec83e25a81478b8e5c",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:35.845715Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4c4096b0b8ff1f2922b2627a9498ae87",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_8ad35afc3c9c49ac8f29af02b9c5fa12",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_8ad35afc3c9c49ac8f29af02b9c5fa12",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:34.979016Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_904bc993bd30189a1c269b830eca31c1",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Unrestricted",
        "value" : "unrestricted",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e8145f930b2d46bda0b80e16275b8a33",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e8145f930b2d46bda0b80e16275b8a33",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:48.210242Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_3c70faa95cc842e25c18ee1e0be84ec0",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7050840c4a154cf1bf41456a461d2702",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7050840c4a154cf1bf41456a461d2702",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:51.836651Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_b6e3fe120c5855f35b26f72afe7ea09e",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_167455d791bb4d3497090c8e319ee6c7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_167455d791bb4d3497090c8e319ee6c7",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:45:26.395148Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5a1464822bf0f5ee517893787bebb0f0",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_89cef1e3005345819f973ce1716cf46f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_89cef1e3005345819f973ce1716cf46f",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:01.569647Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100014': {
  "appId" : "APM100014",
  "name" : "lunar-anchor-671",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:30.015158Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "2",
    "fields" : [ {
      "profileFieldId" : "pf_813f0f6d4e01674cfaa7ef1c76205bc1",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard + periodic restore test",
        "value" : "standard_backups+periodic_restore_test",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_9b7fe59b93a74b3395a5a34e8a3cc531",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_9b7fe59b93a74b3395a5a34e8a3cc531",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:31.272552Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_ccffb779b5748f23602d8b3dfcf444fc",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5b5817b834114987bba26a8952a631c1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5b5817b834114987bba26a8952a631c1",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:02.492369Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_57bb120fbc978624503aec4c03234c7b",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Annual tabletop",
        "value" : "annual_tabletop",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_bde23b3cefef4d18bf3de9f7f289a879",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_bde23b3cefef4d18bf3de9f7f289a879",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:22.365437Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_29dd8ea8058d2c29a9e80c0d7ef3b0f9",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Manual",
        "value" : "manual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4d6052f73d1440a8868cca92a07e86f3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4d6052f73d1440a8868cca92a07e86f3",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:28.554096Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_017f6e04858e94181223d805d0d13739",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_59b0549640554ceca65d37ab5a2dcbb0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_59b0549640554ceca65d37ab5a2dcbb0",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:40.154875Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9df789b4e76d09081e612af56c1bf63e",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Documented",
        "value" : "documented",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_51890ec10b634d3cb05212ac3cf13de9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_51890ec10b634d3cb05212ac3cf13de9",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:33.987546Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_525b5e7d4fccae71adbd96880a8c0388",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Draft",
        "value" : "draft",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_5c5eb70f76834a2f99a581c7ff940cad",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_5c5eb70f76834a2f99a581c7ff940cad",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:38.47016Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "A1",
    "fields" : [ {
      "profileFieldId" : "pf_cad541945ea3aca9986969784705f2ce",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "SBOM required",
        "value" : "sbom_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e7bc9696d9964ceb9de7980a816cde85",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8c4781d0-43fd-404a-885f-549196283efa",
        "title" : "Auto-created risk for dependency_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_fa065bd02c01a526c1791c4f39b85677",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_322d8be68a784b5cb00ed8f8274ff189",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5e0ca0b8-716b-43d8-979e-7cd071934f0d",
        "title" : "Auto-created risk for encryption_at_rest field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2b5f977173661f3928788aa45c4e7db2",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c2864631e1e047d4b48456974c7db24c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_701d246c-19be-4d72-b281-24a11f0de859",
        "title" : "Auto-created risk for encryption_in_transit field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1a1f24b8a10ace8495958c6144de86da",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Rotate ≤ 90 days",
        "value" : "90d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_3e661090b1c04e208a1838136100ad37",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_970372b0-80e8-41be-868b-bb35529cba92",
        "title" : "Auto-created risk for key_rotation_max field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_0b14c8b3e89b4905a95c66dcdc86e846",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_44469b8436fd41a59a1622f6e1eca706",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_f92ee7f9-7035-4759-a4cb-48cc1c232b9d",
        "title" : "Auto-created risk for mfa_enforcement field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8b68e44f30d8c3c8d158e243340a6f0b",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "PCI/CDE segmentation required",
        "value" : "pci_cde_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_35619e5e99df4390a29951d5b0e486b5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_cf3eb549-e5d6-406b-861f-e2775038eb3d",
        "title" : "Auto-created risk for network_segmentation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_168c74f1ad2b444c48201d5fad05dfab",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Critical ≤30 days",
        "value" : "critical_30d",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9601da769ab944d28c39f5ca1c4eab57",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6715b5af-9210-4c09-b647-f25299081ba8",
        "title" : "Auto-created risk for patching_sla field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_89c9a03c3522fd19a84a9bf9f0824b87",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Centralized (required)",
        "value" : "centralized_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_185474bbacad479cb176eda885e1b007",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:41Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1a6e3738-e404-47c6-a2ad-b129475671a1",
        "title" : "Auto-created risk for privileged_access_mgmt field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_43755f3d625d4cfc980279097512f9d7",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Centralized (required)",
        "value" : "centralized_required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_eb3ec7404c7f4eefa739d13ed6cc458a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_ece2eca7-7fce-48e3-ab04-01117f76ae7f",
        "title" : "Auto-created risk for secrets_management field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_ae8ff5b10c127d50c2ea1076e5d09404",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "External pentest (annual) + continuous scans",
        "value" : "external_pentest_annual+continuous_scans",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a0a2cde44be14fb28fe6a1a40335047d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_975093d1-4d63-4582-9d22-1b5491c793b6",
        "title" : "Auto-created risk for security_testing field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_50d62a0d66cb90892f942fdba2a89781",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ff9bf21b1260448cb4b51a22f8873c33",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a4762953-889f-4fc1-9a74-82c96b8b67b1",
        "title" : "Auto-created risk for siem_integration field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_44793814973570d6abed98a5dfe4b320",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Required",
        "value" : "required",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_84b730fd5d60432099df032fb5fbfb60",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1caf9321-9cb7-4337-859d-e7715c6b6c71",
        "title" : "Auto-created risk for waf_protection field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_684b261d0869facda4ee466354bc3e80",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_8073672da31c425e978feb5c7671313d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a52c3de5-ec73-49db-a738-9614fe421610",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2edf82753e21d9cde5b4df95ba9e690b",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_492c8ac207d54879ac5d69a9778508c4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_67ef7038-1321-41f3-a440-d043d968f44c",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5060ff79940e00506f72472e11876e04",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_20bd2d74c885465d93329e9b365c5c3e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_90142cd9-abe9-4031-a50c-87baed1148fd",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_91d7eab6e31acd73f12c995965f829a6",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c134e178bc714685abcee753c2bea781",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_23499a72-b09b-4d11-82be-feaf246b542d",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_2a86a058a25d17d6fb31acfedc67aa68",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_cc210fc46a804b93aff567d34e62c509",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e9c99267-8c67-4de2-aa41-994a2faf5ad5",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_83b333b4b54550ed607e206ce034a4cc",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a430dec8f3fd42e08fd2b0ab1316ad2d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e1c02ceb-e60a-43b1-b364-8336f7eaf17a",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_9fd84aa9486c6b8c721272059cbf9c7c",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Logging enabled + sampled review",
        "value" : "logging_enabled+sampled_review",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6e6c94a533f147dd9accc6b9f778b83b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6e6c94a533f147dd9accc6b9f778b83b",
        "documentTitle" : "audit_logging Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:09.700798Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_7afd14a7f15503a01d7711c18a30e71a",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + unit tests",
        "value" : "peer_review+unit_tests",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_16fdd6f5ed23455db18afaa9500adde5",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_16fdd6f5ed23455db18afaa9500adde5",
        "documentTitle" : "change_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:14.941266Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_482bf454c70aa39bb5155de40276c82a",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Standard validation",
        "value" : "standard_validation",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_85c4c73204ac45dcbd3fa68226f0e65c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_85c4c73204ac45dcbd3fa68226f0e65c",
        "documentTitle" : "data_validation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:25.011458Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f880944ac2ecfb52c7c263006ebd8701",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "No",
        "value" : false,
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f978a299575644b597bd584a7123b3ae",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f978a299575644b597bd584a7123b3ae",
        "documentTitle" : "immutability_required Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:07.870169Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_f56df51dbd68bbd607cdd36c58213803",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 90 days",
        "value" : ">=90d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_33a5038701e34d5dab1c93c88f4d1eb7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_33a5038701e34d5dab1c93c88f4d1eb7",
        "documentTitle" : "log_retention Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:35.757498Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fa89727b52c9ffd15da549f90c9ae072",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Per release",
        "value" : "per_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_90fc02601fd143f8a7256e25f5b12b12",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_90fc02601fd143f8a7256e25f5b12b12",
        "documentTitle" : "reconciliation_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:11.340517Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_236832aba3deb88e67440aee43e7c8ef",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Passive",
        "value" : "active_passive",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_006b4786892b445dbb07aa2844b65e3a",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_76216848-5449-4295-9f0b-445c057088fa",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c64ff410b2e7d1df8e9c7edb9c29fdc7",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.5% with alerting",
        "value" : "99.5_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_fde97ed51d27420db1cb2c34194244e6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_c29685fc-a4de-43e6-a001-e04ac828ffe1",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1b8ab29ce0eb457f2d32ab4ea5585d53",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "16×5",
        "value" : "16x5",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_dfe0b364117d4de08bc39e94daecd1d0",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_6384c53c-a6ff-45a3-a04c-ba2430345fd1",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_c5f04db1f9b198b501359de1d4779fce",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 60 minutes",
        "value" : 60,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_9c9a9784546a4fabb5610eaef6eb09f9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_269f812f-084d-448f-981e-f622720e6803",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_1c4caaec35f7d5c79afa92d002c41d36",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 4 hours",
        "value" : 4,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_7a5fc04887ae4ded9aeaaf17d028c0df",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_8f5cb9ea-1ded-43c0-b5c6-f84ccdb0adbe",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_1ed1350bef997771b7a0bd00ed8abf75",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Annual",
        "value" : "annual",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e60055fd0ad6408eb4dc19fe64102a65",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e60055fd0ad6408eb4dc19fe64102a65",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:14.072668Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0cd693efa9dd3dd6c080a7e7251eda0f",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Internal",
        "value" : "internal",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f3d176765b7143bc93fb9b8d16854293",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f3d176765b7143bc93fb9b8d16854293",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:17.764107Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2e078ae244419c4ecb935d81497f14c6",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d90d7af0d5bb4ae4bdbee42c228d6f84",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d90d7af0d5bb4ae4bdbee42c228d6f84",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:39.309972Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c6ec50b96c1918d700e3556161f6c985",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Permitted cross-region",
        "value" : "permitted_cross_region",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_6f52f863c4504cd3a7257f0516635918",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_6f52f863c4504cd3a7257f0516635918",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:10.52938Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_487ed166beb94d947a66699c50410e35",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_dc1bbb3dde224ace96d4f148758eaf21",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_dc1bbb3dde224ace96d4f148758eaf21",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:23.16246Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_8642183a99f9e72b5619010e3ecf089f",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_cfb56fb0a6a94b3db944bf6c6baa2b77",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_cfb56fb0a6a94b3db944bf6c6baa2b77",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:04.254052Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_bb83130b50644029dd78719a4e5d5ba7",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_3cf5fc8c70fe4775aad1663fe5983dae",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_3cf5fc8c70fe4775aad1663fe5983dae",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:06.115114Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
  'APM100015': {
  "appId" : "APM100015",
  "name" : "emerald-compass-232",
  "version" : 1,
  "updatedAt" : "2025-09-04T20:37:30.132558Z",
  "domains" : [ {
    "domainKey" : "resilience_rating",
    "title" : "Resilience",
    "icon" : "ResilienceIcon",
    "driverLabel" : "resilience_rating",
    "driverValue" : "4",
    "fields" : [ {
      "profileFieldId" : "pf_c3fdea173cd181f0684e1807bd4988bb",
      "fieldKey" : "backup_policy",
      "label" : "Backup Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a5f7bab64ad040f6a1b3425f512b1ab6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a5f7bab64ad040f6a1b3425f512b1ab6",
        "documentTitle" : "backup_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:52.712732Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9ad4d4f9b9aecc892daf68225364e86f",
      "fieldKey" : "chaos_testing",
      "label" : "Chaos Testing",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7eb9881f50d34a4e9788a550c0b20532",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7eb9881f50d34a4e9788a550c0b20532",
        "documentTitle" : "chaos_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:16.345865Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_c4008b8e64feed196e67c80cad35acfc",
      "fieldKey" : "dr_test_frequency",
      "label" : "DR Test Frequency",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f5c39c6369ed43368f99230d87215d6d",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f5c39c6369ed43368f99230d87215d6d",
        "documentTitle" : "dr_test_frequency Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:18.180737Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_caaeb118745fd87e5e58267db5dfebca",
      "fieldKey" : "failover_automation",
      "label" : "Failover Automation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1a4629e24b254cfdaa806ed2c05d7267",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1a4629e24b254cfdaa806ed2c05d7267",
        "documentTitle" : "failover_automation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:17.310394Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_cbd9c3078535ebb0afd7dddc1d281b78",
      "fieldKey" : "ir_exercise",
      "label" : "Incident Response Exercise",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_12110a9e72c44964a13b2bb7d43d0261",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_12110a9e72c44964a13b2bb7d43d0261",
        "documentTitle" : "ir_exercise Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:07.071482Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_9ccdbbde7f22f1f7ff8d46f172f72173",
      "fieldKey" : "ir_plan",
      "label" : "Incident Response Plan",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_1831ec4bedca415aa800250984ed7b96",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_1831ec4bedca415aa800250984ed7b96",
        "documentTitle" : "ir_plan Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:15.526763Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_a1ba9e50c24b9b9e0b6894eee96f923b",
      "fieldKey" : "runbook_maturity",
      "label" : "Runbook Maturity",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "None",
        "value" : "none",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_681824c0c0524e43b928064fecdc766e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_681824c0c0524e43b928064fecdc766e",
        "documentTitle" : "runbook_maturity Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:54.365522Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "security_rating",
    "title" : "Security",
    "icon" : "SecurityIcon",
    "driverLabel" : "security_rating",
    "driverValue" : "C",
    "fields" : [ {
      "profileFieldId" : "pf_1f8e2960a89dfea22a0bbf245adb918f",
      "fieldKey" : "dependency_management",
      "label" : "Dependency / SBOM Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_cf1cbbd264db4b8d91855ca77166fd80",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_cf1cbbd264db4b8d91855ca77166fd80",
        "documentTitle" : "dependency_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:10.488415Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_7b2c44a515e5e9fc00032bafeaad03d8",
      "fieldKey" : "encryption_at_rest",
      "label" : "Encryption at Rest",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d1898da9d841449b888d8b294105315c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d1898da9d841449b888d8b294105315c",
        "documentTitle" : "encryption_at_rest Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:03.347582Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_2ab48e0a3021eec05d3b0fc99b67591b",
      "fieldKey" : "encryption_in_transit",
      "label" : "Encryption in Transit",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e722c874a1304077b86b20c4dbde3197",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e722c874a1304077b86b20c4dbde3197",
        "documentTitle" : "encryption_in_transit Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:53.53171Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4bbbb220f980664fe66940ca13f2a000",
      "fieldKey" : "key_rotation_max",
      "label" : "Key Rotation Max",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Rotate ≤ 365 days",
        "value" : "365d",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_52ecced2748349248c81744b9d41a3bc",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_52ecced2748349248c81744b9d41a3bc",
        "documentTitle" : "key_rotation_max Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:41.036047Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1728e273ee1409745da14b3056dd648a",
      "fieldKey" : "mfa_enforcement",
      "label" : "Multi-Factor Authentication",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_23de7af6ce854e5f8b360a3d7a71a106",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_23de7af6ce854e5f8b360a3d7a71a106",
        "documentTitle" : "mfa_enforcement Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:12.187336Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_d7aa01b68136aaf98eb781779b250dfe",
      "fieldKey" : "network_segmentation",
      "label" : "Network Segmentation Evidence",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_622e0cb4b7a847d286a7470d0e4c98e6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_622e0cb4b7a847d286a7470d0e4c98e6",
        "documentTitle" : "network_segmentation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:02.44569Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_979bb4e1cc0c8be3114e4512f2e49c9b",
      "fieldKey" : "patching_sla",
      "label" : "Patch Remediation SLA",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Best effort",
        "value" : "best_effort",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0fe4587ded7442b0a3a24a13e6574ca3",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0fe4587ded7442b0a3a24a13e6574ca3",
        "documentTitle" : "patching_sla Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:01.457543Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_085ec2c6ea65bb2183cbd7780e26f619",
      "fieldKey" : "privileged_access_mgmt",
      "label" : "Privileged Access Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Manual OK",
        "value" : "manual_ok",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_c3ac73c6c5934c4288de47402a131ed4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_c3ac73c6c5934c4288de47402a131ed4",
        "documentTitle" : "privileged_access_mgmt Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:00.538136Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_13c23b7cae98bdca5d262c33f7778a92",
      "fieldKey" : "secrets_management",
      "label" : "Secrets Management",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Centralized (recommended)",
        "value" : "centralized_recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_f3964aca4568469e8ab459ae2a72a2d4",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_f3964aca4568469e8ab459ae2a72a2d4",
        "documentTitle" : "secrets_management Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:58.719157Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_0f1c345880be1197d6bb97bd7321f08a",
      "fieldKey" : "security_testing",
      "label" : "Security Testing",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "SAST on release",
        "value" : "sast_on_release",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_7aea5410ed1b4a898ad4714df4146bbf",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_7aea5410ed1b4a898ad4714df4146bbf",
        "documentTitle" : "security_testing Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:06.203309Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_fe55d36e540ee5c94687330de24376b7",
      "fieldKey" : "siem_integration",
      "label" : "SIEM / Central Log Integration",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e5b936ea9ee441dabd7d49b2f9d46c71",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e5b936ea9ee441dabd7d49b2f9d46c71",
        "documentTitle" : "siem_integration Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:43.63607Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_137a2af1a0c27631f0306aadc5676c5c",
      "fieldKey" : "waf_protection",
      "label" : "Web Application Firewall Evidence",
      "policyRequirement" : {
        "ttl" : "180d",
        "label" : "Recommended",
        "value" : "recommended",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_d71cb8f516f24e0da4ec2d468840d37b",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_d71cb8f516f24e0da4ec2d468840d37b",
        "documentTitle" : "waf_protection Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:14.715835Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  }, {
    "domainKey" : "app_criticality_assessment",
    "title" : "Summary",
    "icon" : "SummaryIcon",
    "driverLabel" : "app_criticality_assessment",
    "driverValue" : "A",
    "fields" : [ {
      "profileFieldId" : "pf_d866e75ba1b24488f4feda3c48139a4e",
      "fieldKey" : "architecture_vision",
      "label" : "Architecture Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_a084fc4be36547e99e1ae75afbd60342",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_d45f5cb7-8a0b-475e-9dd2-93175c09ef37",
        "title" : "Auto-created risk for architecture_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3703ddd32e57066b96c7ba59d8f72170",
      "fieldKey" : "product_roadmap",
      "label" : "Product Roadmap",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_1433cf50cbf842eaa7fe0f693d82ed84",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_a4789f3e-f914-447f-93e5-d098b0eb880b",
        "title" : "Auto-created risk for product_roadmap field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3885104e79ec85fc4fc2c8b552e4e29d",
      "fieldKey" : "product_vision",
      "label" : "Product Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d38e12feb291427a9f46bd999cabf6e7",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e172547a-e57f-455b-8d50-61d59b64c18a",
        "title" : "Auto-created risk for product_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_80b20f59485fed3dcece61869d4a3520",
      "fieldKey" : "security_vision",
      "label" : "Security Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_f61d066892c242b6a500ac95f68182a1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_aef7c9de-4c41-47d0-a23f-a3874591e56c",
        "title" : "Auto-created risk for security_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_a771567ea06189ccd6934a1fd4f8c47d",
      "fieldKey" : "service_vision",
      "label" : "Service Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_5a22bdbd725d4f9bab2b18bc2a841328",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_2be29d54-0ea6-4747-9af5-f4f525d624a2",
        "title" : "Auto-created risk for service_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_5481c119ac92e1e7bde679efcb62660e",
      "fieldKey" : "test_vision",
      "label" : "Test Vision",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Mandatory",
        "value" : "mandatory",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_d53ff9304fe54a33b2468467864f409c",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_b406021c-5142-4685-866b-b91b63bfc1bd",
        "title" : "Auto-created risk for test_vision field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "integrity_rating",
    "title" : "Integrity",
    "icon" : "IntegrityIcon",
    "driverLabel" : "integrity_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_02f42ad7863a8ed42618e005a3a00486",
      "fieldKey" : "audit_logging",
      "label" : "Audit Logging",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Full logging + periodic review",
        "value" : "full_with_periodic_review",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_b1b4da395a084fa8b6c4801738364fe2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_e2004a70-4055-4248-987e-e4147c91a515",
        "title" : "Auto-created risk for audit_logging field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_b28823ab8767d1d2129e1e0792e485f1",
      "fieldKey" : "change_control",
      "label" : "Change Control",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Peer review + regression suite",
        "value" : "peer_review+regression_suite",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_c906d683f2344e9f99ce2a4cba6ca07f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_46f34ece-514d-441e-872a-ca375cf74f33",
        "title" : "Auto-created risk for change_control field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_3b2e51e0608a5efd7eef09b89df117b6",
      "fieldKey" : "data_validation",
      "label" : "Data Validation",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Strong validation",
        "value" : "strong_validation",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_8405e10aaa254c9fb5ba9eea9d122774",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_5936d2e5-6c8e-46f4-bc34-2b998492207a",
        "title" : "Auto-created risk for data_validation field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_740dd5af011d15f4b435a79f3bc7ea01",
      "fieldKey" : "immutability_required",
      "label" : "Immutability Required",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Yes",
        "value" : true,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_ad7eefd0dcf340d39704d2b49f662566",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1bd60aa0-4d86-4293-a28d-127322bfd4a8",
        "title" : "Auto-created risk for immutability_required field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_353e53643bd225f73d13406b4cf5b519",
      "fieldKey" : "log_retention",
      "label" : "Log Retention Period",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "≥ 6 months",
        "value" : ">=6m",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_08366b83352445a7a1880a489b8fa899",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_7dd2bc55-e180-4ccb-b996-347c9fcff505",
        "title" : "Auto-created risk for log_retention field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_510cb6ff0a9e6f5899e38546fe64b9bf",
      "fieldKey" : "reconciliation_frequency",
      "label" : "Reconciliation Frequency",
      "policyRequirement" : {
        "ttl" : "30d",
        "label" : "Weekly",
        "value" : "weekly",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0083cfac6e5249e1a4aa384d5328b72e",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_1ca64b99-fa5d-498f-a204-c13374cd3788",
        "title" : "Auto-created risk for reconciliation_frequency field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "availability_rating",
    "title" : "Availability",
    "icon" : "AvailabilityIcon",
    "driverLabel" : "availability_rating",
    "driverValue" : "B",
    "fields" : [ {
      "profileFieldId" : "pf_80ae4a513513cc16aede6cf899c3ee38",
      "fieldKey" : "ha_topology",
      "label" : "HA Topology",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "Active-Passive",
        "value" : "active_passive",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_2e5cb4aa516a47718d8a8595dddc39b9",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_87d503eb-7d61-4317-b5a8-1377d6b0e800",
        "title" : "Auto-created risk for ha_topology field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_b3d75609ba631c2c65934673aecb4999",
      "fieldKey" : "monitoring_slos",
      "label" : "Monitoring SLOs",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≥99.5% with alerting",
        "value" : "99.5_with_alerting",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_31af4030a4674e09b020389aec1bb231",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_0cbfea80-6ba0-4b27-8956-864712faea0e",
        "title" : "Auto-created risk for monitoring_slos field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_cdedcc5264382083ae6027163da0f8fd",
      "fieldKey" : "oncall_coverage",
      "label" : "On-call Coverage",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "16×5",
        "value" : "16x5",
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_0a5d9c08e747428dad78964df53bf93f",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_4c0da58b-a68d-4253-bba9-64e027013f85",
        "title" : "Auto-created risk for oncall_coverage field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_8301435087c2704fc07e31e2355750e0",
      "fieldKey" : "rpo_minutes",
      "label" : "RPO (minutes)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 60 minutes",
        "value" : 60,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_786214183a674fc4884151bc84e7ded6",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_17fdd83e-b216-4e67-962b-9133a6d6433d",
        "title" : "Auto-created risk for rpo_minutes field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    }, {
      "profileFieldId" : "pf_26e0b92b223294fbfd02ac12413449e8",
      "fieldKey" : "rto_hours",
      "label" : "RTO (hours)",
      "policyRequirement" : {
        "ttl" : "90d",
        "label" : "≤ 4 hours",
        "value" : 4,
        "requires_review" : true
      },
      "evidence" : [ {
        "evidence_id" : "ev_e0bbbfbc7bf34d62b5712496422100b1",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ {
        "risk_id" : "risk_fe7fc9e6-3182-4c15-b55b-24bae87bfa9c",
        "title" : "Auto-created risk for rto_hours field",
        "severity" : "medium",
        "status" : "PENDING_SME_REVIEW"
      } ],
      "attestations" : [ ]
    } ]
  }, {
    "domainKey" : "confidentiality_rating",
    "title" : "Confidentiality",
    "icon" : "DefaultIcon",
    "driverLabel" : "confidentiality_rating",
    "driverValue" : "D",
    "fields" : [ {
      "profileFieldId" : "pf_e9e4d9e2688e6770f5410afe838b2f61",
      "fieldKey" : "access_review",
      "label" : "Access Review Cadence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_4e5cbf25ebed413686231e02000b3099",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:42Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_4e5cbf25ebed413686231e02000b3099",
        "documentTitle" : "access_review Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:08.735123Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_42d2938be33a76dcf2bebd54fdac0276",
      "fieldKey" : "confidentiality_level",
      "label" : "Confidentiality Level",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Public",
        "value" : "public",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_98386add293f4e08a93f1236202152d2",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:43Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_98386add293f4e08a93f1236202152d2",
        "documentTitle" : "confidentiality_level Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:41.896204Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_4934f1cedab31d76799ff1b574d32aa3",
      "fieldKey" : "data_deletion_evidence",
      "label" : "Secure Data Deletion Evidence",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0c58f613d68f417590aaa0f43a811b66",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:43Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0c58f613d68f417590aaa0f43a811b66",
        "documentTitle" : "data_deletion_evidence Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:04.44645Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_6274da68672d009487f2a4e672dfd38d",
      "fieldKey" : "data_residency_control",
      "label" : "Data Residency Control",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Unrestricted",
        "value" : "unrestricted",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_0e3400d3c38e4ac683ce6c300a725c40",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:43Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_0e3400d3c38e4ac683ce6c300a725c40",
        "documentTitle" : "data_residency_control Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:57.862915Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1e94a7f8b8e648e24b51fef7d817733c",
      "fieldKey" : "data_retention_policy",
      "label" : "Data Retention Policy",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_a004b5e686e042d3b4c07a8b5c794661",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:43Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_a004b5e686e042d3b4c07a8b5c794661",
        "documentTitle" : "data_retention_policy Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:47:13.864253Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_1e14695c10ce11ed421916f67ecb5ad4",
      "fieldKey" : "de_identification",
      "label" : "De-Identification",
      "policyRequirement" : {
        "ttl" : "365d",
        "label" : "Optional",
        "value" : "optional",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_e47fa704ef8647528adcdc55febc1e57",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:43Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_e47fa704ef8647528adcdc55febc1e57",
        "documentTitle" : "de_identification Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:57.047243Z",
        "submittedBy" : "security_analyst_001"
      } ]
    }, {
      "profileFieldId" : "pf_5805da0c12e6f4b0e40ea86002b4f8b8",
      "fieldKey" : "tpsp_attestation",
      "label" : "Third-Party Service Provider Attestation",
      "policyRequirement" : {
        "ttl" : "0d",
        "label" : "Not applicable",
        "value" : "n/a",
        "requires_review" : false
      },
      "evidence" : [ {
        "evidence_id" : "ev_ab5d591eae53424f9ecae8c0c81dd605",
        "status" : "active",
        "valid_until" : "2026-09-04T20:37:43Z"
      } ],
      "approvalStatus" : "pending",
      "freshnessStatus" : "current",
      "risks" : [ ],
      "attestations" : [ {
        "evidenceId" : "ev_ab5d591eae53424f9ecae8c0c81dd605",
        "documentTitle" : "tpsp_attestation Evidence",
        "documentSourceType" : "gitlab",
        "linkedAt" : "2025-09-04T20:46:59.617109Z",
        "submittedBy" : "security_analyst_001"
      } ]
    } ]
  } ]
},
};

// Real portfolio KPIs
export const realPortfolioKpis: PortfolioKpis = {
  compliant: 23,
  missingEvidence: 8,
  pendingReview: 34,
  riskBlocked: 12
};
