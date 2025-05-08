// pages/404.tsx
import Link from 'next/link';
import styles from './404.module.scss';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>페이지를 찾을 수 없습니다.</p>
        <Link href="/" className={styles.button}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
