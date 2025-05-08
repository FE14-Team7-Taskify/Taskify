import { useDashboardDetailQuery } from '@/api/dashboards/dashboards.query';
import BaseButton from '@/components/common/button/BaseButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DashBoardCard from '../../components/edit/DashboardCard';
import InvitationsCard from '../../components/edit/InvitationsCard';
import MembersCard from '../../components/edit/MembersCard';
import styles from '../../styles/edit.module.scss';
import { useOverlay } from '@/contexts/OverlayProvider';
import DeleteDashboardModal from '../../components/edit/DeleteDashboardModal';

export default function DashboardEdit() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = typeof id === 'string' && !isNaN(Number(id)) ? Number(id) : 0;
  const { data, isError } = useDashboardDetailQuery(dashboardId);

  const { overlay, close } = useOverlay();

  if (!dashboardId) return <div>잘못된 접근입니다.</div>;
  if (isError || !data) return <div>에러가 발생했습니다.</div>;

  function handleGoBack() {
    router.push(`/dashboard/${dashboardId}`);
  }
  async function handleUpdateDashboard() {
    // updateDashboardDetail();
    // await updateSidebarList();
  }
  function handleClickRemove() {
    // async function onClose() {
    //   await updateSidebarList();
    //   await close();
    // }
    overlay(<DeleteDashboardModal dashboardId={dashboardId} close={close} />);
  }

  return (
    <div className={styles.dashboardEdit}>
      <button className={styles.btnGoBack} onClick={handleGoBack}>
        <Image src="/icon/arrow_right.svg" alt="뒤로가기 이미지" width={18} height={18} />
        돌아가기
      </button>
      <div className={styles.editArea}>
        <div className={styles.cardsWrapper}>
          <DashBoardCard
            dashboardId={data.id}
            title={data.title}
            color={data.color}
            updateDashboardDetail={handleUpdateDashboard}
          />
          <MembersCard dashboardId={data.id} />
          <InvitationsCard dashboardId={data.id} />
        </div>
        <BaseButton className={styles.btnOutlined} onClick={handleClickRemove}>
          대시보드 삭제하기
        </BaseButton>
      </div>
    </div>
  );
}
