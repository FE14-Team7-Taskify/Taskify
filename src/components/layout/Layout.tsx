import { useUser } from '@/contexts/AuthProvider';
import Header from '../header/Header';
import SideBar from '../sidebar/SideBar';
import styles from './layout.module.scss';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  return user ? (
    <SideBar>
      <Header />
      <div className={styles.pageContent}>{children}</div>
    </SideBar>
  ) : (
    children
  );
}
