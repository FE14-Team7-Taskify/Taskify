import { DashboardType } from '@/api/dashboards/dashboards.schema';
import { cn, cond } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/card.module.scss';

interface DashboardCardProps extends DashboardType {}

export default function DashboardCard({ id, color, title, createdByMe }: DashboardCardProps) {
  const router = useRouter();
  function handleClickCard() {
    router.push(`/dashboard/${id}`);
  }
  return (
    <button className={styles.dashboardCard} onClick={handleClickCard}>
      <div className={cn(styles.dashboardNm, cond(createdByMe, styles.dashboardCrown))}>
        <div className={cn(styles.dashboardColor, styles[`color-${color.replace('#', '')}`])} />
        {title}
      </div>
      <Image src="/icon/arrow_right.svg" alt="대시보드 바로가기 아이콘" width={18} height={18} />
    </button>
  );
}
