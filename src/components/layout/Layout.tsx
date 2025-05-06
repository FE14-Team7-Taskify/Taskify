import { useUser } from '@/contexts/AuthProvider';
import { usePathname } from 'next/navigation';
import Header from '../header/Header';
import DashboardHeader from '../header/dashboardHeader';
import SideBar from '../sidebar/SideBar';
import styles from './layout.module.scss';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const pathname = usePathname();

  const isDashboardPage = pathname?.startsWith('/dashboard');
  const isMyPage = pathname === '/mypage';

  return user ? (
    <SideBar>
      {isDashboardPage ? (
        <DashboardHeader />
      ) : (
        <Header title={isMyPage ? '계정 관리' : '내 대시보드'} />
      )}
      <div className={styles.pageContent}>{children}</div>
    </SideBar>
  ) : (
    children
  );
}
