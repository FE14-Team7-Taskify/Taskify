import Image from 'next/image';
import styles from '../../styles/card.module.scss';
import { cn } from '@/styles/util/stylesUtil';
import { useOverlay } from '@/contexts/OverlayProvider';
import CreateDashboardModal from '@/components/modal/CreateDashboardModal';

export default function CreateDashboardButton() {
  const { overlay, close } = useOverlay();
  function handelCreateClick() {
    overlay(<CreateDashboardModal onClose={close} />);
  }
  return (
    <button
      className={cn(styles.dashboardCard, styles.createDashboardButton)}
      onClick={handelCreateClick}
    >
      새로운 대시보드
      <Image src="/icon/add_color.svg" alt="대시보드 생성 아이콘" width={20} height={20} />
    </button>
  );
}
