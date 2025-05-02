import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* 히어로 섹션 */}
      <section className={styles.hero}>
        <Image
          src="/images/landing/illustration/mobile.png"
          alt="Illustration"
          width={287}
          height={168}
        />
        <h1>
          새로운 일정 관리 <span className={styles.highlight}>Taskify</span>
        </h1>
        <Link href="/login">
          <button className={styles.cta}>로그인하기</button>
        </Link>
      </section>

      {/* 기능 1 */}
      <section className={styles.feature}>
        <div className={styles.textBox}>
          <p>Point 1</p>
          <h2>
            일의 우선순위를
            <br />
            관리하세요
          </h2>
        </div>
        <div className={styles.imageBox}>
          <Image src="/feature-priority.png" alt="우선순위 기능" width={600} height={400} />
        </div>
      </section>

      {/* 기능 2 */}
      <section className={styles.featureReverse}>
        <div className={styles.imageBox}>
          <Image src="/feature-input.png" alt="일 등록 기능" width={600} height={400} />
        </div>
        <div className={styles.textBox}>
          <p>Point 2</p>
          <h2>
            해야 할 일을
            <br />
            등록하세요
          </h2>
        </div>
      </section>

      {/* 설정 강조 */}
      <section className={styles.settings}>
        <h3>생산성을 높이는 다양한 설정 ✨</h3>
        <div className={styles.settingCards}>
          <div className={styles.card}>
            <Image src="/theme.png" alt="테마 설정" width={300} height={200} />
            <p>다크모드 지원</p>
          </div>
          <div className={styles.card}>
            <Image src="/category.png" alt="카테고리 설정" width={300} height={200} />
            <p>유연한 분류</p>
          </div>
          <div className={styles.card}>
            <Image src="/notification.png" alt="알림 설정" width={300} height={200} />
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
