import { UserType } from '@/api/users/users.schema';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user?: UserType; setUser: (newUser?: UserType) => void }>({
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const newUser = JSON.parse(data) as UserType;
      setUser(newUser);
    }
  }, []);

  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
}

export function useUser() {
  const { user } = useContext(AuthContext);
  return user;
}

export function useSetUser() {
  const { setUser } = useContext(AuthContext);
  function handleSetUserData(newUser: UserType) {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }
  return handleSetUserData;
}
