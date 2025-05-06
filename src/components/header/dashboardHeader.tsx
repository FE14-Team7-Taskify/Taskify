import styles from './dashboardHeader.module.scss';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSetUser, useUser } from '@/contexts/AuthProvider';
import { useEffect, useState } from 'react';
import { useDashboardDetailQuery } from '@/api/dashboards/dashboards.query';
import { useDashboardMembersQuery } from '@/api/members/members.query';
import { MemberType } from '@/api/members/members.schema';

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const match = pathname?.match(/^\/dashboard\/(\d+)(\/|$)/);
  const dashboardId = match ? Number(match[1]) : undefined;

  const user = useUser();
  const setUser = useSetUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const { data: dashboard } = useDashboardDetailQuery(dashboardId ?? 0);
  const { data } = useDashboardMembersQuery({ dashboardId: dashboardId! });
  const members: MemberType[] = data?.members ?? [];

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

  function handleInvite() {
    console.log('초대하기 모달');
  }

  const visibleCount = isDesktop ? 4 : 2;
  const visibleMembers = members.slice(0, visibleCount);
  const extraCount = members.length - visibleCount;

  return (
    <div className={styles.headerWrapper}>
      {dashboard && (
        <div className={styles.dashboardTitle}>
          {dashboard.title}
          {dashboard.createdByMe && <span className={styles.dashboardCrown} />}
        </div>
      )}

      <div className={styles.userContainer}>
        <button
          className={styles.headerButton}
          onClick={() => handleNavigate(`/dashboard/${dashboardId}/edit`)}
        >
          <Image
            src="/icon/settings.svg"
            alt="관리"
            width={20}
            height={20}
            className={styles.ButtonIcon}
          />
          관리
        </button>
        <button className={styles.headerButton} onClick={handleInvite}>
          <Image
            src="/icon/add_box.svg"
            alt="초대하기"
            width={20}
            height={20}
            className={styles.ButtonIcon}
          />
          초대하기
        </button>

        <div className={styles.invitedPeople}>
          {visibleMembers.map((member, idx) => (
            <div
              key={member.id}
              className={`${styles.memberImageWrapper} ${!isDesktop && idx > 1 ? styles.hideOnMobile : ''} ${styles[`zIndex${idx}`]}`}
            >
              <Image
                src={member.profileImageUrl || '/icon/profile.svg'}
                className={styles.profileImg}
                alt={member.nickname}
                width={34}
                height={34}
              />
            </div>
          ))}

          {extraCount > 0 && (
            <div
              className={`${styles.extraCount} ${
                isDesktop ? '' : styles.hideOnDesktop
              } ${styles[`zIndex${visibleCount}`]}`}
            >
              +{extraCount}
            </div>
          )}
        </div>

        <div className={styles.divider}></div>

        <button
          className={styles.dropdown}
          data-toggle
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <div className={styles.userNameWrapper}>
            <div className={styles.userProfile}>
              <Image
                src={user?.profileImageUrl || '/icon/profile.svg'}
                alt="프로필 이미지"
                className={styles.profileImg}
                width={34}
                height={34}
              />
            </div>
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
    </div>
  );
}
