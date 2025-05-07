import { useCreateDashboardMutation } from '@/api/dashboards/dashboards.query';
import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../common/Input';
import TwoButtonModal from './TwoButtonModal';
import ColorChips from './dashboard/ColorChips';
import styles from './modal.module.scss';
import useSidebar from '@/hooks/useSidebar';

export default function CreateDashboardModal({ onClose }: { onClose: () => void }) {
  const [value, setValue] = useState<{ title: string; color: string }>({
    title: '',
    color: '#7AC555',
  });

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value: inputValue } = e.target as HTMLInputElement;
    setValue({ ...value, [name]: inputValue });
  }

  const mutation = useCreateDashboardMutation();
  const { page, setPage, updateSidebarList } = useSidebar();
  function handleConfirm() {
    mutation.mutate(value, {
      onSuccess: () => {
        page > 1 ? setPage(1) : updateSidebarList();
        onClose();
      },
    });
  }
  return (
    <TwoButtonModal
      className={styles.dashboardCreateModal}
      title="새로운 대시보드"
      btns={{
        onCancel: onClose,
        onConfirm: handleConfirm,
        rightDisabled: value.title.length === 0,
      }}
    >
      <form className={styles.createDashboardModalContent} onSubmit={handleFormSubmit}>
        <div className={styles.dashboardTitleArea}>
          <label>대시보드 이름</label>
          <Input name="title" onChange={handleInputChange} />
        </div>
        <ColorChips color={value.color} onChange={handleInputChange} />
      </form>
    </TwoButtonModal>
  );
}
