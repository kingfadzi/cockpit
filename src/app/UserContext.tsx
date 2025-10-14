import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type UserRole = 'PO' | 'security' | 'data' | 'operations' | 'enterprise_architecture';

interface UserContextType {
  userId: string;
  userRole: UserRole;
  userName: string;
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Map user roles to their corresponding user IDs
 */
const ROLE_TO_USER_ID: Record<UserRole, string> = {
  PO: 'product_owner_001',
  security: 'security_sme_001',
  data: 'data_sme_001',
  operations: 'operations_sme_001',
  enterprise_architecture: 'ea_sme_001',
};

/**
 * Map user roles to their display names
 */
const ROLE_TO_USER_NAME: Record<UserRole, string> = {
  PO: 'Product Owner',
  security: 'Security SME',
  data: 'Data SME',
  operations: 'Operations SME',
  enterprise_architecture: 'Enterprise Architecture SME',
};

/**
 * Detect user role from current route
 */
function detectRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith('/po')) {
    return 'PO';
  } else if (pathname.includes('/arb/security')) {
    return 'security';
  } else if (pathname.includes('/arb/data')) {
    return 'data';
  } else if (pathname.includes('/arb/operations')) {
    return 'operations';
  } else if (pathname.includes('/arb/enterprise_architecture')) {
    return 'enterprise_architecture';
  }
  // Default to PO if route doesn't match
  return 'PO';
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<UserRole>(() => detectRoleFromPath(location.pathname));

  // Update role when location changes
  useEffect(() => {
    const detectedRole = detectRoleFromPath(location.pathname);
    setUserRole(detectedRole);
  }, [location.pathname]);

  const userId = ROLE_TO_USER_ID[userRole];
  const userName = ROLE_TO_USER_NAME[userRole];

  const value = {
    userId,
    userRole,
    userName,
    setUserRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
