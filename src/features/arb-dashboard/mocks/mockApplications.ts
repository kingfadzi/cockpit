/**
 * Mock Applications for ARB Dashboard
 * Generates 50 applications with varied risk profiles
 */

import { Application } from '../api/types';
import { generateRisksForApp } from './mockRisks';
import { mockUsers } from './mockUsers';

const transactionCycles = ['Daily', 'Hourly', 'Monthly', 'Quarterly', 'Weekly', 'Real-time'];
const appOwners = ['Jane Smith', 'Michael Lee', 'Sarah Chen', 'David Park', 'Emma Wilson', 'Chris Taylor'];

// Security domain criticalities
const securityCriticalities = ['A1', 'A2', 'B', 'C', 'D'];
// Resilience domain criticalities (in hours)
const resilienceCriticalities = ['4', '8', '24', '72'];
// Standard criticalities for other domains
const standardCriticalities = ['A', 'B', 'C', 'D'];

const applicationNames = [
  // Customer-facing
  'Customer Portal', 'Mobile Banking App', 'Payment Gateway', 'Online Trading Platform',
  'Customer Support Portal', 'Loan Application System', 'Credit Card Platform',

  // Internal
  'Employee Portal', 'HR Management System', 'Finance System', 'Procurement Platform',
  'Internal Wiki', 'IT Service Desk', 'Asset Management System',

  // Data & Analytics
  'Data Warehouse', 'Analytics Platform', 'Business Intelligence Dashboard',
  'Data Lake', 'ML Model Training Platform', 'Customer Data Platform',

  // Infrastructure
  'API Gateway', 'Auth Service', 'Notification Service', 'Email Service',
  'SMS Gateway', 'File Storage Service', 'CDN Manager',

  // Core Banking
  'Core Banking System', 'Account Management', 'Transaction Processing',
  'Fraud Detection System', 'Risk Management Platform', 'Compliance Reporting',

  // Legacy
  'Legacy Mainframe Gateway', 'Old CRM System', 'Deprecated Reporting Tool',

  // New/Experimental
  'Experimental ML Service', 'New API v2', 'Beta Mobile Features',
  'Pilot Chatbot Service', 'Test Automation Platform',

  // Operations
  'Monitoring Dashboard', 'Log Aggregation Service', 'Backup Service',
  'Disaster Recovery System', 'Infrastructure as Code Platform',
  'Container Orchestration', 'CI/CD Pipeline'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

function calculateAggregatedRiskScore(riskBreakdown: Application['riskBreakdown']): number {
  const { critical, high, medium, low } = riskBreakdown;
  const weights = { critical: 100, high: 75, medium: 50, low: 25 };

  const totalRisks = critical + high + medium + low;
  if (totalRisks === 0) return 15; // Base score for apps with no risks

  const weightedSum = (critical * weights.critical) + (high * weights.high) +
                      (medium * weights.medium) + (low * weights.low);

  return Math.min(Math.round((weightedSum / totalRisks)), 100);
}

/**
 * Generate a single mock application
 */
function generateApplication(
  id: number,
  name: string,
  primaryDomain: 'security' | 'data' | 'operations' | 'enterprise_architecture' | 'resilience',
  riskCount: number
): Application {
  const internalId = `app-${String(id).padStart(3, '0')}`;
  const appId = `APM${String(100000 + id).padStart(6, '0')}`; // e.g., APM100001
  const owner = getRandomItem(appOwners);
  const ownerId = getRandomItem(mockUsers).id;
  const transactionCycle = getRandomItem(transactionCycles);

  // Assign criticality based on primary domain
  let criticality: string;
  const criticalityRandom = Math.random();

  if (primaryDomain === 'security') {
    // Security domain: A1=10%, A2=10%, B=30%, C=35%, D=15%
    if (criticalityRandom < 0.10) criticality = 'A1';
    else if (criticalityRandom < 0.20) criticality = 'A2';
    else if (criticalityRandom < 0.50) criticality = 'B';
    else if (criticalityRandom < 0.85) criticality = 'C';
    else criticality = 'D';
  } else if (primaryDomain === 'resilience') {
    // Resilience domain: numeric values (4=20%, 8=30%, 24=35%, 72=15%)
    if (criticalityRandom < 0.20) criticality = '4';
    else if (criticalityRandom < 0.50) criticality = '8';
    else if (criticalityRandom < 0.85) criticality = '24';
    else criticality = '72';
  } else {
    // Other domains: A=15%, B=30%, C=40%, D=15%
    if (criticalityRandom < 0.15) criticality = 'A';
    else if (criticalityRandom < 0.45) criticality = 'B';
    else if (criticalityRandom < 0.85) criticality = 'C';
    else criticality = 'D';
  }

  // Generate risks
  const assignToCurrentUser = Math.random() > 0.7; // 30% chance to have risks assigned to current user
  const risks = generateRisksForApp(name, riskCount, primaryDomain, assignToCurrentUser);

  // Calculate risk breakdown
  const riskBreakdown = {
    critical: risks.filter(r => r.priority === 'CRITICAL' && r.status !== 'RESOLVED').length,
    high: risks.filter(r => r.priority === 'HIGH' && r.status !== 'RESOLVED').length,
    medium: risks.filter(r => r.priority === 'MEDIUM' && r.status !== 'RESOLVED').length,
    low: risks.filter(r => r.priority === 'LOW' && r.status !== 'RESOLVED').length,
  };

  const totalOpenItems = Object.values(riskBreakdown).reduce((sum, count) => sum + count, 0);

  // Determine domains (which ARBs have risks for this app)
  const domains = [...new Set(risks.map(r => r.arbDomain))];

  // Check if current user has assigned risks
  const hasAssignedRisks = risks.some(r => r.assignedTo === 'user-002'); // John Doe (current user)

  // Last activity date (most recent risk update)
  const lastActivity = risks.length > 0 ?
    risks.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime())[0].updatedDate :
    getRandomDate(Math.floor(Math.random() * 90));

  return {
    id: internalId,
    appId,
    name,
    criticality,
    transactionCycle,
    owner,
    ownerId,
    aggregatedRiskScore: calculateAggregatedRiskScore(riskBreakdown),
    totalOpenItems,
    riskBreakdown,
    domains,
    hasAssignedRisks,
    lastActivityDate: lastActivity,
    risks
  };
}

