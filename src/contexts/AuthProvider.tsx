import { UserType } from '@/api/users/users.schema';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: UserType | null | undefined;
  setUser: (newUser: UserType | null | undefined) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null | undefined>(undefined);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const newUser = JSON.parse(data) as UserType;
      setUser(newUser);
    } else {
      setUser(null);
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
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
