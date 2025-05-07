import { useCreateDashboardMutation } from '@/api/dashboards/dashboards.query';
import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../common/Input';
import TwoButtonModal from './TwoButtonModal';
import styles from './modal.module.scss';
import ColorChips from './dashboard/ColorChips';

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
  function handleConfirm() {
    mutation.mutate(value, { onSuccess: () => onClose() });
  }
  return (
    <TwoButtonModal
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
