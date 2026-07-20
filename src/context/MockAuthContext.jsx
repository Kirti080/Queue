import { createContext, useContext, useState } from 'react';
const Context = createContext(null);
export function MockAuthProvider({
  children
}) {
  const [role, setRole] = useState(localStorage.getItem('qf-role') || 'customer');
  const switchRole = value => {
    setRole(value);
    localStorage.setItem('qf-role', value);
  };
  return <Context.Provider value={{
    role,
    switchRole,
    user: {
      name: 'Kirti Verma',
      email: 'kirti@example.com'
    }
  }}>
    {children}
  </Context.Provider>;
}
export const useMockAuth = () => useContext(Context);

