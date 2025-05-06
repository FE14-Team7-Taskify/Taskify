import { useRouter } from 'next/router';
import styles from './header.module.scss';
import { useSetUser, useUser } from '@/contexts/AuthProvider';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setUser = useSetUser();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  const handleNavigate = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    router.push('/');
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerTitle}>내 대시보드</div>

      <button className={styles.dropdown} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className={styles.userNameWrapper}>
          <div className={styles.userFirstName}>{user?.nickname[0]}</div>
          <div className={styles.userName}>{user?.nickname}</div>
        </div>
      </button>

      <div
        data-dropdown
        className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : styles.closed}`}
      >
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={() => handleNavigate('/mypage')}>내 정보</button>
        <button onClick={() => handleNavigate('/mydashboard')}>내 대시보드</button>
      </div>
    </div>
  );
}
