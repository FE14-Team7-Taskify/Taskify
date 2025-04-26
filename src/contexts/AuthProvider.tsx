import { User } from '@/api/users/users.schema';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user?: User; setUser: (newUser?: User) => void }>({
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const newUser = JSON.parse(data) as User;
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
  function handleSetUserData(newUser: User) {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }
  return handleSetUserData;
}
