import { useDeleteDashboardMutation } from '@/api/dashboards/dashboards.query';
import TwoButtonModal from '@/components/modal/TwoButtonModal';
import styles from '../../styles/edit.module.scss';

export default function DeleteDashboardModal({
  dashboardId,
  close,
}: {
  dashboardId: number;
  close: () => void;
}) {
  const mutation = useDeleteDashboardMutation();
  function handleDeleteDashboard() {
    mutation.mutate(dashboardId);
    close();
  }
  return (
    <TwoButtonModal
      className={styles.deleteDashboardModal}
      btns={{ onCancel: close, onConfirm: handleDeleteDashboard, rightText: '삭제' }}
    >
      <div className={styles.message}>정말 삭제하시겠습니까?</div>
    </TwoButtonModal>
  );
}
