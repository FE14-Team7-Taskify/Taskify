import Link from 'next/link';
import styles from './landingGNB.module.scss';
import { useRouter } from 'next/router';

export default function LandingGNB() {
  const router = useRouter();
  function handleClickLogo() {
    router.push('/');
  }

  return (
    <div className={styles.headerWrapper}>
      <button className={styles.logoArea} aria-label="로고 이미지 영역" onClick={handleClickLogo} />
      <div className={styles.authButtonContainer}>
        <div className={styles.linkToLogin}>
          <Link href="/login">로그인</Link>
        </div>
        <div className={styles.linkToSignup}>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
