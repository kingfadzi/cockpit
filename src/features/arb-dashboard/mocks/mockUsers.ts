/**
 * Mock Users for ARB Dashboard
 */

export interface MockUser {
  id: string;
  name: string;
  email: string;
  arbDomain: 'security' | 'data' | 'operations' | 'enterprise_architecture';
  role: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-001',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    arbDomain: 'security',
    role: 'Security ARB Expert'
  },
  {
    id: 'user-002',
    name: 'John Doe',
    email: 'john.doe@company.com',
    arbDomain: 'security',
    role: 'Security ARB Expert'
  },
  {
    id: 'user-003',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    arbDomain: 'data',
    role: 'Data Governance Expert'
  },
  {
    id: 'user-004',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    arbDomain: 'operations',
    role: 'Operations & Resilience Expert'
  },
  {
    id: 'user-005',
    name: 'Carol Martinez',
    email: 'carol.martinez@company.com',
    arbDomain: 'enterprise_architecture',
    role: 'Enterprise Architect'
  },
];

// Default user for "current user" scenarios
export const currentMockUser = mockUsers[1]; // John Doe (Security ARB)

export function getMockUserById(id: string): MockUser | undefined {
  return mockUsers.find(u => u.id === id);
}

export function getMockUsersByDomain(domain: string): MockUser[] {
  return mockUsers.filter(u => u.arbDomain === domain);
}
