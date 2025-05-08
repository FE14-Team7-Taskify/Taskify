import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';
import useResponsiveIllustration from '@/hooks/useResponsiveIllustration';
import LandingGNB from '@/components/header/landingGNB';

export default function HomePage() {
  const { src, width, height } = useResponsiveIllustration();

  return (
    <>
      <LandingGNB />
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
          <h3>생산성을 높이는 다양한 설정 ⚡️</h3>
          <div className={styles.settingCards}>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/landing/resource/landing3.svg"
                  alt="테마 설정"
                  width={300}
                  height={200}
                />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.cardTitle}>대시보드 설정</p>
                <p className={styles.cardDesc}>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/landing/resource/landing4.svg"
                  alt="초대 설정"
                  width={300}
                  height={200}
                />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.cardTitle}>초대</p>
                <p className={styles.cardDesc}>새로운 팀원을 초대할 수 있어요.</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/landing/resource/landing5.svg"
                  alt="구성원 설정"
                  width={300}
                  height={200}
                />
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.cardTitle}>구성원</p>
                <p className={styles.cardDesc}>구성원을 초대하고 내보낼 수 있어요.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className={styles.footer}>
          <p>©codeit - 2023</p>
          <nav>
            <a href="#">Privacy Policy</a>
            <a href="#">FAQ</a>
          </nav>
          <div className={styles.snsIcons}>
            <a href="mailto:you@example.com" target="_blank" rel="noopener noreferrer">
              <Image src="/icon/email.svg" alt="email" width={24} height={24} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/icon/facebook.svg" alt="facebook" width={24} height={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/icon/instagram.svg" alt="instagram" width={24} height={24} />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
