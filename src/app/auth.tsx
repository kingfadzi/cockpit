import React, { createContext, useContext, useMemo } from 'react';

export type Role = 'product_owner' | 'control_sme';

interface AuthCtx { roles: Role[]; has: (role: Role) => boolean; }

const AuthContext = createContext<AuthCtx>({ roles: [], has: () => false });

export const AuthProvider: React.FC<{ roles?: Role[]; children: React.ReactNode }> = ({ roles = ['product_owner'], children }) => {
  const value = useMemo(() => ({ roles, has: (r: Role) => roles.includes(r) }), [roles]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