/**
 * Generate all 50 mock applications
 */
export function generateMockApplications(): Application[] {
  const applications: Application[] = [];

  // High-risk applications (10 apps, 5-15 risks each)
  for (let i = 0; i < 10; i++) {
    const name = applicationNames[i];
    const riskCount = Math.floor(Math.random() * 10) + 5; // 5-15 risks
    const primaryDomain = i % 5 === 0 ? 'security' :
                         i % 5 === 1 ? 'data' :
                         i % 5 === 2 ? 'operations' :
                         i % 5 === 3 ? 'enterprise_architecture' : 'resilience';
    applications.push(generateApplication(i + 1, name, primaryDomain, riskCount));
  }

  // Medium-risk applications (25 apps, 2-8 risks each)
  for (let i = 10; i < 35; i++) {
    const name = applicationNames[i];
    const riskCount = Math.floor(Math.random() * 7) + 2; // 2-8 risks
    const primaryDomain = i % 5 === 0 ? 'security' :
                         i % 5 === 1 ? 'data' :
                         i % 5 === 2 ? 'operations' :
                         i % 5 === 3 ? 'enterprise_architecture' : 'resilience';
    applications.push(generateApplication(i + 1, name, primaryDomain, riskCount));
  }

  // Low-risk applications (10 apps, 0-3 risks each)
  for (let i = 35; i < 45; i++) {
    const name = applicationNames[i];
    const riskCount = Math.floor(Math.random() * 4); // 0-3 risks
    const primaryDomain = i % 5 === 0 ? 'security' :
                         i % 5 === 1 ? 'data' :
                         i % 5 === 2 ? 'operations' :
                         i % 5 === 3 ? 'enterprise_architecture' : 'resilience';
    applications.push(generateApplication(i + 1, name, primaryDomain, riskCount));
  }

  // Edge case: 1 app with 53 risks (testing pagination)
  applications.push(generateApplication(46, 'Legacy Mainframe Gateway', 'security', 53));

  // Edge case: 1 app with exactly 0 risks
  applications.push({
    id: 'app-047',
    appId: 'APM100047',
    name: 'Internal Wiki',
    criticality: 'D',
    transactionCycle: 'Daily',
    owner: 'Emma Wilson',
    ownerId: 'user-005',
    aggregatedRiskScore: 15,
    totalOpenItems: 0,
    riskBreakdown: { critical: 0, high: 0, medium: 0, low: 0 },
    domains: [],
    hasAssignedRisks: false,
    lastActivityDate: getRandomDate(60),
    risks: []
  });

  // Edge case: 1 app with only manual risks
  const manualOnlyApp = generateApplication(48, 'Experimental ML Service', 'data', 5);
  manualOnlyApp.risks = manualOnlyApp.risks.filter(r => !r.isAutoGenerated);
  manualOnlyApp.totalOpenItems = manualOnlyApp.risks.length;
  manualOnlyApp.riskBreakdown = {
    critical: manualOnlyApp.risks.filter(r => r.priority === 'CRITICAL').length,
    high: manualOnlyApp.risks.filter(r => r.priority === 'HIGH').length,
    medium: manualOnlyApp.risks.filter(r => r.priority === 'MEDIUM').length,
    low: manualOnlyApp.risks.filter(r => r.priority === 'LOW').length,
  };
  applications.push(manualOnlyApp);

  // Remaining apps (48 and 49)
  for (let i = 48; i < 50; i++) {
    const name = applicationNames[i] || `Application ${i + 1}`;
    const riskCount = Math.floor(Math.random() * 6) + 2; // 2-7 risks
    const primaryDomain = i % 5 === 0 ? 'security' :
                         i % 5 === 1 ? 'data' :
                         i % 5 === 2 ? 'operations' :
                         i % 5 === 3 ? 'enterprise_architecture' : 'resilience';
    applications.push(generateApplication(i + 1, name, primaryDomain, riskCount));
  }

  return applications;
}

// Generate and export the mock applications
export const mockApplications = generateMockApplications();
