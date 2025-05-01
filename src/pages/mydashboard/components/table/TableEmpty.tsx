import Image from 'next/image';
import styles from '../../styles/table.module.scss';

export default function TableEmpty() {
  return (
    <div className={styles.tableEmpty}>
      <Image
        src="/icon/email_unsubscribe.svg"
        alt="초대받은 대시보드 없음 미리보기"
        width={60}
        height={60}
        priority
      />
      <div className={styles.tableMessage}>아직 초대받은 대시보드가 없어요</div>
    </div>
  );
}
