import { useRouter } from 'next/router';
import styles from './header.module.scss';
import Image from 'next/image';
import { useSetUser, useUser } from '@/contexts/AuthProvider';
import { useEffect, useState } from 'react';

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  const user = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setUser = useSetUser();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const isDropdownArea = target.closest('[data-dropdown]');
      const isToggleButton = target.closest('[data-toggle]');
      if (!isDropdownArea && !isToggleButton) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div className={styles.headerTitle}>{title}</div>

      <button
        className={styles.dropdown}
        data-toggle
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className={styles.userNameWrapper}>
          <div className={styles.userProfile}>
            <Image
              src={user?.profileImageUrl || '/images/profile.svg'}
              alt="프로필 이미지"
              className={styles.profileImg}
              width={34}
              height={34}
            />
          </div>{' '}
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
