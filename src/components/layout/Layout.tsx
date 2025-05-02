import { useUser } from '@/contexts/AuthProvider';
import Header from '../header/Header';
import SideBar from '../sidebar/SideBar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  return user ? (
    <SideBar>
      <Header />
      {children}
    </SideBar>
  ) : (
    children
  );
}
