import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';
import useResponsiveIllustration from '@/hooks/useResponsiveIllustration';

export default function HomePage() {
  const { src, width, height } = useResponsiveIllustration();

  return (
    <div className={styles.container}>
      {/* 메인 섹션 */}
      <section className={styles.main}>
        <Image src={src} alt="Illustration" width={width} height={height} />
        <h1>
          새로운 일정 관리 <span className={styles.highlight}>Taskify</span>
        </h1>
        <Link href="/login">
          <button className={styles.cta}>로그인하기</button>
        </Link>
      </section>

      {/* 기능 1 */}
      <section className={styles.point}>
        <div className={styles.title}>
          <p>Point 1</p>
        </div>
        <div className={styles.textbox}>
          <div>일의 우선순위를</div>
          <div>관리하세요</div>
        </div>
        <div className={styles.imageBox1}>
          <Image
            src="/images/landing/resource/landing1.svg"
            alt="우선순위"
            width={296}
            height={248}
          />
        </div>
      </section>

      {/* 기능 2 */}
      <section className={`${styles.point} ${styles.secondPoint}`}>
        <div className={styles.title}>
          <p>Point 2</p>
        </div>
        <div className={styles.textbox}>
          <div>해야 할 일을</div>
          <div>등록하세요</div>
        </div>
        <div className={styles.imageBox2}>
          <Image
            src="/images/landing/resource/landing2.svg"
            alt="해야할일"
            width={217}
            height={250}
          />
        </div>
      </section>

      {/* 설정 강조 */}
      <section className={styles.settings}>
        <h3>생산성을 높이는 다양한 설정 ✨</h3>
        <div className={styles.settingCards}>
          <div className={styles.card}>
            <Image
              src="/images/landing/resource/landing3.svg"
              alt="테마 설정"
              width={300}
              height={200}
            />
            <p>다크모드 지원</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/images/landing/resource/landing4.svg"
              alt="카테고리 설정"
              width={300}
              height={200}
            />
            <p>유연한 분류</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/images/landing/resource/landing5.svg"
              alt="알림 설정"
              width={300}
              height={200}
            />
            <p>알림으로 일정 체크</p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <p>© Taskify - 2025</p>
        <nav>
          <a href="#">Privacy Policy</a>
          <a href="#">FAQ</a>
        </nav>
      </footer>
    </div>
  );
}
